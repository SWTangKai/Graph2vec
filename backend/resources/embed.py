import pandas as pd
from flask import jsonify
from flask_restful import Resource
import os


class EmbedResource(Resource):
    def __init__(self):
        self.DATA_PATH = './data/'
        print(os.listdir())

    def get(self, filename):
        factor = -1000
        data = pd.read_csv(self.DATA_PATH + filename + '.emd', sep=' ',
                           header=-1).sort_values(0).set_index(0)
        node = [[data.ix[i][1] * factor, data.ix[i][2] * factor]
                for i in range(1, len(data) + 1)]
        return jsonify(node)
