var file = document.getElementById('head_pic');
var base64img = null;
var head_pic_div=document.getElementById('head_pic_div');
file.onchange = function () {
    var head_pic = file.files[0];
    var reader = new FileReader();
    if (head_pic) {
        reader.readAsDataURL(head_pic);
        reader.onloadend = function () {
            base64img = reader.result;
            head_pic_div.src=base64img;
            head_pic_div.style.display='block';
        }
    }
}

function sendMes() {
    var nickname = document.getElementById('nickname').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var data = {
        'nickname': nickname,
        'head_pic': base64img,
        'phone': phone,
        'email': email
    }
    var check = {
        nickname: checkErr(nickname, '', /[\w\W]{1,16}/, null),
        phone: checkErr(phone, '', /^1\d{10}$/, null),
        email: checkErr(email, '', /^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/, null)
    }

    console.log(JSON.stringify(data));
    console.log(check);
    var sum = true;
    for (key in check) {
        sum = check[key] && sum;
    }
    if (sum) {
        console.log('success con');
        var Response;
        postMes(serverUrl + loginUrl, data, Response);
        var errcode = RESPONSE['errcode'];
        var errmsg = RESPONSE['errmsg'];
        if (errcode == 0) {
            window.location.href = './index.html';
        } else if (errcode == 1) {

        }
    } else {
        console.log('fail con ');
    }



}
document.getElementById('submit').addEventListener('click', sendMes);