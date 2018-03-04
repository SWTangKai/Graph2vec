from flask import Flask, jsonify
from flask import render_template, send_from_directory
from flask_restful import Api, Resource
from sqlalchemy.sql.sqltypes import TIMESTAMP
import datetime
from resources.GraphResource import GraphResource, GraphResource2
app = Flask(__name__)
api = Api(app)

#################Front End#########################


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/')
@app.route('/graph')
def graph():
    return render_template('graph.html')


@app.route('/js/<path:path>')
def send_js(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./assert/js', path)


@app.route('/css/<path:path>')
def send_css(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./assert/css', path)


@app.route('/lib/<path:path>')
def send_lib(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./assert/lib', path)
#################Front End#########################

#################Back End##########################


#################API Setting##############
api.add_resource(GraphResource, '/graph/api/v1.0/test/')
api.add_resource(GraphResource2, '/graph/api/v1.0/test1/')
api.add_resource(MessageListAPI, '/todo/api/v1.0/messages',
                 endpoint='messages')
api.add_resource(
    MessageListAPI, '/todo/api/v1.0/messages/<int:id>', endpoint='message')


# #############API Setting##############


#################Back End##########################
if __name__ == '__main__':
    app.run(debug=True)
