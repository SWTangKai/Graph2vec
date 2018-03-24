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


class GraphStruData():
    def __init__(self, filename):
        self.DATA_PATH = './data/'
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

    def GetEdge(self):
        return {'nodes': self.nodes, "links": self.links}

    def FindSubStruc(self, center, wise=2):
        """FindSubStruc

        Arguments:
            center {string} -- [node]

        Keyword Arguments:
            wise {int} -- [number of bfs layer] (default: {2})
        """
        record = []
        queue = [center]
        for _ in range(wise):
            for i in list(queue):
                c = queue.pop(0)
                neighbors = self.graph.neighbors(c)
                for n in neighbors:
                    queue.append(n)
                    record.append((c, n))
        return list(set(record))

    def GetSubStrucOf(self, node):
        counter = Counter()
        edges = self.FindSubStruc(node)
        for e in edges:
            counter[e[0]] += 1
            counter[e[1]] += 1
        edges = [e for e in edges if counter[e[0]] != 1 and counter[e[1]] != 1]
        nodes = []
        for e in edges:
            nodes.append(e[0])
            nodes.append(e[1])
        nodes = list(set(nodes))
        ns = [{'id': n, 'c': int(self.emb.loc[self.emb['id'] == n, 'label'].values[0])}
              for n in nodes]
        es = [{'source': e[0], 'target':e[1]} for e in edges]
        return {'links': es, 'nodes': ns}

    def SubStrucGraph(self):
        pass

    def GetSubStruc(self):
        graphs = self.SubStrucGraph()

        return graphs


class GraphStruItem(Resource):
    def __init__(self):
        pass

    def get(self, filename):
        return jsonify(GraphStruData(filename).GetEdge())


class SubStruItem(Resource):
    def __init__(self):
        pass

    def get(self, filename, ID):
        return jsonify(GraphStruData(filename).GetSubStrucOf(ID))
