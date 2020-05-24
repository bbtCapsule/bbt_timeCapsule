# -*- coding: utf-8 -*-
from flask import request, session
from . import bp
from .encode import decodeUID
from ..database.database import get_letter
from ..common.utils import my_abort

@bp.route('/letter', methods=['get'])
def letter():
    uid = request.args.get('user_id')
    uid_decode = decodeUID(uid)
    if uid_decode == -1:
        my_abort(404, message="用户不存在")
    return get_letter(uid_decode, session['open_id'])
