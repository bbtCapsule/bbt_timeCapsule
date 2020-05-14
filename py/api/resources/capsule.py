from flask import request,session
from database import insertToTaCapsule,insertSelfCapsule,insertStraengerCpasule
from dowload import downloadVoice,downloadPic,downloadSelf,downloadToTa,downloadStranger
import datetime
@app.route('/capsule',methods=['POST'])
def capsule():
	data=request.get_json()
	open_id=session["openid"]
	time_limit=data['time_limit']
	cap_template=data['cap_template']
	cap_location=data['cap_location']
	content_word=data['content_word']
	content_pic=data['content_pic']
	content_voice=data['content_voice']
	content_name=data['content_name']
	content_phone=data['content_phone']
	content_birth=data['content_birth']
	receiver_name=data['receiver_name']
	receiver_tel=data['receiver_tel']
	receiver_email=data['receiver_email']
	now=datetime.datetime.now()
	registered=now.strftime("%Y-%m-%d %H:%M:%S")
	if(time_limit):
		sent=(now+datetime.timedelta(days=+365)).strftime("%Y-%m-%d %H:%M:%S")
	else:
		sent=(now+datetime.timedelta(days=+180)).strftime("%Y-%m-%d %H:%M:%S")
	if (data['capsule']==0):#私密
		result=downloadSelf(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent)
		if(result['err_pic'] and result['err_voice']):
			return{'errcode':0,'errmsg':"语音图片下载成功"}
		elif((not result['err_pic']) and (not result['err_voice'])):
			return{'errcode':1,'errmsg':"语音图片下载失败"}
		elif(not result['err_pic']):
			return{'errcode':1,'errmsg':"图片下载失败"}
		elif(not result['err_voice']):
			return{'errcode':1,'errmsg':"语音下载失败"}

	elif(data['capsule']==1):#给Ta
		result=downloadToTa(sender_name, receiver_name, receiver_tel, receiver_email, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent, content_name, content_phone, content_birth)
		if(result['err_pic'] and result['err_voice']):
			return{'errcode':0,'errmsg':"语音图片下载成功"}
		elif((not result['err_pic']) and (not result['err_voice'])):
			return{'errcode':1,'errmsg':"语音图片下载失败"}
		elif(not result['err_pic']):
			return{'errcode':1,'errmsg':"图片下载失败"}
		elif(not result['err_voice']):
			return{'errcode':1,'errmsg':"语音下载失败"}
	elif(data['capsule']==2):#陌生人
		result=downloadStranger(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice)
		if(result['err_pic'] and result['err_voice']):
			return{'errcode':0,'errmsg':"语音图片下载成功"}
		elif((not result['err_pic']) and (not result['err_voice'])):
			return{'errcode':1,'errmsg':"语音图片下载失败"}
		elif(not result['err_pic']):
			return{'errcode':1,'errmsg':"图片下载失败"}
		elif(not result['err_voice']):
			return{'errcode':1,'errmsg':"语音下载失败"}
