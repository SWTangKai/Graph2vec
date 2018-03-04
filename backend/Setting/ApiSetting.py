from resources.embed import EmbedResource
from resources.graph import GraphResource


def ApiSetting(api):
    api.add_resource(EmbedResource, '/api/emb/<string:filename>')
    api.add_resource(GraphResource, '/api/graph/<string:filename>')
