from flask import request,session
from database import insertToTaCapsule,insertSelfCapsule,insertStraengerCpasule
from download import downloadVoice,downloadPic,downloadSelf,downloadToTa,downloadStranger
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

	if(content_voice):#有音频则下载，无则视为成功。
		result_voice=downloadVoice(content_voice)
	else:
		result_voice=True
	if(content_pic):#同理
		result_pic=downloadPic(content_pic)
	else:
		result_pic=True

	if (data['capsule']==0):#私密
		rowcount=downloadSelf(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent)
	elif(data['capsule']==1):#给Ta
		rowcount=downloadToTa(sender_name, receiver_name, receiver_tel, receiver_email, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent, content_name, content_phone, content_birth)
	elif(data['capsule']==2):#陌生人
		rowcount=downloadStranger(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice)

	if(rowcount):
		if(result_pic and result_voice):
			return{'errcode':0,'errmsg':"成功获取胶囊",'mesg_voice':"成功"，'mesg_pic':"成功"}
		elif((not result_pic) and (not result_voice)):
			return{'errcode':1,'errmsg':"语音或图片加载失败",'mesg_voice':"失败"，'mesg_pic':"失败"}
		elif(not result_pic):
			return{'errcode':1,'errmsg':"语音或图片加载失败",'mesg_voice':"成功"，'mesg_pic':"失败"}
		elif(not result_voice):
			return{'errcode':1,'errmsg':"语音或图片加载失败",'mesg_voice':"失败"，'mesg_pic':"成功"}
	else:
		return{'errcode':1,'errmsg':"获取胶囊失败",'mesg_voice':"失败"，'mesg_pic':"失败"}
