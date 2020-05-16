from flask import session, request
from api.database.database import database
from api.resources.encode import encodeUID
from PIL import Image
from app import app
import qrcode
import base64
import json
import requests


img_bg = Image.open("api/image/background.jpg") 
trans = 0.72  #透明度

# 修改所有白色的地方的透明度
def transparent_back(img):
    img = img.convert('RGBA')
    L, H = img.size
    color_0 = (255, 255, 255, 255)
    for h in range(H):
        for l in range(L):
            dot = (l, h)
            color_1 = img.getpixel(dot)
            if color_1 == color_0:
                color_1 = color_1[:-1] + (int(trans * 255),)
                img.putpixel(dot, color_1)
    return img

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
		try:
			url = "https://hemc.100steps.net/2019/time-capsule/QR.html?uid=%s" % encodeUID(info[0])
			qr = qrcode.QRCode(border = 1)
			qr.add_data(url)
			qr.make(fit = True)
			img = qr.make_image(fill_color="#3f454b",back_color="#ffffff").resize((800, 800), Image.ANTIALIAS)  
			img_qr = transparent_back(img).resize((288, 288), Image.ANTIALIAS)  
			pos = (img_bg.size[0] // 2 - img_qr.size[0] // 2, img_bg.size[1] - img_qr.size[1] * 2 - 110)
			img_bg.paste(img_qr, pos,img_qr)  
			img_bg.save("QRCode.jpg")
			openQR = open("QRCode.jpg", "rb")
			image = base64.b64encode(openQR.read())
			openQR.close()
			return {
				"errcode":0,
				"image": "data:image/jpeg;base64," + str(image, 'utf-8')
				}
		except: 
			return{
				"errcode":1,
				"errmsg":"QRCode generting system has some problrms"
				}
