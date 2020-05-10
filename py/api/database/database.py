import pymysql
from config.config import db
import json

class database:
    def getCursor():
        con = pymysql.connector.connect(
            host=db["host"],
            user=db["user"],
            passwd=db["pwd"],
            database=db["database"]
        )
        cur = con.cursor(prepared=True)
        cur.execute("SET NAMES 'utf8mb4'")
        cur.execute("SET CHARACTER SET 'utf8mb4'")
        return con, cur

# 用于检测是否收集了信息
    def getInfo(open_id):
        (con, cur) = database.getCursor()
        cur.execute("SELECT uid, nickname, phone, email FROM users WHERE open_id=?", [open_id])
        r = cur.fetchone()
        cur.close()
        con.close()
        if r is None:
            return None
        else:
            return [r[0], str(r[1], 'utf-8'), str(r[2], 'utf-8'), str(r[3], 'utf-8')]

#通过用户的id获取相关信息，胶囊的发送者与接收者
    def getInfoByUID(uid):
        (con, cur) = database.getCursor()
        cur.execute("SELECT uid, nickname, phone, email FROM users WHERE uid=?", [uid])
        r = cur.fetchone()
        cur.close()
        con.close()
        if r is None:
            return None
        else:
            return [r[0], str(r[1], 'utf-8'), str(r[2], 'utf-8'), str(r[3], 'utf-8')]

#收集用户信息
    def insertInfo(open_id, nickname, phone, email):
        (con, cur) = database.getCursor()
        cur.execute("INSERT INTO users(open_id, nickname, phone, email) VALUES (?, ?, ?)",[open_id, nickname, phone, email])
        cur.close()
        con.commit()
        con.close()

#塞入胶囊
    def insertCapsule(open_id, receiver_name, receiver_tel, receiver_email, capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent):
        info = database.getInfo(open_id)
        (con, cur) = database.getCursor()
        if info is None:
            cur.execute("INSERT INTO capsules(sender_id, receiver_name, receiver_tel, receiver_email, capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[None, receiver_name, receiver_tel, receiver_email, capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent])
        else:
            cur.execute("INSERT INTO capsules(sender_id, receiver_name, receiver_tel, receiver_email, capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[info[0], receiver_name, receiver_tel, receiver_email, capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, registered, sent])
        cur.close()
        con.commit()
        con.close()



