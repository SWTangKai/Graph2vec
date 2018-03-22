from resources.embed import EmbedItem, EmbedList
from resources.graph import GraphItem, GraphList
from resources.graphstruc import GraphStruItem
from resources.graphstruc import SubStruItem


def ApiSetting(api):
    api.add_resource(EmbedList, '/api/emb/')
    api.add_resource(GraphList, '/api/graph/')
    api.add_resource(EmbedItem, '/api/emb/<string:filename>')
    api.add_resource(GraphItem, '/api/graph/<string:filename>')
    api.add_resource(GraphStruItem, '/api/graph-struc/<string:filename>')
    api.add_resource(SubStruItem, '/api/graph-struc/<string:filename>/<ID>')
