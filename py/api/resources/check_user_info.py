import requests
from api.database import database
from flask import jsonify, session
from . import bp


@bp.route('/check_user_info', methods=['GET'])
def check_user_info():
    openid = session['open_id']
    userinfo = database.getInfo(openid)
    if userinfo:
        nickname = userinfo[1]
        phone = userinfo[2]
        email = userinfo[3]
        result = jsonify({'record': True, 'nickname': nickname, 'phone': phone, 'email': email})
        return result

    else:
        return jsonify({'record': False})
