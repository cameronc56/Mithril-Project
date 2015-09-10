#!/usr/bin/env python
from bottle import *
import sqlite3
import hashlib, uuid
import json
import blowfish
import base64
import sendgrid
import os

app = default_app()
cryptoKey = os.environ["CRYPTOKEY"]
conn = sqlite3.connect('login.db')
# c = conn.cursor()
################################################################################
@get('/')
def returnIndex():
    return template('index', get_url=app.get_url)
################################################################################
@get('/robots.txt')
def returnRobots():
    return static_file("robots.txt", root="")
################################################################################
@get('/favicon.ico')
def returnFavicon():
    return static_file("favicon.ico", root="")
################################################################################
@post('/newPost')
def newPost():
    d = request.json
    postBody = d["postBody"]
    username = d["username"]
    threadId = d["threadId"]
    parentPostId = d["parentPostId"]
    indentLevel = d["indentLevel"]
    with conn:
        c = conn.cursor()
        c.execute(
            "INSERT INTO Posts(ThreadId, Username, Date, BodyText, ParentPostId, IndentLevel) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?, ?)",
            (threadId, username, postBody, parentPostId, indentLevel))
    return json.dumps({"status": "finished"})
################################################################################
@post('/getPosts')
def getPosts():
    d = request.json
    threadId = d["threadId"]
    with conn:
        c = conn.cursor()
        posts = (c.execute(
            "SELECT PostId, ThreadId, Username, Date, BodyText, ParentPostId, IndentLevel FROM Posts WHERE ThreadId = ?",
            threadId)).fetchall()
    return json.dumps({"posts": posts})
################################################################################
@post('/newThread')
def newThread():
    d = request.json
    threadTitle = d["threadTitle"]
    threadBody = d["threadBody"]
    username = d["username"]
    with conn:
        c = conn.cursor()
        c.execute("INSERT INTO Threads(Title, BodyText, Date, Username) VALUES (?, ?, CURRENT_TIMESTAMP, ?)",
                  (threadTitle, threadBody, username))
    return json.dumps({"threadTitle": threadTitle, "threadBody": threadBody})
################################################################################
@post('/getThread')
def getThread():
    d = request.json
    id = d["threadId"]
    with conn:
        c = conn.cursor()
        thread = (
        c.execute("SELECT ThreadId, Title, BodyText, Date, Username FROM Threads WHERE ThreadId = ?", id)).fetchone()
        return json.dumps({"thread": thread})
################################################################################
@get('/getThreads')
def getThreads():
    with conn:
        c = conn.cursor()
        threads = c.execute("SELECT ThreadId, Title, BodyText, Date, Username FROM Threads").fetchall()
        return json.dumps({"threads": threads})
################################################################################
@post('/changePassword')
def changePassword():
    d = request.json
    oldPassword = d["oldPassword"]
    newPassword = d["newPassword"]
    username = d["username"]
    with conn:
        print oldPassword + " " + newPassword + " " + username
    return json.dumps({"response:"})
################################################################################
@post('/register')
def register():
    d = request.json
    username = d['username']
    password = d['password']
    email = d['email']
    conn = openConn()
    with conn:
        c = conn.cursor()
        if (c.execute("SELECT PasswordSalt, PasswordHash FROM Users WHERE Username = ?", (username,))).fetchone():
            return json.dumps({"error": 'Username Taken'})
        else:
            salt = uuid.uuid4().hex
            hash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
            c.execute("INSERT INTO Users(Username, PasswordHash, PasswordSalt, Email) VALUES(?,?,?,?)",
                      (username, hash, salt, email))
            conn.commit()
            return json.dumps({"error": 'Account Created'})
################################################################################
@post('/login')
def login():
    d = request.json
    username = d['username']
    password = d['password']
    conn = openConn()
    with conn:
        c = conn.cursor()
        query = (c.execute("SELECT PasswordHash, PasswordSalt FROM Users WHERE Username = ?", (username,))).fetchone()
        if query:
            DBhash = query[0]
            salt = query[1]
            hash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
            if hash == DBhash:
                response.set_cookie("session", encode_session_str({"username": username}))
                return json.dumps({"response": 'Logged In'})
            else:
                return json.dumps({"response": 'Invalid Credentials'})
        else:
            return json.dumps({"response": 'Invalid Credentials'})
################################################################################
@post('/sendEmail')
def sendEmail():
    sendgridUsername = os.environ['USERNAME']
    sendgridPassword = os.environ['PASSWORD']
    d = request.json
    emailName = d['emailName']
    emailAddress = d['emailAddress']
    emailBody = d['emailBody']
    sg = sendgrid.SendGridClient(str(sendgridUsername), str(sendgridPassword))
    message = sendgrid.Mail()
    message.add_to('Cam C <admin@littleducklinggames.com>')
    message.set_subject('Message to the Admin')
    message.set_html('')
    message.set_text(emailBody)
    message.set_from(emailName + " <" + emailAddress + " ")
    status, msg = sg.send(message)
    return json.dumps({"status": status})
