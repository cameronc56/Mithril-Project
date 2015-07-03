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

conn = sqlite3.connect('login.db')

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
    return static_file(filename, root='/admin/static/js/libraries')
################################################################################
@get('/admin/static/js/routers/<filename:re:.*\.js>', name='admin/static/js/routers')
def server_static(filename):
    return static_file(filename, root='/admin/static/js/routers')
################################################################################
@get('/admin/static/json/<filename:re:.*\.json>', name='admin/static')
def server_static(filename):
    return static_file(filename, root='admin/static/json')
################################################################################
@get('/admin/static/css/<filename:re:.*\.(css|css.map)>', name='admin/static/css')
def server_static(filename):
    return static_file(filename, root='admin/static/css')
################################################################################
@get('/admin/static/fonts/<filename>')
def server_static(filename):
    return static_file(filename, root='admin/static/fonts', mimetype = 'font/opentype')
################################################################################
@route('/admin/images/<imageName>', name = 'images')
def send_image(imageName):
    return static_file(imageName, root = 'images', mimetype = 'image/png')
################################################################################
run(host = '0.0.0.0', port = 8444, debug = True, reloader = False)
################################################################################