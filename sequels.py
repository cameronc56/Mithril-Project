#!/usr/bin/env python
# coding: utf-8
#Sqls file for doing database magic and management

from bottle import *
import sqlite3
import hashlib, uuid
import json
import blowfish
import base64

conn = sqlite3.connect('login.db')
c = conn.cursor()

#Users table
#c.execute("DROP TABLE Users")
#c.execute("CREATE TABLE Users (username text PRIMARY KEY, passwordHash text NOT Null, passwordSalt text, email text, phone text, address text)")
#conn.commit()

#Games Table

#c.execute("DROP TABLE Games")
#c.execute("CREATE TABLE Games (name text PRIMARY KEY, base text, src text, description text, playcount int)")
#c.execute("CREATE TABLE Games (name TEXT PRIMARY KEY, embed TEXT, description TEXT, playcount INT, thumbnailLocation TEXT, dateAdded TIMESTAMP, featured INT)")
#conn.commit()

#DUCK LIFE 3
#stringHTML = "<embed width=\"750\" height=\"480\" base=\"http://external.kongregate-games.com/gamez/0011/2133/live/\" src=\"http://external.kongregate-games.com/gamez/0011/2133/live/embeddable_112133.swf\" type=\"application/x-shockwave-flash\"></embed><br />"
#stringHTML = "<embed width=\"750\" height=\"480\" src=\"/games/Duck_Life_3.swf\" type=\"application/x-shockwave-flash\"></embed><br />"
#baseHTML = "http://external.kongregate-games.com/gamez/0011/2133/live/"
#srcHTML = "http://external.kongregate-games.com/gamez/0011/2133/live/embeddable_112133.swf"
#c.execute("INSERT INTO Games(name, embed, description, playcount, thumbnailLocation, dateAdded, featured) VALUES ('Duck_Life_3', ?, 'Game About Ducks', 0, '/images/ducklife3evolutionthumbnail.png', '12-10-2014', 0)", (stringHTML,))

#Learn To Fly 2
#stringHTML = #<embed width="640" height="480" base="http://external.kongregate-games.com/gamez/0011/5608/live/" src="http://external.kongregate-games.com/gamez/0011/5608/live/embeddable_115608.swf" type="application/x-shockwave-flash"></embed><br/>Play free games at <a href="http://www.kongregate.com/">Kongregate</a>
#stringHTML = "<embed width=\"750\" height=\"480\" src=\"/games/Learn_2_Fly.swf\" type=\"application/x-shockwave-flash\"></embed><br />"
#c.execute("INSERT INTO Games(name, embed, description, playcount, thumbnailLocation, dateAdded, featured) VALUES ('Learn_2_Fly', ?, 'You were able to learn how to fly, but Icebergs stopped you and crushed your dreams. Now youre back for revenge!', 1, '/images/Learn_2_Fly_Thumbnail.png', '12-12-2014', 0)", (stringHTML,))

#c.execute("ALTER TABLE Users ADD favoriteGames text")

conn.commit()


#numberOfGames = 2
#gameData = (c.execute("SELECT name, embed, description, playcount, thumbnailLocation, dateAdded, featured FROM Games ORDER BY featured DESC LIMIT ?", (numberOfGames,))).fetchall()

#print gameData
#print (c.execute("SELECT * FROM Games")).fetchall()

#c.execute("UPDATE Games SET playcount = playcount + 1 WHERE  name = 'DUCK_LIFE_3'")


#<embed width="640" height="480" base="http://external.kongregate-games.com/gamez/0011/5608/live/" src="http://external.kongregate-games.com/gamez/0011/5608/live/embeddable_115608.swf" type="application/x-shockwave-flash"></embed><br/>Play free games at <a href="http://www.kongregate.com/">Kongregate</a>
