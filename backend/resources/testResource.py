import pandas as pd
import json
import networkx as nx
from flask_restful import Resource


class TestPathAPI(Resource):
    def __init__(self):
        factor = -1000
        self.data = pd.read_csv('./data/node2vec.emd', sep=' ',
                                header=-1).sort_values(0).set_index(0)
        self.node = [[self.data.ix[i][1] * factor, self.data.ix[i][2] * factor]
                     for i in range(1, len(self.data) + 1)]

    def get(self):
        return jsonify(self.node)

# TODO: message Test


class MessageListAPI(Resource):
    def __init__(self, path='./data/karate-mirrored.edgelist'):
        G = nx.read_edgelist(path)
        df = pd.DataFrame(G.edges()).rename(columns={0: 'source', 1: 'target'})
        self.links = list(
            df.apply(lambda row: {'source': row['source'], 'target': row.target}, axis=1))
        self.nodes = [{'id': x, 'size': 1} for x in G.nodes()]

    def get(self):
        return jsonify({'nodes': self.nodes, "links": self.links})

# TODO: message Test


class MessageAPI(Resource):
    def get(self, id):
        pass

    def post(self, id):
        pass
