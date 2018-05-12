from resources.embed import EmbedItem, EmbedList
from resources.graph import GraphItem, GraphList
from resources.graphstruc import GraphStruItem
from resources.graphstruc import SubStruItem
from resources.v2 import GraphResource
from resources.v2 import SubResource


def ApiSetting(api, dbInstance):
    api.add_resource(EmbedList, '/api/emb/')
    api.add_resource(GraphList, '/api/graph/')
    api.add_resource(EmbedItem, '/api/emb/<string:filename>')
    api.add_resource(GraphItem, '/api/graph/<string:filename>')
    api.add_resource(GraphStruItem, '/api/graph-struc/<string:filename>')
    api.add_resource(SubStruItem, '/api/graph-struc/<string:filename>/<ID>')
    # api.add_resource()
    # v2
    api.add_resource(GraphResource.GraphV2List, '/api/v2/graph/',
                     resource_class_kwargs={'mongo': dbInstance})
    api.add_resource(GraphResource.GraphsItem, '/api/v2/graph-struc/<string:filename>/<ID>',
                     resource_class_kwargs={'mongo': dbInstance})
    api.add_resource(GraphResource.GraphInfo, '/api/v2/graph-struc/<string:filename>',
                     resource_class_kwargs={'mongo': dbInstance})
    api.add_resource(GraphResource.SubGraph, '/api/v2/graph-struc/<string:filename>/sub/<ID>',
                     resource_class_kwargs={'mongo': dbInstance})
    api.add_resource(SubResource.SubInfo, '/api/v2/graph-struc/<string:filename>/subInfo',
                     resource_class_kwargs={'mongo': dbInstance})
    api.add_resource(GraphResource.SubGraphDis, '/api/v2/graph-struc/<string:filename>/subDis/<ID>',
                     resource_class_kwargs={'mongo': dbInstance})
