
#!/usr/bin/env python

from bottle import *
import sqlite3
import hashlib, uuid
import json
import blowfish
import base64
import sendgrid


conn = sqlite3.connect('login.db')
c = conn.cursor()

#Users table
#c.execute("DROP TABLE Users")
#c.execute("CREATE TABLE Users (username text PRIMARY KEY, passwordHash text NOT Null, passwordSalt text, email text, phone text, address text)")
#conn.commit()

#Games Table
#conn = sqlite3.connect('login.db')
#c = conn.cursor()
#c.execute("CREATE TABLE Games (name text PRIMARY KEY, location text, description text)")
#conn.commit()

#Hash and Salt Password Algorithm
#salt = uuid.uuid4().hex
#hashed_password = hashlib.sha512(password + salt).hexdigest()

#secret key: 
cryptoKey = "zOMeALKStvK3SxqRjm6xeqrt0Hn85oARUqYNa7kU"

app = default_app()

################################################################################
@get('/')
def returnIndex():
	return template('index', get_url = app.get_url)
################################################################################
@post('/showGame')
def showGame():
	d = request.json
	gameTitle = d['gameTitle']
	conn = openConn()
	with conn:
		c = conn.cursor()
		if (c.execute("SELECT * FROM Games WHERE name = ?",(gameTitle,))).fetchone() == None:
			return '<center><h3>Page does not exist</h3></center>'
		else:
			query = (c.execute("SELECT name, embed, description FROM Games WHERE name = ?",(gameTitle,))).fetchone()
			gameTitle = gameTitle.replace("_", " ")
			gameEmbed = query[1]
			gameDescription = query[2]
			return json.dumps({"gameTitle":gameTitle, "gameEmbed":gameEmbed, "gameDescription":gameDescription})
################################################################################
@post('/register')
def register():
	d = request.json
	username = d['username']
	password = d['password']
	email = d['email']
	phone = d['phone']
	address = d['address']
	conn = openConn()
	with conn:
		c = conn.cursor()
		if (c.execute("SELECT passwordSalt, passwordHash FROM Users WHERE username = ?",(username,))).fetchone():
			return json.dumps({"error":'Username Taken'})
		else:
			salt = uuid.uuid4().hex
			hash = hashlib.sha512((password + salt).encode('utf-8')).hexdigest()
			c.execute("INSERT INTO Users(username, passwordHash, passwordSalt, email, phone, address) VALUES(?,?,?,?,?,?)", (username, hash, salt, email, phone, address))
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
		var =  (c.execute("SELECT passwordHash, passwordSalt FROM Users WHERE username = ?",(username,))).fetchone()
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
@post('/accountInfo')
def accountInfo():
	#cookies = request.json
	#session = cookies['session']
	session = (request.json)['session']
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
			phone = (c.execute("SELECT phone FROM Users WHERE username = ?",(username,))).fetchone()
			phone = phone[0]
			if(phone == None):
				phone = "No phone attached to this Account"
			address = (c.execute("SELECT address FROM Users WHERE username = ?",(username,))).fetchone()
			address = address[0]
			if(address == None):
				address = "No address attached to this Account"
			return json.dumps({"username":username, "email":email, "phone":phone, "address":address})
	else:
		return json.dumps({"username":"Click To Login", "email":"No Email", "phone":"No Phone", "address":"No Address"})
################################################################################
@get('/logout')
def logout():
	response.delete_cookie("session")
	redirect('/')
################################################################################
                            #FEATURED GAMES
@post('/featuredGames')
def featuredGames():
	d = request.json
	numberOfGames = d['numberOfGames']
	conn = openConn()
	with conn:
		c = conn.cursor()
		gameData = (c.execute("SELECT name, embed, description, playcount, thumbnailLocation, dateAdded, featured FROM Games ORDER BY featured DESC LIMIT ?", (numberOfGames,))).fetchall()
		row = []
		for i in range(len(gameData)):
			row.append(gameData[i])
		return json.dumps({"gameData":row})
################################################################################
					        #POPULAR GAMES
@post('/popularGames')
def popularGames():
	d = request.json
	numberOfGames = d['numberOfGames']
	conn = openConn()
	with conn:
		c = conn.cursor()
		gameData = (c.execute("SELECT name, embed, description, playcount, thumbnailLocation, dateAdded, featured FROM Games ORDER BY playcount DESC LIMIT ?", (numberOfGames,))).fetchall()
		return json.dumps({"gameData":gameData})
################################################################################
							#NEW GAMES
@post('/newGames')
def newGames():
	d = request.json
	numberOfGames = d['numberOfGames']
	conn = openConn()
	with conn:
		c = conn.cursor()
		gameData = (c.execute("SELECT name, embed, description, playcount, thumbnailLocation, dateAdded, featured FROM Games ORDER BY dateAdded DESC LIMIT ?", (numberOfGames,))).fetchall()
		return json.dumps({"gameData":gameData})
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
	print status
	return json.dumps({"status":status})
################################################################################
@route('/images/<imageName>', name = 'images')
def send_image(imageName):
	return static_file(imageName, root = 'images', mimetype = 'image/png')                                             
################################################################################
@route('/static/<filename>', name='static')
def server_static(filename):
    return static_file(filename, root='static')
################################################################################
@route('/games/<gameTitle>', name='games')
def getGame(gameTitle):
	return static_file(gameTitle, root='games')
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
#AT WORK 
#run(host = '192.168.17.45', port = 8080, debug = True, reloader = False)
#AT HOME
run(host = '0.0.0.0', port = 8443, debug = False, reloader = False)
################################################################################