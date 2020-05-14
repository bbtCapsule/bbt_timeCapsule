from flask import request, session
from api.database.database import database
from app import app

@app.route('/user_info', methods=['POST'])
def user_info():
    result=database.getInfo(session["open_id"])
    if(result!=None):
        return {
            'errcode':1,
            'errmsg':'该用户已存在'
        }
    else:   
        data = request.get_json()
        nickname=data['nickname']
        phone=data['phone']
        email=data['email']
        phoneResult = database.checkPhone(phone)
        if (phoneResult['phoneLength']==True):
            if(phoneResult['uniqueness']==False):
                return {
                'errcode': 1,
                'errmsg': '该手机已被填写'
                }
            else:
                rowcount = database.insertInfo(session['open_id'],nickname,phone,email)
                if rowcount > 0:
                    return {
                        'errcode': 0,
                        'errmsg': '填写成功'
                    }
    
                return {
                    'errcode': 1,
                    'errmsg': '请检查网络或其他设置'}

        elif(phoneResult['phoneLength']==False):
            return{
                'errcode': 1,
                'errmsg': '手机号格式不正确'
                }
        
