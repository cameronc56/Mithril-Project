#!/usr/bin/env python
from bottle import *
import sqlite3
import hashlib, uuid
import json
import blowfish
import base64
import sendgrid

app = default_app()
cryptoKey = "zOMeALKStvK3SxqRjm6xeqrt0Hn85oARUqYNa7kU"
conn = sqlite3.connect('login.db')
c = conn.cursor()

#Users table
#c.execute("DROP TABLE Users")
#c.execute("CREATE TABLE Users (username text PRIMARY KEY, passwordHash text NOT Null, passwordSalt text, email text)")
#conn.commit()

################################################################################
@get('/')
def returnIndex():
	return template('index', get_url = app.get_url)
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
		if (c.execute("SELECT passwordSalt, passwordHash FROM Users WHERE username = ?",(username,))).fetchone():
			return json.dumps({"error":'Username Taken'})
		else:
			salt = uuid.uuid4().hex
			hash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
			c.execute("INSERT INTO Users(username, passwordHash, passwordSalt, email) VALUES(?,?,?,?)", (username, hash, salt, email))
			conn.commit()
			return json.dumps({"error":'Account Created'})
################################################################################
@post('/login')
def login():
	d = request.json
	username = d['username']
	password = d['password']
	conn = openConn()
	with conn:
		c = conn.cursor()
		var = (c.execute("SELECT passwordHash, passwordSalt FROM Users WHERE username = ?",(username,))).fetchone()
		if var:
			DBhash = var[0]
			salt = var[1]
			hash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
			if hash == DBhash:
				response.set_cookie("session", encode_session_str({"username" : username}))
				return json.dumps({"error":'Logged In'})
			else:
				return json.dumps({"error":'Invalid Credentials'})
		else:
			return json.dumps({"error":'Invalid Credentials'})
################################################################################
@post('/sendEmail')
def sendEmail():
	d = request.json
	emailName = d['emailName']
	emailAddress = d['emailAddress']
	emailBody = d['emailBody']

	sg = sendgrid.SendGridClient('cameronc56', '111122336')
	message = sendgrid.Mail()
	message.add_to('Cam C <admin@littleducklinggames.com>')
	message.set_subject('Message to the Admin')
	message.set_html('')
	message.set_text(emailBody)
	message.set_from(emailName + " <" + emailAddress + " ")
	status, msg = sg.send(message)
	return json.dumps({"status":status})
######################y##########################################################
@post('/isFavoriteGame')
def isFavoriteGame():
	d = request.json
	username = d["username"]
	gameTitle = d["gameTitle"]
	conn = openConn()
	with conn:
		c = conn.cursor()
		isFavorite = (c.execute("SELECT gameTitle FROM favoriteGames join Users ON Users.username = favoriteGames.username WHERE Users.username = ? AND favoriteGames.gameTitle  = ?",(username, gameTitle))).fetchone()
		if isFavorite:
			return json.dumps({"isFavorite":"True"})
		else:
			return json.dumps({"isFavorite":"False"})
######################y##########################################################
@post('/favoriteGame')
def favoriteGame():
	d = request.json
	username = d["username"]
	print username
	gameTitle = d["gameTitle"]
	print gameTitle
	conn = openConn()
	with conn:
		c = conn.cursor()
		isFavorite = (c.execute("SELECT gameTitle FROM favoriteGames join Users ON Users.username = favoriteGames.username WHERE Users.username = ? AND favoriteGames.gameTitle  = ?",(username, gameTitle))).fetchone()
		if isFavorite:
			print "isFavorite == true"
			(c.execute("DELETE FROM favoriteGames WHERE favoriteGames.username = ? AND favoriteGames.gameTitle = ?", (username, gameTitle))).fetchone()
		else:
			print "isFavorite == false"
			c.execute("INSERT INTO favoriteGames(username, gameTitle) VALUES (?, ?)", (username, gameTitle))
	return json.dumps({"response":"RESPONSE FROM SERVER"})
################################################################################
@post('/account')
def account():
	session = request.json['session']
	session = decode_session_str(session)
	if is_logged_in(session):
		username = session['username']
		conn = openConn()
		with conn:
			c = conn.cursor()
			email = (c.execute("SELECT email FROM Users WHERE username = ?",(username,))).fetchone()
			email = email[0]
			if(email == None):
				email = "No email attached to this Account"
			return json.dumps({"username":username})
	else:
		return json.dumps({"username":"Click To Login"})
################################################################################
@get('/static/<filename:re:.*\.js>', name='static')
def server_static(filename):
	return static_file(filename, root='static/js')
################################################################################
@get('/static/<filename:re:.*\.json>', name='static')
def server_static(filename):
	return static_file(filename, root='static/json')
################################################################################
@get('/static/<filename:re:.*\.css>', name='static/css')
def server_static(filename):
	return static_file(filename, root='static/css')
################################################################################
@get('/fonts/<filename>')
def server_static(filename):
	return static_file(filename, root='static/fonts')
################################################################################
@route('/images/<imageName>', name = 'images')
def send_image(imageName):
	return static_file(imageName, root = 'images', mimetype = 'image/png')
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
run(host = '0.0.0.0', port = 8443, debug = True, reloader = False)