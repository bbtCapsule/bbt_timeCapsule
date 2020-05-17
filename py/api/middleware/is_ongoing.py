# -*- coding: utf-8 -*-
from ..common.utils import my_abort
import datetime
from config import Time


def is_ongoing():
    begin = datetime.datetime.strptime(Time['begin'], '%Y-%m-%d %H:%M:%S')
    end = datetime.datetime.strptime(Time['end'], '%Y-%m-%d %H:%M:%S')
    now = datetime.datetime.strptime(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')
    if now < begin:
        my_abort(410, message="活动还未开始")
    elif now > end:
        my_abort(410, message="活动已结束")
