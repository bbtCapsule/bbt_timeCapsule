// 相关参数
var capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth;
//页面初始的显示
var page = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    writeone: document.getElementById('write-one'),
    writesec: document.getElementById('write-sec'),
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
var nextPage = {
    page1: $('.nextPage')[0],
    page2: $('.nextPage')[1],
    writeone: $('.nextPage')[2],
    writesec: $('.nextPage')[3],
    writeTA: $('.nextPage')[4],
    writeTAsend: $('.nextPage')[5]
}
var prePage = {
    page1: $('.prePage')[0],
    page2: $('.prePage')[1],
    writeone: $('.prePage')[2],
    writesec: $('.prePage')[3],
    writeTA: $('.prePage')[4]
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

function deleteSpace(str) {
    return str.replace(/\s/g, '');
}
//页面开关
prePage.page1.addEventListener('click', function () {
    window.location.href = 'main.html';
})
//1&2 开始
nextPage.page1.addEventListener('click', function () {
    capsule_type = getRadio(document.getElementsByName('sender'));
    if (capsule_type === null) {
        alert('无信息');
    } else {
        page.page1.setAttribute('style', 'display:none;');
        page.page2.setAttribute('style', 'display:block;')
    }
})
prePage.page2.addEventListener('click', function () {
    page.page2.setAttribute('style', 'display:none;');
    page.page1.setAttribute('style', 'display:block;');
})
//1&2 结束
//page2的分支有三个 
//type 若0 选了信纸1、2。 若1选了信纸3。 若2选了同学录
function switchPage(type) {
    if (type == 0) {
        page.page2.setAttribute('style', 'display:none;');
        page.writeone.setAttribute('style', 'display:block;');
    } else if (type == 1) {
        page.page2.setAttribute('style', 'display:none;');
        page.writesec.setAttribute('style', 'display:block;');
    } else if (type == 2) {
        page.page2.setAttribute('style', 'display:none;');
        page.writeTA.setAttribute('style', 'display:block;');
    }
}
//2&writeone&writesec&writeTA
nextPage.page2.addEventListener('click', function () {
    time_limit = getRadio(document.getElementsByName('year'));
    var template = getRadio(document.getElementsByName('template'));
    if (time_limit === null) {
        alert('无信息');
    } else {
        if (template == 'L1' || template == 'L2') {
            switchPage(0);
            cap_template = 0;
        } else if (template == 'L3') {
            switchPage(1);
            cap_template = 0; //0是普通信纸
        } else if (template == 'L4') {
            switchPage(2);
            cap_template = 1; //1是同学录
        }
    }

})
prePage.writeone.addEventListener('click', function () {
    page.writeone.setAttribute('style', 'display:none;');
    page.page2.setAttribute('style', 'display:block;');
})
prePage.writesec.addEventListener('click', function () {
    page.writesec.setAttribute('style', 'display:none;');
    page.page2.setAttribute('style', 'display:block;');
})
prePage.writeTA.addEventListener('click', function () {
    page.writeTA.setAttribute('style', 'display:none;');
    page.page2.setAttribute('style', 'display:block;');
})
//writeone&writemap
nextPage.writeone.addEventListener('click', function () {
    // cap_template, content_word
    content_word = $('.letter_text').val();
    content_word = deleteSpace(content_word);
    if (content_word == '') {
        alert('无信息');
    } else {
        page.writeone.setAttribute('style', 'display:none;');
        page.writemap.setAttribute('style', 'display:block;')
    }
})
// writeone&writemap 结束
//writesec&writemap 开始
nextPage.writesec.addEventListener('click', function () {
    page.writesec.setAttribute('style', 'display:none;');
    page.writemap.setAttribute('style', 'display:block;')
})
//writeTA&writeTAsend 开始
nextPage.writeTA.addEventListener('click', function () {
    // cap_template, content_word
    content_word = $('#content_word_TA').val();
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
nextPage.writeTAsend.addEventListener('click', function () {
    // content_name,content_phone,content_birth;
    content_name = $('#content_name').val();
    content_phone = $('#content_phone').val();
    content_birth = $('#content_birth').val();
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
$('#images').on('click', function () {
    chooseImg(0);
});
$('#voiceStart').on('touchstart', function () {
    voiceRecord(0, 3000);
});
$('#voiceStart').on('touchend', function () {
    voiceRecord(1, 3000);
});
$('#voicePlay').on('click', function () {
    voicePlay();
});
//信息录入
$("#submitCapsule").on('click', function () {
    uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
});
