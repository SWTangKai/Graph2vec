from flask import Flask, jsonify

from flask_restful import Api, Resource
from flask_webpack import Webpack
from flask_cors import CORS

from sqlalchemy.sql.sqltypes import TIMESTAMP
import datetime

from Setting.FrontSetting import FrontSetting
from Setting.ApiSetting import ApiSetting

from config.settings import *

api = Api()
webpack = Webpack()


def create_app(application_name=__name__, setting_override=None):
    app = Flask(application_name)
    register_extensions(app)
    return app


def register_extensions(app):
    api.init_app(app)
    # webpack.init_app(app)


print(WEBPACK_MANIFEST_PATH)

app = Flask(__name__)
api = Api(app)
FrontSetting(app)
ApiSetting(api)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