################################################################################
@post('/isFavoriteGame')
def isFavoriteGame():
    d = request.json
    username = d["username"]
    gameTitle = d["gameTitle"]
    conn = openConn()
    with conn:
        c = conn.cursor()
        isFavorite = (c.execute("SELECT GameTitle FROM FavoriteGames WHERE Username = ? AND GameTitle  = ?",
                                (username, gameTitle))).fetchone()
        if isFavorite is not None:
            return json.dumps({"isFavorite": "true"})
        elif isFavorite is None:
            return json.dumps({"isFavorite": "false"})
################################################################################
@post('/getAllFavoriteGames')
def getAllFavoriteGames():
    d = request.json
    username = d["username"]
    conn = openConn()
    with conn:
        c = conn.cursor()
        favoriteGames = (c.execute("SELECT GameTitle FROM FavoriteGames WHERE Username = ?", (username,))).fetchall()
        return json.dumps({"favoriteGames": favoriteGames})
################################################################################
@post('/favoriteGame')
def favoriteGame():
    d = request.json
    username = d["username"]
    gameTitle = d["gameTitle"]
    conn = openConn()
    with conn:
        c = conn.cursor()
        isFavorite = (c.execute("SELECT GameTitle FROM FavoriteGames WHERE Username = ? AND GameTitle  = ?",
                                (username, gameTitle))).fetchone()
        if isFavorite is not None:
            (c.execute("DELETE FROM FavoriteGames WHERE Username = ? AND GameTitle = ?",
                       (username, gameTitle))).fetchone()
        elif isFavorite is None:
            c.execute("INSERT INTO FavoriteGames(Username, GameTitle) VALUES (?, ?)", (username, gameTitle))
    conn.commit()
    return json.dumps({"response": "RESPONSE FROM SERVER"})
################################################################################
@post('/account')
def account():
    session = request.json['session']
    session = decode_session_str(session)
    if is_logged_in(session):
        username = session['username']
        conn = openConn()
        with conn:
            return json.dumps({"username": username})
    else:
        return json.dumps({"username": "Username"})
################################################################################
@post('/setUserProfilePhoto')
def setUserProfilePhoto():
    d = request.json
    file = d["file"]
    filename = d["filename"]
    username = d["username"]
    # f = open("imageToSave.png", "wb")
    # f.write()
    # f.close()
    print "hello world"
    print file + " " + filename + " " + username
################################################################################
# @get('getUserProfilePhoto')
# def getUserProfilePhoto():
#     d = request.json
#     username = d["username"]
#     photo = open('userProfilePhotos/' + username, 'r')
#
#       Dont need a get photo, just do <img src="dir">

################################################################################
@get('/static/js/<filename:re:.*\.js>', name='static/js')
def server_static(filename):
    return static_file(filename, root='static/js')
################################################################################
@get('/static/js/components/<filename:re:.*\.js>', name='static/js/components')
def server_static(filename):
    return static_file(filename, root='/static/js/components')
################################################################################
@get('/static/js/libraries/<filename:re:.*\.js>', name='static/js/libraries')
def server_static(filename):
    return static_file(filename, root='/static/js/libraries')
################################################################################
@get('/static/js/routers/<filename:re:.*\.js>', name='static/js/routers')
def server_static(filename):
    return static_file(filename, root='/static/js/routers')
################################################################################
@get('/static/json/<filename:re:.*\.json>', name='static')
def server_static(filename):
    return static_file(filename, root='static/json')
################################################################################
@get('/static/css/<filename:re:.*\.(css|css.map)>', name='static/css')
def server_static(filename):
    return static_file(filename, root='static/css')
################################################################################
@get('/static/fonts/<filename>')
def server_static(filename):
    return static_file(filename, root='static/fonts', mimetype='font/opentype')
################################################################################
@route('/images/<imageName>', name='images')
def send_image(imageName):
    return static_file(imageName, root='images', mimetype='image/png')
################################################################################
def decode_session_str(s):
    if s:
        return json.loads(blowfish.blowfishCTR("d", cryptoKey, base64.b64decode(s)))
    return None
################################################################################
def encode_session_str(d):
    return base64.b64encode(blowfish.blowfishCTR("e", cryptoKey, json.dumps(d)))
################################################################################
def is_logged_in(session):
    return type(session) is dict and session.has_key("username")
################################################################################
def openConn():
    return sqlite3.connect('login.db')
################################################################################
run(host='0.0.0.0', port=8443, debug=True, reloader=False)
