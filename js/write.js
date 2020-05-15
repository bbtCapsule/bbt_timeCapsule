//页面初始的显示
var page = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    writeone: document.getElementById('write-one'),
    writeTA: document.getElementById('write-TA'),
    writeTAsend: document.getElementById('write-TA-send'),
    writemap: document.getElementById('write-map'),
    finish: document.getElementById('finish')
}
for (var key in page) {
    page[key].setAttribute('style', 'display:none;');
}
window.onload = function () {
    page.page1.setAttribute('style', 'display:block;');
}

//函数
function getRadio(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked === true) {
            return obj[i].value;
        }
    }
    return null;
}

function checkErr(str, reg) {
    var x = str.replace(/\s/g, '')
    if (reg.test(x)) {
        return true;
    } else {
        return false;
    }
}

function deleteSpace(key) {
    return key.replace(/\s/g, '');
}
//页面开关
//1&2 开始
var nextPage = document.getElementsByClassName('nextPage');
var prePage = document.getElementsByClassName('prePage');
var capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth;
nextPage[0].addEventListener('click', function () {
    capsule_type = getRadio(document.getElementsByName('sender'));
    if (capsule_type === null) {
        alert('无信息');
    } else {
        page.page1.setAttribute('style', 'display:none;');
        page.page2.setAttribute('style', 'display:block;')
    }
})
prePage[0].addEventListener('click', function () {
    page.page2.setAttribute('style', 'display:none;');
    page.page1.setAttribute('style', 'display:block;');
})
//1&2 结束
//2&writeone&writeTA 开始
nextPage[1].addEventListener('click', function () {
    time_limit = getRadio(document.getElementsByName('year'));
    if (time_limit === null) {
        alert('无信息');
    } else if (capsule_type == 0 || capsule_type == 1) {
        page.page2.setAttribute('style', 'display:none;');
        page.writeone.setAttribute('style', 'display:block;');
    } else if (capsule_type == 2) {
        page.page2.setAttribute('style', 'display:none;');
        page.writeTA.setAttribute('style', 'display:block;');
    }
})
prePage[1].addEventListener('click', function () {
    page.writeone.setAttribute('style', 'display:none;');
    page.page2.setAttribute('style', 'display:block;');
})
prePage[2].addEventListener('click', function () {
    page.writeTA.setAttribute('style', 'display:none;');
    page.page2.setAttribute('style', 'display:block;');
})
//2&writeone&writeTA 结束
// writeone&writemap 开始
nextPage[2].addEventListener('click', function () {
    // cap_template, content_word
    content_word = document.getElementById('content_word_one').value;
    content_word = deleteSpace(content_word);
    if (content_word == '') {
        alert('无信息');
    } else {
        page.writeone.setAttribute('style', 'display:none;');
        page.writemap.setAttribute('style', 'display:block;')
    }
})
// writeone&writemap 结束
//writeTA&writeTAsend 开始
nextPage[3].addEventListener('click', function () {
    // cap_template, content_word
    content_word = document.getElementById('content_word_TA').value;
    content_word = deleteSpace(content_word);
    if (content_word == '') {
        alert('无信息');
    } else {
        page.writeTA.setAttribute('style', 'display:none;');
        page.writeTAsend.setAttribute('style', 'display:block;')
    }
})
//writeTA&writeTAsend 结束
// writeTAsend&writemap 开始
nextPage[4].addEventListener('click', function () {
    // content_name,content_phone,content_birth;
    content_name = document.getElementById('content_name');
    content_phone = document.getElementById('content_phone');
    content_birth = document.getElementById('content_birth');
    var sum = true;
    var check = {
        content_name: checkErr(content_name, /[\w\W]{1,16}/),
        content_phone: checkErr(content_phone, /^1\d{10}$/),
        content_birth: checkErr(content_birth, /[\w\W]{1,16}/)
    }
    for (key in check) {
        sum = check[key] && sum;
    }
    if (sum === false) {
        alert('无信息或信息错误');
    } else {
        page.writeTAsend.setAttribute('style', 'display:none;');
        page.writemap.setAttribute('style', 'display:block;')
    }
})
// writeTAsend&writemap 结束
