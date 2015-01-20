#!/usr/bin/env python
from bottle import *
app = default_app()

#
#@get('/game')
#def returnIndex():
#	return template('main', get_url = app.get_url)


@get('/')
def returnIndex():
	return template('index', get_url = app.get_url)


@route('/static/<filename>', name='static')
def server_static(filename):
	return static_file(filename, root='static')

run(host = '0.0.0.0', port = 8443, debug = True, reloader = False)