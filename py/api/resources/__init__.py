from flask import Blueprint
from ..middleware.check_wechat_login import check_wechat_login

bp = Blueprint('bp', __name__)
bp.add_url_rule('/check_wechat_login', view_func=check_wechat_login, methods=['GET'])
from .capsule import *
from .check_user_info import *
from .insetInfo import *
from .getQRcode import *
from .letter import *