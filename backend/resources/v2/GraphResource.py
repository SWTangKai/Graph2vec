from flask import jsonify
from flask_restful import Resource


class GraphV2List(Resource):
    def __init__(self, mongo):
        self.mongo = mongo
        self.collection_names = mongo.db.collection_names()

    def get(self):
        return jsonify(self.mongo.db.collection_names())


class GraphsItem(Resource):
    def __init__(self, mongo):
        self.mongo = mongo
        self.collection_names = mongo.db.collection_names()

    def get(self, filename, ID):
        if filename in self.collection_names:
            col = self.mongo.db[filename]
            if ID == 'subStruc':
                query = col.find({'type': 'remarkable_group'})
                return jsonify(list(map(lambda i: i['data'], query)))
            else:
                query = col.find_one({'type': ID})
                return jsonify(query['data'])
        return 'Error'


class GraphInfo(Resource):
    def __init__(self, mongo):
        self.mongo = mongo
        self.collection_names = mongo.db.collection_names()

    def get(self, filename):
        if filename in self.collection_names:
            col = self.mongo.db[filename]
            query = col.find_one({'type': 'info'})
            return jsonify(query['data'])


class SubGraph(Resource):
    def __init__(self, mongo):
        self.mongo = mongo
        self.collection_names = mongo.db.collection_names()

    def get(self, filename, ID):
        if filename in self.collection_names:
            col = self.mongo.db[filename]
            print(col)
            query = col.find_one(
                {'type': 'sub_groups_edge', "group_id": ID})
            return jsonify({"nodes": query['nodes'], "links": query['edges']})
