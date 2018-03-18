from resources.embed import EmbedItem, EmbedList
from resources.graph import GraphItem, GraphList


def ApiSetting(api):
    api.add_resource(EmbedList, '/api/emb/')
    api.add_resource(GraphList, '/api/graph/')
    api.add_resource(EmbedItem, '/api/emb/<string:filename>')
    api.add_resource(GraphItem, '/api/graph/<string:filename>')
