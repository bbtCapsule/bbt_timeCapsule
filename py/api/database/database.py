import pymysql
from config import db


def getCursor():
    con = pymysql.connect(
        host=db["host"],
        user=db["user"],
        passwd=db["pwd"],
        database=db["database"]
    )
    cur = con.cursor()
    return con, cur


# 用于检测是否收集了信息
def getInfo(open_id):
    (con, cur) = getCursor()
    cur.execute("SELECT uid, nickname, phone, email FROM users WHERE open_id=%s", [open_id])
    r = cur.fetchone()
    cur.close()
    con.close()
    return r


# 通过用户的id获取相关信息，胶囊的发送者与接收者
def getInfoByUID(uid):
    (con, cur) = getCursor()
    cur.execute("SELECT uid, nickname, phone, email FROM users WHERE uid=%s", [uid])
    r = cur.fetchone()
    cur.close()
    con.close()
    return r


# 收集用户信息
def insertInfo(open_id, nickname, phone, email):
    (con, cur) = getCursor()
    cur.execute("INSERT INTO users(open_id, nickname, phone, email) VALUES (%s, %s, %s, %s)",
                [open_id, nickname, phone, email])
    con.commit()
    cur.close()
    con.close()
    return True


# 塞入给Ta的胶囊
def insertToTaCapsule(open_id, time_limit, cap_template, from_qrcode, cap_location, receiver_name, receiver_tel,
                      receiver_email,
                      content_word, content_pic, content_voice, content_name, content_phone, content_birth, xingzuo,
                      hobby, music, movie, food, wechat, QQ, email):
    (con, cur) = getCursor()
    cur.execute(
        "INSERT INTO toTaCapsules(code,sender_id, time_limit, cap_template, from_qrcode, cap_location, receiver_name, receiver_tel, receiver_email, content_word, content_pic, content_voice, content_name, content_phone, content_birth, xingzuo, hobby, music, movie, food, wechat, QQ, email) VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        [None, open_id, time_limit, cap_template, from_qrcode, cap_location, receiver_name, receiver_tel,
         receiver_email,
         content_word, str(content_pic), content_voice, content_name, content_phone, content_birth, xingzuo, hobby,
         music, movie, food, wechat, QQ, email])
    con.commit()
    cur.close()
    con.close()
    return True


# 塞入给自己的胶囊
def insertSelfCapsule(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice):
    (con, cur) = getCursor()
    info = getInfo(open_id)
    cur.execute(
        "INSERT INTO selfCapsules(sender_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice) VALUES (%s,%s,%s,%s,%s,%s,%s)",
        [info[0], time_limit, cap_template, cap_location, content_word, str(content_pic), content_voice])
    con.commit()
    cur.close()
    con.close()
    return True


# 塞入给陌生人的胶囊
def insertStraengerCpasule(open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice):
    (con, cur) = getCursor()
    info = getInfo(open_id)
    cur.execute(
        "INSERT INTO strangerCapsules(sender_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice) VALUES (%s,%s,%s,%s,%s,%s,%s)",
        [info[0], time_limit, cap_template, cap_location, content_word, str(content_pic), content_voice])
    con.commit()
    cur.close()
    con.close()
    return True


def checkPhone(phone):
    (con, cur) = getCursor()
    cur.execute('select * from users where `phone`=%s', (phone,))
    result = cur.fetchone()
    cur.close()
    con.close()
    uniqueness = bool(result is None)
    phoneLength = bool((len(str(phone)) == 11) and str(phone)[0] == '1')
    return {
        'phoneLength': phoneLength,
        'uniqueness': uniqueness
    }
