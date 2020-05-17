# -*- coding: utf-8 -*-
from ..common.utils import my_abort
from flask import session, request
import requests
import json


def check_wechat_login():
    if 'open_id' not in session:
        phpsessid = request.cookies.get('PHPSESSID')
        if phpsessid is not None:
            res = requests.get('https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo',
                               cookies={'PHPSESSID': phpsessid}, timeout=10)
            try:
                data = json.loads(res.text)
                if 'openid' in data:
                    session['open_id'] = data['openid']
            except:
                pass
    if 'open_id' not in session:
        my_abort(401, message="请先绑定微信")
    return ''


def check_wechat_before_request():
    check_wechat_login()
