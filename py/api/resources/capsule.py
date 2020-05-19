from flask import request, session
from api.resources.download import to_ta_from_qrcode, downloadVoice, downloadPic, downloadSelf, downloadToTa, \
    downloadStranger
from . import bp
from .encode import decodeUID


@bp.route('/capsule', methods=['POST'])
def capsule():
    data = request.get_json(force=True)
    open_id = session["open_id"]
    time_limit = "one-year" if data.get('time_limit') else "half-year"  # 取信时间
    cap_template = data.get('cap_template')  # 胶囊模板 普通信纸|同学录
    cap_location = data.get('cap_location') # 胶囊地点
    content_word = data.get('content_word')  # 内容
    content_pic = data.get('content_pic')  # 图片
    content_voice = data.get('content_voice')  # 录音

    # 普通信纸
    receiver_name = data.get('receiver_name')  # TA的名字
    receiver_tel = data.get('receiver_tel')  # TA的电话
    receiver_email = data.get('receiver_email')  # TA的邮箱

    # 同学录
    content_name = data.get('content_name')  # TA的名字
    content_phone = data.get('content_phone')  # TA的电话
    content_birth = data.get('content_birth')  # TA的生日
    place = data.get('place_to_go')  # 想去的地方
    xingzuo = data.get('xingzuo')  # 星座
    hobby = data.get('hobby')  # 爱好
    music = data.get('music')  # 音乐
    movie = data.get('movie')  # 电影
    food = data.get('food')  # 美食
    wechat = data.get('wechat')  # 微信
    QQ = data.get('QQ')  # qq
    email = data.get('email')  # 邮箱
    tucao = data.get('tucao')  # 吐槽
    # 二维码
    from_qrcode = bool(data.get('from_qrcode'))  # 是否是二维码收信
    user_id = data.get('user_id')

    id_decode = decodeUID(user_id)

    if content_voice:  # 有音频则下载，无则视为成功。
        result_voice = downloadVoice(content_voice)
    else:
        result_voice = True

    if content_pic:  # 同理
        result_pic = downloadPic(content_pic)
    else:
        result_pic = True
    if from_qrcode:
        to_ta_from_qrcode(open_id, time_limit, cap_template, from_qrcode, cap_location, content_word, content_pic,
                          id_decode, content_voice, content_name, content_phone,
                          content_birth, xingzuo, hobby, music, movie, food, wechat, QQ, email, place, tucao)
    else:
        if data['capsule_type'] == 0:  # 私密
            downloadSelf(open_id, time_limit, cap_template, cap_location, content_word, content_pic,
                         content_voice)
        elif data['capsule_type'] == 1:  # 给Ta
            downloadToTa(open_id, time_limit, cap_template, from_qrcode, cap_location, receiver_name, receiver_tel,
                         receiver_email, content_word, content_pic, content_voice, content_name, content_phone,
                         content_birth, xingzuo, hobby, music, movie, food, wechat, QQ, email, place, tucao)
        elif data['capsule_type'] == 2:  # 陌生人
            downloadStranger(open_id, time_limit, cap_template, cap_location, content_word, content_pic,
                             content_voice)

    if result_pic and result_voice:
        return {'errcode': 0, 'errmsg': "成功获取胶囊", 'mesg_voice': "成功", 'mesg_pic': "成功"}
    else:
        return {'errcode': 1, 'errmsg': '录音或图片保存失败', 'mesg_voice': result_voice, 'mesg_pic': result_pic}
