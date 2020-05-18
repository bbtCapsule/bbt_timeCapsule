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
    if(key==0){
        key++;
    }
    page[key].hide();
}
$('#write-map').hide();
window.onload = function () {
    page.page1.fadeIn();
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
        page.page1.fadeOut(200);
        page.page2.fadeIn(100);
    }
})
prePage.page2.on('click', function () {
    page.page2.fadeOut(200);
    page.page1.fadeIn(100);
})
//1&2 结束
//page2的分支有三个 
//type 若0 选了信纸1、2。 若1选了信纸3。 若2选了同学录
$(".switchbox").on('click', function () {
    switch (getRadio(document.getElementsByName('template'))) {
        case 'L1':
            $("p#num").text("1/4");
            break;
        case 'L2':
            $("p#num").text("2/4");
            break;
        case 'L3':
            $("p#num").text("3/4");
            break;
        case 'L4':
            $("p#num").text("4/4");
            break;
        default:
            $("p#num").text("0/4");
            break;
    }
})

function switchPage(type) {
    if (type == 0) {
        page.page2.fadeOut(200);
        page.writeone.fadeIn(100);
    } else if (type == 1) {
        page.page2.fadeOut(200);
        page.writesec.fadeIn(100);
    } else if (type == 2) {
        page.page2.fadeOut(200);
        page.writeTA.fadeIn(100);
    }
}
//2&writeone&writesec&writeTA
nextPage.page2.on('click', function () {
    time_limit = getRadio(document.getElementsByName('year'));
    var template = getRadio(document.getElementsByName('template'));
    if (time_limit === null) {
        alert('你还没有选择！');
    } else {
        if (template == 'L1' ) {
            switchPage(0);
            cap_template = 0;
        }else if(template == 'L2'){
            switchPage(0);
            page.writeone.css("backgroundImage","url('./images/letter/2.png')");
            cap_template = 0;
        }
        else if (template == 'L3') {
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
// 根据type判断是否跳转填写信息
function switchCapsule(str){
    console.log("胶囊类型是"+str+"  1写给自己 2 写给陌生人 3写给专属")
    switch (Number(str)) {
        case 2:
            page.writeTAsend.fadeIn(90);
            break;
        default:
            page.writemap.fadeIn(90);
            break;
    }
}

//writeone&writemap 1\2信纸
nextPage.writeone.on('click', function () {
    content_word = $('.letter_text').val();
    if (content_word == '') {
        alert('你没有写任何东西！');
    } else {
        //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
        
        page.writeone.fadeOut(30);
        switchCapsule(capsule_type);
    }
})
// writeone&writemap 结束
//同学录？？
nextPage.writesec.on('click', function () {
    // cap_template, content_word
    content_word = $('.letter_text').val();
    if (content_word == '') {
        alert('你没有写任何东西！');
    } else {
        //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
        page.writesec.fadeOut(30);
        switchCapsule(capsule_type);

    }
})
//writeTA&writeTAsend 开始
nextPage.writeTA.on('click', function () {
    // cap_template, content_word
    content_word = $('#content_word_TA').val();
    if (content_word == '') {
        alert('你没有写任何东西！');
    } else {
        //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
        page.writeTA.fadeOut(30);
        switchCapsule(capsule_type);
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
        content_name: checkInput(content_name, 'str'),
        content_phone: checkInput(content_phone, 'num'),
    }
    for (key in check) {
        sum = check[key] && sum;
    }
    if (sum === false) {
        alert('无信息或信息错误');
    } else {
        console.log("提交");
        //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
        page.writeTAsend.fadeOut(100);
        page.writemap.fadeIn(80);
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
    chooseImg();
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
