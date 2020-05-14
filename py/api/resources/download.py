from flask import session, request, abort
from check import checkphone,checkTime
from api.database.database import database
import hashlib
import base64
import json
import requests

# 下载音频，文件存在文件夹media/voice
# content_pic,voice为前端传回的对应的file_id
def downloadVoice(content_voice):
    if not content_voice is None:
        try:
            r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Public/getMedia?media_id=%s" % [content_voice], timeout=20)
            t = json.loads(r.text)
            if t["status"] == 0:
                f = open("media/voice/%s.amr" % hashlib.md5(content_voice.encode(encoding='UTF-8')).hexdigest(), "wb")
                f.write(base64.b64decode(t["data"]))
                f.close()
                return True
            else:
                return False
        except:
            return False

def downloadPic(content_pic):
    if not content_pic is None:
        try:
            r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Public/getMedia?media_id=%s" % [content_pic], timeout=20)
            t = json.loads(r.text)
            if t["status"] == 0:
                f = open("media/picture/%s.amr" % hashlib.md5(content_pic.encode(encoding='UTF-8')).hexdigest(), "wb")
                f.write(base64.b64decode(t["data"]))
                f.close()
                return True
            else:
                return False
        except:
            return False

#下载给自己的胶囊
def downloadSelf(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent):
    if checkTime() != 0:
        abort(make_response(jsonify(message="Event is not ongoing."),416))
    if "open_id" not in session:
        sess_id = request.cookies.get("PHPSESSID")
        if sess_id is not None:
            r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo", timeout=5,
                             cookies=dict(PHPSESSID=sess_id))
            try:
                t = json.loads(r.text)
                if "openid" in t:
                    session["open_id"] = t["openid"]
            except:
                pass
    if "open_id" not in session:
        abort(make_response(jsonify(message="Please bind Wechat account first."),401))
    info = database.getInfo(open_id)
    if info is None:
        abort(make_response(jsonify(message="Please update information first."),403))
    rowcount=database.insertSelfCapsule(info[0], time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent)
    return rowcount

#下载给Ta的胶囊
def downloadToTa(sender_name, receiver_name, receiver_tel, receiver_email, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent, content_name, content_phone, content_birth):
    if checkTime() != 0:
        abort(make_response(jsonify(message="Event is not ongoing."),416))
    if "open_id" not in session:
        sess_id = request.cookies.get("PHPSESSID")
        if sess_id is not None:
            r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo", timeout=5,
                             cookies=dict(PHPSESSID=sess_id))
            try:
                t = json.loads(r.text)
                if "openid" in t:
                    session["open_id"] = t["openid"]
            except:
                pass
    if "open_id" not in session:
        abort(make_response(jsonify(message="Please bind Wechat account first."),401))
    rowcount=database.insertToTaCapsule(sender_name, receiver_name, receiver_tel, receiver_email, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent, content_name, content_phone, content_birth)
    return rowcount

#下载给陌生人的胶囊
def downloadStranger(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice):
    if checkTime() != 0:
        abort(make_response(jsonify(message="Event is not ongoing."),416))
    if "open_id" not in session:
        sess_id = request.cookies.get("PHPSESSID")
        if sess_id is not None:
            r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo", timeout=5,
                             cookies=dict(PHPSESSID=sess_id))
            try:
                t = json.loads(r.text)
                if "openid" in t:
                    session["open_id"] = t["openid"]
            except:
                pass
    if "open_id" not in session:
        abort(make_response(jsonify(message="Please bind Wechat account first."),401))
    info = database.getInfo(open_id)
    if info is None:
        abort(make_response(jsonify(message="Please update information first."),403))
    rowcount=database.insertStraengerCpasule(info[0], time_limit, cap_template, cap_location, content_word, content_pic, content_voice)
    return rowcount
