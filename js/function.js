function getRadio(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked === true) {
            return obj[i].value;
        }
    }
    return null;
}

function checkErr(key, value, reg,errmsg) {
    if (key === value||!(reg.test(key))) {
        // errmsg.classList.add('show');
        return false;
    } else {
        // errmsg.classList.remove('show');
        return true;
    }
}




// 获取access_token

//获取jsticket

// 生成随机数串

//生成签名
