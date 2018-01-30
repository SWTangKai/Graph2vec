from flask import Flask, jsonify
from flask import render_template, send_from_directory
from flask_restful import Api, Resource
from sqlalchemy.sql.sqltypes import TIMESTAMP
import datetime
app = Flask(__name__)
api = Api(app)

#################Front End#########################


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/js/<path:path>')
def send_js(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./js', path)


@app.route('/css/<path:path>')
def send_css(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./css', path)


@app.route('/lib/<path:path>')
def send_lib(path):
    ''' Returns a file from the reports dir '''
    return send_from_directory('./lib', path)
#################Front End#########################

#################Back End##########################


#################Resource##############
import pandas as pd
import json


class TestPathAPI(Resource):
    def __init__(self):
        self.data = pd.read_csv('./data/p.csv', sep=' ',
                                header=-1).sort_values(0).set_index(0)
        self.node = [[self.data.ix[i][1], self.data.ix[i][2]]
                     for i in range(1, len(self.data) + 1)]

    def get(self):
        return jsonify(self.node)

# TODO: message Test


class MessageListAPI(Resource):
    def get(self):
        pass

    def post(self):
        pass

# TODO: message Test


class MessageAPI(Resource):
    def get(self, id):
        pass

    def post(self, id):
        pass
#################Resource##############


#################API Setting##############
api.add_resource(TestPathAPI, '/graph/api/v1.0/test/')
api.add_resource(MessageListAPI, '/todo/api/v1.0/messages',
                 endpoint='messages')
api.add_resource(
    MessageListAPI, '/todo/api/v1.0/messages/<int:id>', endpoint='message')


# #############API Setting##############


#################Back End##########################
if __name__ == '__main__':
    app.run(debug=True)
