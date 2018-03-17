from flask import Flask, jsonify

from flask_restful import Api, Resource
from sqlalchemy.sql.sqltypes import TIMESTAMP
import datetime

from Setting.FrontSetting import FrontSetting
from Setting.ApiSetting import ApiSetting

app = Flask(__name__)
api = Api(app)

FrontSetting(app)
ApiSetting(api)

if __name__ == '__main__':
    app.run(debug=True)
