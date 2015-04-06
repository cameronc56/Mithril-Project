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

#favoriteGames Table
#c.execute("DROP TABLE favoriteGames")
#c.execute("CREATE TABLE favoriteGames (id integer PRIMARY KEY, username text, gameTitle text)")
conn.commit()
