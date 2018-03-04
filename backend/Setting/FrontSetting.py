from flask import render_template, send_from_directory


def FrontSetting(app):
    @app.route('/')
    @app.route('/index')
    def index():
        return render_template('index.html')

    @app.route('/')
    @app.route('/graph')
    def graph():
        return render_template('graph.html')

    @app.route('/js/<path:path>')
    def send_js(path):
        ''' Returns a file from the reports dir '''
        return send_from_directory('./assert/js', path)

    @app.route('/css/<path:path>')
    def send_css(path):
        ''' Returns a file from the reports dir '''
        return send_from_directory('./assert/css', path)

    @app.route('/lib/<path:path>')
    def send_lib(path):
        ''' Returns a file from the reports dir '''
        return send_from_directory('./assert/lib', path)


from resources.embed import EmbedResource
from resources.graph import GraphResource


def ApiSetting(api):
    api.add_resource(EmbedResource, '/api/emb/<string:filename>')
    api.add_resource(GraphResource, '/api/graph/<string:filename>')
