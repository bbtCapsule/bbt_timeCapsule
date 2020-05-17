// 相关参数
var capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth;
//页面初始的显示
var page = {
    page1: $('#page1'),
    page2: $('#page2'),
    writeone: $('#write-one'),
    writesec: $('#write-sec'),
    writeTA: $('#write-TA'),
    writeTAsend: $('#write-TA-send'),
    writemap: $('#write-map'),
    finish: $('#finish')
}
for (var key in page) {
    page[key].attr('style', 'display:none;');
}
window.onload = function () {
    page.page1.attr('style', 'display:block;');
}
var nextPage = {
    page1: $('#page1 .nextPage'),
    page2: $('#page2 .nextPage'),
    writeone: $('#write-one .nextPage'),
    writesec: $('#write-sec .nextPage'),
    writeTA: $('#write-TA .nextPage'),
    writeTAsend: $('#write-TA-send .nextPage')
}
var prePage = {
    page1: $('#page1 .prePage'),
    page2: $('#page2 .prePage'),
    writeone: $('#write-one .prePage'),
    writesec: $('#write-sec .prePage'),
    writeTA: $('#write-TA .prePage')
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
prePage.page1.on('click', function () {
    window.location.href = 'main.html';
})
//1&2 开始
nextPage.page1.on('click', function () {
    capsule_type = getRadio(document.getElementsByName('sender'));
    if (capsule_type === null) {
        alert('你还没有选择！');
    } else {
        page.page1.attr('style', 'display:none;');
        page.page2.attr('style', 'display:block;')
    }
})
prePage.page2.on('click', function () {
    page.page2.attr('style', 'display:none;');
    page.page1.attr('style', 'display:block;');
})
//1&2 结束
//page2的分支有三个 
//type 若0 选了信纸1、2。 若1选了信纸3。 若2选了同学录
function switchPage(type) {
    if (type == 0) {
        page.page2.attr('style', 'display:none;');
        page.writeone.attr('style', 'display:block;');
    } else if (type == 1) {
        page.page2.attr('style', 'display:none;');
        page.writesec.attr('style', 'display:block;');
    } else if (type == 2) {
        page.page2.attr('style', 'display:none;');
        page.writeTA.attr('style', 'display:block;');
    }
}
//2&writeone&writesec&writeTA
nextPage.page2.on('click', function () {
    time_limit = getRadio(document.getElementsByName('year'));
    var template = getRadio(document.getElementsByName('template'));
    if (time_limit === null) {
        alert('你还没有选择！');
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
prePage.writeone.on('click', function () {
    page.writeone.attr('style', 'display:none;');
    page.page2.attr('style', 'display:block;');
})
prePage.writesec.on('click', function () {
    page.writesec.attr('style', 'display:none;');
    page.page2.attr('style', 'display:block;');
})
prePage.writeTA.on('click', function () {
    page.writeTA.attr('style', 'display:none;');
    page.page2.attr('style', 'display:block;');
})
//writeone&writemap 1\2信纸
nextPage.writeone.on('click', function () {
    // cap_template, content_word
    content_word = $('.letter_text').val();
    //content_word = deleteSpace(content_word);
    if (content_word == '') {
        alert('你没有写任何东西！');
    } else {
        page.writeone.attr('style', 'display:none;');
        page.writemap.attr('style', 'display:block;')
    }
})
// writeone&writemap 结束
//writesec&writemap 开始
nextPage.writesec.on('click', function () {
    // cap_template, content_word
    content_word = $('.letter_text').val();
    //content_word = deleteSpace(content_word);
    if (content_word == '') {
        alert('你没有写任何东西！');
    } else {
        page.writesec.attr('style', 'display:none;');
        page.writemap.attr('style', 'display:block;')
    }
})
//writeTA&writeTAsend 开始
nextPage.writeTA.on('click', function () {
    // cap_template, content_word
    content_word = $('#content_word_TA').val();
    //content_word = deleteSpace(content_word);
    if (content_word == '') {
        alert('你没有写任何东西！');
    } else {
        page.writeTA.attr('style', 'display:none;');
        page.writeTAsend.attr('style', 'display:block;')
    }
})
//writeTA&writeTAsend 结束
// writeTAsend&writemap 开始
nextPage.writeTAsend.on('click', function () {
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
        page.writeTAsend.attr('style', 'display:none;');
        page.writemap.attr('style', 'display:block;')
    }
})
// writeTAsend&writemap 结束
//反馈界面
$('#finish_rewrite').on('click', function () {
    page.finish.attr('style', 'display:none;');
    page.page1.attr('style', 'display:block;')
});
$('#finish_back').on('click', function () {
    window.location.href = 'main.html';
});

$('#images').on('click', function () {
    chooseImg(0);
});
$('#voiceStart').on('touchstart', function (event) {
    event.preventDefault();
    voiceRecord(0, 3000);
});
$('#voiceStart').on('touchend', function () {
    event.preventDefault();
    voiceRecord(1, 3000);
});
$('#voicePlay').on('click', function () {
    voicePlay();
});
//信息录入
$("#submitCapsule").on('click', function () {
    uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
});
// 测试用
// window.onload = function () {
//     page.page1.attr('style', 'display:none;');
//     page.finish.attr('style', 'display:block;');
// }