from flask import request, session
from api.database import database
from . import bp


@bp.route('/user_info', methods=['POST'])
def user_info():
    result = database.getInfo(session["open_id"])

    if result:
        return {
            'errcode': 1,
            'errmsg': '用户已存在'
        }
    else:
        data = request.get_json(force=True)
        nickname = data['nickname']
        phone = data['phone']
        email = data['email']
        phoneResult = database.checkPhone(phone)
        if phoneResult['phoneLength']:
            if not phoneResult['uniqueness']:
                return {
                    'errcode': 1,
                    'errmsg': '该手机已被填写'
                }
            else:
                rowcount = database.insertInfo(session['open_id'], nickname, phone, email)
                if rowcount > 0:
                    return {
                        'errcode': 0,
                        'errmsg': '填写成功'
                    }
                return {
                    'errcode': 1,
                    'errmsg': '请检查网络或其他设置'
                }

        else:
            return {
                'errcode': 1,
                'errmsg': '手机号格式不正确'
            }
