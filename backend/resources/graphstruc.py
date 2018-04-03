import pandas as pd
from flask import jsonify
from flask_restful import Resource
import os
import networkx as nx
from sklearn import cluster
from collections import Counter


class GraphStruList(Resource):
    def get(self):
        return jsonify(os.listdir('data'))


import json


class GraphStruData():
    def __init__(self, filename):
        self.DATA_PATH = './data/'
        self.name = filename

    def reconstruct(self):
        filename = self.name
        graphPath = self.DATA_PATH + filename + '/' + filename + '.edgelist'
        embPath = self.DATA_PATH + filename + '/' + filename + '.emb'
        if not os.path.isfile(graphPath) or not os.path.isfile(embPath):
            self.links = None
            self.nodes = None
        self.graph = nx.read_edgelist(graphPath)
        df = pd.DataFrame(self.graph.edges()).rename(
            columns={0: 'source', 1: 'target'})
        self.links = list(
            df.apply(lambda row: {'source': row['source'], 'target': row.target}, axis=1))

        emb = pd.read_csv(embPath, sep=' ',
                          header=-1).sort_values(0).rename(columns={0: 'id', 1: 'x', 2: 'y'})
        emb['id'] = emb['id'].astype('int').astype(str)
        cls = cluster.DBSCAN(eps=0.25, min_samples=1)
        emb['label'] = cls.fit_predict(emb[['x', 'y']]).astype('int')
        self.emb = emb
        self.nodes = [self.OneEmbNode(x) for x in self.graph.nodes()]

    def OneEmbNode(self, n):
        emb = self.emb
        ID = n
        pos = [round(emb.loc[emb['id'] == n, 'x'].values[0], 6),
               round(emb.loc[emb['id'] == n, 'y'].values[0], 6)]
        c = emb.loc[emb['id'] == n, 'label'].values[0]
        return {'id': ID, "pos": pos, 'c': int(c), 'size': 4}

    def _get(self, type):
        with open(self.DATA_PATH + self.name + '/' + self.name + '.' + type, 'r') as f:
            return json.load(f)

    def GetOriGraph(self):
        return self._get('graph')

    # def GetMainGraph(self):
    #     return self._get('mainGraph')

    def GetSubStrucOf(self, ID):
        return self._get(ID)


class GraphData:
    def __init__(self, filename):
        self.name = filename
        path = './data/' + filename + '/' + filename
        self.graph = nx.read_edgelist(path + '.edgelist')

    def __degree(self):
        return self.graph.degree()

    def __clustering(self):
        return nx.clustering(self.graph.to_undirected(), self.graph.nodes())

    def __degree_centrelity(self):
        return nx.degree_centrality(self.graph)

    def __betweness_centrality(self):
        """ 计算介数中心性0x007"""
        return nx.betweenness_centrality(self.graph, None, True)

    def __closeness_centrality(self):
        """ 计算接近度中心性0x008"""
        return nx.closeness_centrality(self.graph)

    def __eigenvector_centrality(self):
        """ 计算特征向量中心性0x009"""
        return nx.eigenvector_centrality_numpy(self.graph)

    def Graph_info(self):
        KEEP = 3
        degree = self.__degree()
        clustering = self.__clustering()
        degree_centrelity = self.__degree_centrelity()
        betweness_centrality = self.__betweness_centrality()
        closeness_centrality = self.__closeness_centrality()
        eigenvector_centrality = self.__eigenvector_centrality()
        desity = round(nx.density(self.graph), 6)
        return {"ID": self.name,
                "degree_centrelity": self.AvgGegree(degree_centrelity),
                "clustering": self.AvgGegree(clustering),
                "betweness_centrality": self.AvgGegree(betweness_centrality),
                "degree": self.AvgGegree(degree),
                "closeness_centrality": self.AvgGegree(closeness_centrality),
                "eigenvector_centrality": self.AvgGegree(eigenvector_centrality),
                "density": desity}

    def AvgGegree(self, ds):
        count = 0
        sums = 0
        for i in ds:
            count += 1
            sums += ds[i]
        return round(sums / count, 6)


class GraphStruItem(Resource):
    def __init__(self):
        pass

    def get(self, filename):
        return jsonify(GraphData(filename).Graph_info())


class SubStruItem(Resource):
    def __init__(self):
        pass

    def get(self, filename, ID):
        return jsonify(GraphStruData(filename).GetSubStrucOf(ID))
