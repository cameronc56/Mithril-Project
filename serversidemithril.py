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


@get('/static/<filename:re:.*\.js>', name='static')
def server_static(filename):
	return static_file(filename, root='static/js')

@get('/static/<filename:re:.*\.css>', name='static/css')
def server_static(filename):
	return static_file(filename, root='static/css')

@get('/<filename:re:.*\.(eot|ttf|woff|svg)>')
def fonts(filename):
	return static_file(filename, root='static/fonts')

run(host = '0.0.0.0', port = 8443, debug = True, reloader = False)