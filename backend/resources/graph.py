import pandas as pd
from flask import jsonify
from flask_restful import Resource
import networkx as nx
import os


class GraphList(Resource):
    def get(self):
        return jsonify(os.listdir('data'))


class GraphData():
    def __init__(self, filename):
        self.DATA_PATH = './data/'
        self.path = self.DATA_PATH + filename + '/' + filename + '.edgelist'
        graph = nx.read_edgelist(self.path)
        df = pd.DataFrame(graph.edges()).rename(
            columns={0: 'source', 1: 'target'})
        self.links = list(
            df.apply(lambda row: {'source': row['source'], 'target': row.target}, axis=1))
        self.nodes = [{'id': x, 'size': 4} for x in graph.nodes()]

    def GetEdge(self):
        return {'nodes': self.nodes, "links": self.links}


class GraphItem(Resource):
    def __init__(self):
        # self.data = {i: GraphData(i) for i in os.listdir('data')}
        pass

    def get(self, filename):
        return jsonify(GraphData(filename).GetEdge())
