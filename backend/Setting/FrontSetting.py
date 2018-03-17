from flask import render_template, send_from_directory


def FrontSetting(app):
    @app.route('/')
    @app.route('/index')
    def index():
        return render_template('index.html')

    @app.route('/test')
    def graph():
        return render_template('test.html')

    @app.route('/js/<path:path>')
    def send_js(path):
        ''' Returns a file from the reports dir '''
        return send_from_directory('./static/js', path)

    @app.route('/css/<path:path>')
    def send_css(path):
        ''' Returns a file from the reports dir '''
        return send_from_directory('./static/css', path)

    @app.route('/lib/<path:path>')
    def send_lib(path):
        ''' Returns a file from the reports dir '''
        return send_from_directory('./static/lib', path)
