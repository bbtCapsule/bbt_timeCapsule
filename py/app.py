from flask import Flask
import config
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = config.app['secret_key']
CORS(app, supports_credentials=True)

from api.resources import bp
from api.middleware import before_request

app.register_blueprint(bp, url_prefix='/')
app.before_request(before_request)

if __name__ == '__main__':
    app.run()
