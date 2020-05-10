from flask import session, request
from api.database.database import *
from api.resources.encode import encodeUID
from PIL import Image
import qrcode
import base64
import json
import requests

img_bg = Image.open("static/icorn.png") //图片未定

@app.route('/getQRCode', methods=['GET'])
def get():
		if "open_id" not in session:
			sess_id = request.cookies.get("PHPSESSID")
			if (sess_id != None):
				r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo", timeout = 5, cookies = dict(PHPSESSID = sess_id))
				try:
					t = json.loads(r.text)
					if "openid" in t:
						session["open_id"] = t["openid"]
				except:
					pass
		if "open_id" not in session:
			return {
				'errcode': 401,
				'errmsg': 'Please bind Wechat account first.'
				}, 401
		info = database.getInfo(session["open_id"])
		if (info == None):
			return {
				'errcode': 403,
				'errmsg': 'Please update information first.'
				}, 403
		url = "https://hemc.100steps.net/2019/time-capsule/QR.html?uid=%s" % encodeUID(info[0])
		qr = qrcode.QRCode(border = 2)
		qr.add_data(url)
		qr.make(fit = True)
		img_qr = qr.make_image(back_color = "xxxx").resize((x, x), Image.ANTIALIAS) //颜色等未定
		pos = (img_bg.size[0] // 2 - img_qr.size[0] // 2, img_bg.size[1] - img_qr.size[1] * 2 - 110)
		img_bg.paste(img_qr, pos)
		img_bg.save("QRCode.jpg")
		openQR = open("QRCode.jpg", "rb")
		image = base64.b64encode(openQR.read())
		openQR.close()
		return {
			"errcode":0,
			"image": "data:image/jpeg;base64," + str(image, 'utf-8')
		}