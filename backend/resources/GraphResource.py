import pandas as pd
from flask import jsonify
from flask_restful import Resource
import os


class GraphResource(Resource):
    def __init__(self):
        factor = -1000
        print(os.listdir())
        self.data = pd.read_csv('./data/node2vec.emd', sep=' ',
                                header=-1).sort_values(0).set_index(0)
        self.node = [[self.data.ix[i][1] * factor, self.data.ix[i][2] * factor]
                     for i in range(1, len(self.data) + 1)]

    def get(self):
        return jsonify(self.node)


class GraphResource2(Resource):
    def __init__(self):
        self.data = pd.read_csv('./data/node2vec.edgelist', sep=' ',
                                header=-1)
        self.node = [{'source': int(self.data.ix[i][0]),
                      'target': int(self.data.ix[i][1])} for i in range(len(self.data))]

    def get(self):
        return jsonify(self.node)
