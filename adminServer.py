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
adminConn = sqlite3.connect('admin.db')

################################################################################
# Use this function to create admin users.
def createAdmin():
    username = ""
    password = ""
    with adminConn:
        c = adminConn.cursor()
        salt = uuid.uuid4().hex
        hash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
        c.execute("INSERT INTO Admins (Username, PasswordHash, PasswordSalt) VALUES(?,?,?)", (username, hash, salt))
        conn.commit()
        print "Success"
################################################################################
@get('/')
def returnIndex():
    return template('adminIndex', get_url = app.get_url)
################################################################################
@get('/robots.txt')
def returnRobots():
    return static_file("robots.txt", root="")
################################################################################
@get('/favicon.ico')
def returnFavicon():
    return static_file("favicon.ico", root="")
################################################################################
@post('/login')
def login():
    d = request.json
    username = d['username']
    password = d['password']
    with adminConn:
        c = adminConn.cursor()
        query = (c.execute("SELECT PasswordHash, PasswordSalt FROM Admins WHERE Username = ?",(username,))).fetchone()
        if query:
            DBhash = query[0]
            salt = query[1]
            hash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
            if hash == DBhash:
                response.set_cookie("session", encode_session_str({"username" : username}))
                return json.dumps({"response":'Logged In'})
            else:
                return json.dumps({"response":'Invalid Credentials'})
        else:
            return json.dumps({"response":'Invalid Credentials'})
################################################################################
@post('/account')
def account():
    session = request.json['session']
    session = decode_session_str(session)
    if is_logged_in(session):
        username = session['username']
        with adminConn:
            return json.dumps({"username":username})
    else:
        return json.dumps({"username":"Username"})
################################################################################
@get('/admin/static/js/<filename:re:.*\.js>', name='admin/static/js')
def server_static(filename):
    return static_file(filename, root='admin/static/js')
################################################################################
@get('/admin/static/js/components/<filename:re:.*\.js>', name='admin/static/js/components')
def server_static(filename):
    return static_file(filename, root='/admin/static/js/components')
################################################################################
@get('/admin/static/js/libraries/<filename:re:.*\.js>', name='admin/static/js/libraries')
def server_static(filename):
    return static_file(filename, root='static/js/libraries')
################################################################################
@get('/admin/static/js/routers/<filename:re:.*\.js>', name='admin/static/js/routers')
def server_static(filename):
    return static_file(filename, root='admin/static/js/routers')
################################################################################
@get('/admin/static/json/<filename:re:.*\.json>', name='admin/static')
def server_static(filename):
    return static_file(filename, root='static/json')
################################################################################
@get('/admin/static/css/<filename:re:.*\.(css|css.map)>', name='admin/static/css')
def server_static(filename):
    return static_file(filename, root='static/css')
################################################################################
@get('/admin/static/fonts/<filename>')
def server_static(filename):
    return static_file(filename, root='static/fonts', mimetype = 'font/opentype')
################################################################################
@route('/admin/images/<imageName>', name = 'images')
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
run(host = '0.0.0.0', port = 8444, debug = True, reloader = False)
################################################################################