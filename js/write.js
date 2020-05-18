// 相关参数
var capsule_type, time_limit, cap_template, //胶囊类型 取信期 信纸类型
content_word, content_pic, content_voice,
 content_name, content_phone, content_birth;
 var TA_info=new Object();
 var from_qrcode = false;
 var user_id = "none";
 var txl_content = new Object();
 var trySend = false;
//页面初始的显示
if(window.location.href.split('?uid=').length==2){
    user_id = window.location.href.split('?uid=')[1];
    from_qrcode =true;
}
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
//获取radio
function getRadio(obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked === true) {
            return obj[i].value;
        }
    }
    return null;
}
page.writemap.on('click',function(){
    
    $("#mai_att").fadeOut(300);
});
//页面开关
prePage.page1.on('click', function () {
    window.location.href = 'main.html';
    forbidMove();
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
        OpenMove();
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
    forbidMove();
    $('.letter_text').val("");
    page.writeone.fadeOut();
    page.page2.fadeIn();
})
prePage.writesec.on('click', function () {
    forbidMove();
    $('.letter_text').val("");
    page.writesec.fadeOut();
    page.page2.fadeIn();
})
prePage.writeTA.on('click', function () {
    forbidMove();
    page.writeTA.fadeOut();
    page.page2.fadeIn();
})
function forbidMove(){
    $('html,body').animate({ scrollTop: $("body").offset().top - 1 }, 200)
    $('body').css('overflow','hidden');
}
function OpenMove(){
    $('body').css('overflow','scroll');
}
// 根据type判断是否跳转填写信息
function switchCapsule(str){
    console.log("胶囊类型是"+str+" 0写给自己 1写给专属 2写给陌生人")
    switch (Number(str)) {
        case 1:
            forbidMove();
            page.writeTAsend.fadeIn(90);
            break;
        default:
            OpenMove();
            page.writemap.fadeIn(90);
            break;
    }
}

//writeone&writemap 1\2信纸
nextPage.writeone.on('click', function () {
    content_word = $('.letter_text').val();
    if (content_word == '') {
        trySend =false;
        alert('你没有写任何东西！');
    } else {
        //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
        if(checkInput(content_word,'str')){
            trySend =true;
            sendLetter(0);
        }else{
            trySend =false;
            alert("是不是有什么信息写错了呢~")
            return;
        }
        page.writeone.fadeOut(30);
        switchCapsule(capsule_type);
    }
})
// writeone&writemap 结束
//同学录？？
nextPage.writesec.on('click', function () {
    
    // cap_template, content_word
    content_word = $('#letter3').val();
    if (content_word == '') {
        trySend =false;
        alert('你没有写任何东西！');
    } else {
        if(checkInput(content_word,'str')){
            trySend =true;
            sendLetter(0);
        }else{
            trySend =false;
            alert("是不是有什么信息写错了呢~")
            return;
        }
        //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
        page.writesec.fadeOut(30);
        switchCapsule(capsule_type);

    }
})
//TA信息
nextPage.writeTA.on('click', function () {
    // cap_template, content_word
        forbidMove();
        //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);

        if(($("#txl_qq").val()=="")&&($("#txl_wechat").val()=="")&&($("#txl_email").val()=="")){
            alert("至少留下联系方式吧~");
            OpenMove();
            trySend =false;
            return;
        }
        trySend =true;
        page.writeTA.fadeOut(30);
        switchCapsule(capsule_type);
        sendLetter(1);
})
//writeTA&writeTAsend 结束
// writeTAsend&writemap 开始

nextPage.writeTAsend.on('click', function () {
    // content_name,content_phone,content_birth;
    TA_info.name = $('#receiver_name').val();
    TA_info.phone = $('#receiver_tel').val();
    TA_info.email = $('#receiver_email').val();
    if((checkInput(TA_info.phone, 'num'))&&(TA_info.name!="")){
        console.log("提交");
        page.writeTAsend.fadeOut(100);
        page.writemap.fadeIn(80);
    }
    else {
        alert('信使找不到收件人TAT');
    }
})
// writeTAsend&writemap 结束
//反馈界面
$('#finish_rewrite').on('click', function () {
    window.location.reload();
    // page.finish.fadeOut();
    // page.page1.fadeIn();
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
var message=[];
function sendLetter(type){
    switch (type) {//0普通  1同学录
        case 1:
            $("input.txl_input").each(function(){
                message.push( $.trim($(this).val()));
            }) 
            txl_content.name=message[0];
            txl_content.birth=message[1];
            txl_content.star=message[2];
            txl_content.hobby=message[3];
            txl_content.wechat=message[4];
            txl_content.qq=message[5];
            txl_content.email=message[6];
            txl_content.tucao=$("#txl_tucao").text();
            console.log(txl_content);
            // //uploadCapsule(capsule_type,
            //     time_limit, cap_template,
            //     content_word, content_pic, content_voice, 
            //     txl_content, TA_info, from_qrcode, user_id);           
            break;
        default:
            console.log('传就完事了')
            //uploadCapsule()
            break;
    }
}
//信息录入
// $("#submitCapsule").on('click', function () {
//     uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
// });
// 测试用
// window.onload = function () {
//     page.page1.attr('style', 'display:none;');
//     page.finish.attr('style', 'display:block;');
// }
