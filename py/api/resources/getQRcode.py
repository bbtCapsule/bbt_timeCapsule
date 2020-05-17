from flask import session, current_app
from api.database import database
from api.resources.encode import encodeUID
from . import bp
from PIL import Image
import qrcode
import base64
import traceback
from io import BytesIO
from config import app

img_bg = Image.open("./api/image/background.jpg")
trans = 0.72  # 透明度
alpha = int(trans * 255)


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
                color_1 = color_1[:-1] + (alpha,)
                img.putpixel(dot, color_1)
    return img


@bp.route('/getQRCode', methods=['GET'])
def get():
    info = database.getInfo(session["open_id"])
    if not info:
        return {"message": "请先填写个人信息"}, 404
    try:
        url = app['capsule_path'] + encodeUID(info[0])
        qr = qrcode.QRCode(border=1)
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="#3f454b", back_color="#ffffff").resize((288, 288), Image.ANTIALIAS)
        img_qr = transparent_back(img)
        pos = (img_bg.size[0] // 2 - img_qr.size[0] // 2, img_bg.size[1] - img_qr.size[1] * 2 - 110)
        img_bg.paste(img_qr, pos, img_qr)
        buffered = BytesIO()
        img_bg.save(buffered, format="JPEG")
        image = base64.b64encode(buffered.getvalue())
        buffered.close()
        return {
            "errcode": 0,
            "image": "data:image/jpeg;base64," + str(image, 'utf-8')
        }
    except:
        current_app.logger.error(traceback.format_exc())
        return {"message": "生成二维码失败"}, 500
