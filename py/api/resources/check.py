import datetime
from config.config import Time

def checkTime():
    now = datetime.datetime.now()
    now = datetime.datetime.strftime(now,'%Y-%m-%d %H:%M:%S')
    begin_Time = Time["begin"]
    end_Time = Time["end"]
    if  begin_Time <= now <=end_Time:
        return True
    else:
        return False

def checkphone(phone):
    phone = str(phone)
    if len(phone) is 11 and phone[0] is 1:
        return True
    else:
        return False