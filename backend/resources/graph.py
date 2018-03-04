import pandas as pd
from flask import jsonify
from flask_restful import Resource
import networkx as nx


class GraphResource(Resource):
    def __init__(self):
        self.DATA_PATH = './data/'

    def get(self, filename):
        path = self.DATA_PATH + filename + '.edgelist'
        G = nx.read_edgelist(path)
        df = pd.DataFrame(G.edges()).rename(columns={0: 'source', 1: 'target'})
        links = list(
            df.apply(lambda row: {'source': row['source'], 'target': row.target}, axis=1))
        nodes = [{'id': x, 'size': 1} for x in G.nodes()]
        return jsonify({'nodes': nodes, "links": links})
