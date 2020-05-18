# -*- coding: utf-8 -*-
from .check_wechat_login import check_wechat_before_request
from .is_ongoing import is_ongoing

def before_request():
    is_ongoing()
    check_wechat_before_request()