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
#c.execute("CREATE TABLE Users (Username text PRIMARY KEY, PasswordHash text NOT Null, PasswordSalt text NOT Null, Email text, Phone text, Address text)")
#conn.commit()

#favoriteGames Table
#c.execute("DROP TABLE favoriteGames")
#c.execute("CREATE TABLE FavoriteGames (Id integer PRIMARY KEY, Username text, GameTitle text)")

#threads table
#c.execute("CREATE TABLE Threads (ThreadId integer PRIMARY KEY, Username text, Title text NOT Null, Date text NOT Null, Thumbnail text, BodyText text)")
#comments table
#c.execute("CREATE TABLE Posts (PostId integer PRIMARY KEY, ThreadId integer NOT Null, Username text, Date text NOT Null, BodyText text)")

conn.commit()
