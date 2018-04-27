from flask import jsonify
from flask_restful import Resource
from collections import Counter


class SubInfo(Resource):
    def __init__(self, mongo):
        self.mongo = mongo
        self.collection_names = mongo.db.collection_names()

    def get(self, filename):
        if filename in self.collection_names:
            col = self.mongo.db[filename]
            query = col.find_one({'type': "subStruc"})
            return jsonify(self.info(query['data']))

    def info(self, data):
        df = []
        for kind in data:
            tmp = {
                "id": kind['id'],
            }
            count = Counter()
            maxs = -1
            for n in kind['nodes']:
                count[n['c']] += 1
                if maxs < n['c']:
                    maxs = n['c']
            tmp['count'] = dict(count)
            df.append(tmp)
        return df
