#检查微信登录。/check_wechat_login.py
import flask
import requests
import json
from app import app

@app.route('/check_wechat_login',methods=['GET'])
def check_wechat_login():
	if 'openid' not in flask.session:
        phpsessid = flask.request.cookies.get('PHPSESSID')
        if phpsessid is not None:
            res = requests.get(
                'https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo',
                                    cookies={'PHPSESSID': phpsessid}, timeout=10)
            try:
                data = json.loads(res.text)
                if 'openid' in data:
                    flask.session['openid'] = data['openid']
            except:
                pass
    if 'openid' not in flask.session:
        flask.abort(
            flask.make_response(
                flask.jsonify({'message':'用户未登录'}), 401
            ))
    return flask.session['openid']
