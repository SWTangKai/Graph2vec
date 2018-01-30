from flask import Flask, jsonify
from flask import render_template, send_from_directory
from flask_restful import Api, Resource
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.sqltypes import TIMESTAMP
import datetime
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/source/test.db'
# db = SQLAlchemy(app)
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
        self.data = pd.read_csv('./data/testPoints.csv')
        self.geoJson = []
        for i in range(len(self.data)):
            self.geoJson.append([self.data.ix[i][3], self.data.ix[i][4]])
    def get(self):       
        return jsonify(self.geoJson)

## TODO: message Test
class MessageListAPI(Resource):
    def get(self):
        pass
    def post(self): 
        pass

## TODO: message Test
class MessageAPI(Resource):
    def get(self, id):
        pass
    def post(self, id):
        pass    
#################Resource##############

#################ORM##############
from flask_restful import reqparse, fields, marshal_with, abort, marshal

time_rec_fields = {
    'rec_level_0': fields.Integer,
    'rec_md5': fields.String,
    'rec_phone': fields.String,
    'rec_lng': fields.Float,
    'rec_lat': fields.Float,
    'rec_contime': fields.String,
    'rec_rectime': fields.String,
    'rec_days': fields.Integer,
    'rec_index': fields.Integer,
} 

class DBtimeRec(db.Model):
    __tablename__ = 'timeRec'
    rec_level_0 = db.Column(db.Integer, primary_key = True)
    rec_md5 = db.Column(db.Text)
    rec_phone = db.Column(db.Text)
    rec_lng = db.Column(db.Float)
    rec_lat = db.Column(db.Float)
    rec_contime = db.Column(TIMESTAMP, default = datetime.datetime)
    rec_rectime = db.Column(TIMESTAMP, default = datetime.datetime)
    rec_days = db.Column(db.Integer)
    rec_index = db.Column(db.Integer)

#################ORM##############

#################API Setting##############
api.add_resource(TestPathAPI, '/map/api/v1.0/test/')
api.add_resource(MessageListAPI, '/todo/api/v1.0/messages', endpoint = 'messages')
api.add_resource(MessageListAPI, '/todo/api/v1.0/messages/<int:id>', endpoint = 'message')


# #############API Setting##############


#################Back End##########################
if __name__ == '__main__':
    app.run(debug = True)