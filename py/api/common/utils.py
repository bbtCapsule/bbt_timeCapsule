# -*- coding: utf-8 -*-
from flask import abort, make_response, jsonify


def my_abort(code, **message):
    abort(make_response(jsonify(**message), code))
