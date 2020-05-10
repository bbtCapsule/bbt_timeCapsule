from flask import request,session
from database import getInfo
import json
import encode



@app.route('/check_user_info',methods=['POST'])
def check_user_info():
	openid=flask.session['openid']
	if(openid):
		userinfo=getInfo(openid)
		if(userinfo):
			nickname=userinfo[1]
			phone=userinfo[2]
			email=userinfo[3]
			result=jsonify({'record':True,'nickname':nickname,'phone':phone,'email':email})
			return result

		else :
			return jsonify({'record':False})