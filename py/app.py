from flask import Flask
import uuid
import mysql.connector
import config

app = Flask(__name__)
app.config['SECRET_KEY'] = config.app['secret_key']


from api.database.database import *
from api.resources import *


if __name__ == '__main__':
    app.run()