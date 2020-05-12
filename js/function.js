function getRadio(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked === true) {
            return obj[i].value;
        }
    }
    return null;
}

function aw(){
    return true;
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
