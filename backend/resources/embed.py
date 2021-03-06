import pandas as pd
from flask import jsonify
from flask_restful import Resource
import os


class EmbedList(Resource):
    def get(self):
        return jsonify(os.listdir('data'))


class EmbedItem(Resource):
    def __init__(self):
        self.DATA_PATH = './data/'
        print(os.listdir())

    def get(self, filename):
        factor = 1000
        path = self.DATA_PATH + filename + '/' + filename + '.emb'
        data = pd.read_csv(path, sep=' ',
                           header=-1).sort_values(0)
        node = [{'id': str(int(data.ix[i][0])), "pos":[round(data.ix[i][1] * factor) / factor, round(data.ix[i][2] * factor) / factor]}
                for i in range(0, len(data))]
        return jsonify(node)
