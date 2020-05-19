from flask import current_app
from api.database import database
import hashlib
import base64
import json
import requests
import traceback
from ..common.utils import my_abort


# 下载音频，文件存在文件夹media/voice
# content_pic,voice为前端传回的对应的file_id
def downloadVoice(content_voice):
    try:
        r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Public/getMedia?media_id=%s" % content_voice,
                         timeout=20)
        t = json.loads(r.text)
        if t["status"] == 0:
            f = open("media/voice/%s.amr" % hashlib.md5(content_voice.encode(encoding='UTF-8')).hexdigest(), "wb")
            f.write(base64.b64decode(t["data"]))
            f.close()
            return True
        else:
            current_app.logger.error(t['errMsg'])
            return False
    except:
        current_app.logger.error(traceback.format_exc())
        return False

def downloadPic(content_pic):
    for i in content_pic:
        try:
            r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Public/getMedia?media_id=%s" % i, timeout=20)
            t = json.loads(r.text)
            if t["status"] == 0:
                f = open("media/picture/%s.jpg" % hashlib.md5(i.encode(encoding='UTF-8')).hexdigest(), "wb")
                f.write(base64.b64decode(t["data"]))
                f.close()
            else:
                current_app.logger.error(t['errMsg'])
                return False
        except:
            current_app.logger.error(traceback.format_exc())
            return False
    return True

# 下载给自己的胶囊
def downloadSelf(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice):
    rowcount = database.insertSelfCapsule(open_id, time_limit, cap_template, cap_location, content_word, content_pic,
                                          content_voice)
    return rowcount


# 下载给Ta的胶囊
def downloadToTa(open_id, time_limit, cap_template, from_qrcode, cap_location, receiver_name, receiver_tel,
                 receiver_email,
                 content_word, content_pic, content_voice, content_name, content_phone, content_birth, xingzuo, hobby,
                 music, movie, food, wechat, QQ, email, place, tucao):
    rowcount = database.insertToTaCapsule(open_id, time_limit, cap_template, from_qrcode, cap_location, receiver_name,
                                          receiver_tel, receiver_email, content_word, content_pic, content_voice,
                                          content_name, content_phone, content_birth, xingzuo, hobby, music, movie,
                                          food, wechat, QQ, email, place, tucao)
    return rowcount


# 下载给陌生人的胶囊
def downloadStranger(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice):
    rowcount = database.insertStraengerCpasule(open_id, time_limit, cap_template, cap_location, content_word,
                                               content_pic, content_voice)
    return rowcount


def to_ta_from_qrcode(open_id, time_limit, cap_template, from_qrcode, cap_location, content_word, content_pic, user_id,
                      content_voice, content_name, content_phone, content_birth, xingzuo, hobby, music, movie, food,
                      wechat, QQ, email, place, tucao):
    userinfo = database.getInfoByUID(user_id)
    if userinfo is None:
        my_abort(404, message="用户不存在")
    receiver_name = userinfo[1]
    receiver_tel = userinfo[2]
    receiver_email = userinfo[3]
    downloadToTa(open_id, time_limit, cap_template, from_qrcode, cap_location, receiver_name, receiver_tel,
                 receiver_email, content_word, content_pic, content_voice, content_name, content_phone,
                 content_birth, xingzuo, hobby, music, movie, food, wechat, QQ, email, place, tucao)
