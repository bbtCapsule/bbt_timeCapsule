function sendMes() {
    var nickname = document.getElementById('nickname').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var data = {
        'nickname': nickname,
        // 'head_pic': head_pic,
        'phone': phone,
        'email': email
    }
    console.log(JSON.stringify(data));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', serverUrl + loginUrl, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
            var RESPONSE = JSON.parse(response);
            var errcode = RESPONSE['errcode'];
            var errmsg = RESPONSE['errmsg'];
            if (errcode == 0) {
                window.location.href='./index.html';
            } else {
                // document.getElementById('uWarn').innerHTML = errmsg;
                // document.getElementById('uWarn').style.color = 'red';
            }
        } else {
            // document.getElementById('uWarn').innerHTML = errmsg;
            // document.getElementById('uWarn').style.color = 'red';
        }
    }
}
document.getElementById('submit').addEventListener('click', sendMes);