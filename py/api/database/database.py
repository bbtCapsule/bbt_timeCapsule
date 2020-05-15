import pymysql
from config import db
import json
import ahocorasick

class database:
    def getCursor(self):
        con = pymysql.connect(
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
    def getInfo(self,open_id):
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
    def getInfoByUID(self, uid):
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
    def insertInfo(self, open_id, nickname, phone, email):
        (con, cur) = database.getCursor()
        cur.execute("INSERT INTO users(open_id, nickname, phone, email) VALUES (?, ?, ?, ?)",[open_id, nickname, phone, email])
        rowcount=cur.row_count()
        cur.close()
        con.commit()
        con.close()
        return rowcount

#塞入给Ta的胶囊
    def insertToTaCapsule(self, receiver_name, receiver_tel, receiver_email, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, from_qrcode, content_name, content_phone, content_birth):
        (con, cur) = database.getCursor()
        cur.execute("INSERT INTO toTaCapsules(code, receiver_name, receiver_tel, receiver_email, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, from_qrcode, content_name, content_phone, content_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[None, receiver_name, receiver_tel, receiver_email, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, from_qrcode, content_name, content_phone, content_birth])
        rowcount=cur.row_count()
        cur.close()
        con.commit()
        con.close()
        return rowcount

#塞入给自己的胶囊
    def insertSelfCapsule(self, open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice):
        (con, cur) = database.getCursor()
        info = database.getInfo(open_id)
        cur.execute("INSERT INTO selfCapsules(sender_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice) VALUES (?, ?, ?, ?, ?, ?, ?)",[info[0], time_limit, cap_template, cap_location, content_word, content_pic, content_voice])
        rowcount=cur.row_count()
        cur.close()
        con.commit()
        con.close()
        return rowcount

#塞入给陌生人的胶囊
    def insertStraengerCpasule(self, open_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice):
        (con, cur) = database.getCursor()
        info = database.getInfo(open_id)
        cur.execute("INSERT INTO strangerCapsules(sender_id, time_limit, cap_template, cap_location, content_word, content_pic, content_voice) VALUES (?, ?, ?, ?, ?, ?, ?)",[info[0], time_limit, cap_template, cap_location, content_word, content_pic, content_voice])
        rowcount=cur.row_count()
        cur.close()
        con.commit()
        con.close()
        return rowcount

#对胶囊文本敏感词过滤
    def capsuleTextCheck(self, message):
        check=ahocorasick.Automaton()
        orignWds=[]
        aimWds=[]
        with open('unSeenWord.txt',encoding='utf-8') as f:
            for line in f.readlines():
                line=line.strip()
                orignWds.append(str(line))
            for index,word in enumerate(orignWds):
                check.add_word(word,(index,word))
        check.make_automaton()
        for i in check.iter(message):
            wd=i[1][1]
            aimWds.append(wd)
        for x in aimWds:
            text=message.replace(x,'*'*len(x))
        return text

    def checkPhone(self, phone):
        db.execute('select * from users where `phone`=%s',(phone,))
        result = db.fetchone()
        dictReturn=dict()
        uniqueness=(result==None)
        phoneLength=((len(phone)==11)and phone[0]=='1')
        return {
            'phoneLength':phoneLength,
            'uniqueness':uniqueness}
