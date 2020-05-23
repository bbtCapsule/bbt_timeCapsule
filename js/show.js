//可以把不涉及数据传输的 动画函数、展示写在这里
$("#loading").on('click', function (e) {
    $("#loading").fadeOut(100);
})
$("#allatt").on('click', function (e) {
    $("#allatt").fadeOut(100);
})
var hasMai = false;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
function clickanim(e){
    // var clickId = $(this).attr("id");
    var A1 = (e.pageX >= 120) && (e.pageX <= 245) && (e.pageY <= 400) && (e.pageY >= 130);
    var A2 = (e.pageX >= 100) && (e.pageX <= 150) && (e.pageY <= 760) && (e.pageY >= 705);
    var A3 = (e.pageX >= 1098) && (e.pageX <= 1150) && (e.pageY <= 540) && (e.pageY >= 460);
    var A4 = (e.pageX >= 1106) && (e.pageX <= 1180) && (e.pageY <= 1078) && (e.pageY >= 1034);
    var A5 = (e.pageX >= 1956) && (e.pageX <= 2019) && (e.pageY <= 1086) && (e.pageY >= 1048);
    var A6 = (e.pageX >= 1739) && (e.pageX <= 1800) && (e.pageY <= 360) && (e.pageY >= 320);
    var A7 = (e.pageX >= 1935) && (e.pageX <= 1999) && (e.pageY <= 280) && (e.pageY >= 232);
    var A8 = (e.pageX >= 2210) && (e.pageX <= 2280) && (e.pageY <= 879) && (e.pageY >= 770);
    var A9 = (e.pageX >= 2400) && (e.pageX <= 2455) && (e.pageY <= 1000) && (e.pageY >= 974);
    var A10 = (e.pageX >= 2620) && (e.pageX <= 2700) && (e.pageY <= 500) && (e.pageY >= 476);
    if (A1 || A2 || A3 || A4 || A5 || A6 || A7 || A8 || A9 || A10) {
        hasMai = true;
        $("#img_map").attr("class", "go");
        $("#mai_anim").css("top", e.pageY);
        $("#mai_anim").css("left", e.pageX);
        $("#jiantou").fadeIn(100);
        setTimeout(() => {
            $("#jiantou").fadeOut(100);
            $("#mai_anim").fadeIn(100);
        }, 600);
        //addChanzi();
        setTimeout(() => {
            $("#img_map").attr("class", "");
            $("#mai_anim").fadeOut(300);
            $(".mai").hide();
            $("#write-map").fadeOut(700);
            $("#finish").fadeIn(600);
        }, 1800);
    }

}
function areaShow() {
    // for (i = 1; i < 8; i++) {
    // $("#A" + i).on('click', function (e) {
        // if(isiOS){
        //     alert("你是ios吼！");
        //     setTimeout(() => {
        //         $("#img_map").attr("class", "go");
        //         $("#mai_anim").css("top",'50%');
        //         $("#mai_anim").css("left", '20%');
        //         $("#mai_anim").css("position", 'fixed');
        //         $("#mai_anim").css("transform",'scale(2.5)');
        //         $("#jiantou").fadeIn(100);
        //         setTimeout(() => {
        //             $("#jiantou").fadeOut(100);
        //             $("#mai_anim").fadeIn(100);
        //         }, 1800);
        //         //addChanzi();
        //         setTimeout(() => {
        //             $("#img_map").attr("class", "");
        //             $("#mai_anim").fadeOut(300);
        //             $(".mai").hide();
        //             $("#write-map").fadeOut(700);
        //             $("#finish").fadeIn(600);
        //         }, 3700);
        
        //     }, 500);
        //     return;
        // }
        alert("你是安卓吼！");
    $(document).on('mousemove', function (e) {
        // console.log(e.pageX,e.pageY);
        clickanim(e);
    })
    // });
    // }

}
// areaShow();
$("#mai_att").on('click', function () {
    console.log('埋胶囊');
    OpenMove();
    areaShow();
})
$("#go_receive").on('click', function (e) {
    window.location.href = "receive.html"
})
$("#go_write").on('click', function (e) {
    window.location.href = "write.html"
})
// 页面切换
var page = {
    loading: $("#loading"),
    attention: $("#allatt"),
    page1: $("#page1"), //write page1 switch capsule type
    page2: $("#page2"), //page2 switch template
    writeone: $("#write-one"), //template1&2
    writesec: $("#write-sec"), //template3
    writeTA: $("#write-TA"), //template4
    writeTAsend: $("#write-TA-send"), //get TAinfo
    writemap: $("#write-map"), //play mai map
    finish: $("#finish"), //finish 
};
var nextPage = {
    page1: $("#page1 .nextPage"),
    page2: $("#page2 .nextPage"),
    writeone: $("#write-one>.write-one_bottom>#OneSub"),
    writesec: $("#write-sec>.write-one_bottom>#ThirdSub"),
    writeTA: $("#write-TA>.write-one_bottom>#FourSub"),
    writeTAsend: $("#write-TA-send>.write-one_bottom>#TASub"),
};
var prePage = {
    page1: $("#page1 .prePage"),
    page2: $("#page2 .prePage"),
    writeone: $("#write-one .prePage"),
    writesec: $("#write-sec .prePage"),
    writeTA: $("#write-TA .prePage"),
};

function hideALL() {
    page.page1.hide();
    page.writeTAsend.hide();
    page.writemap.hide();
    page.finish.hide();
    page.page2.hide();
}

function goPage2() {
    page.page1.fadeOut(200);
    page.page2.fadeIn(200);
}

function goTemplate1() {
    page.writeone.css("backgroundImage", "url('./images/letter/1.png')");
    $("#images").attr("src", "./images/letter/photobtn.png");
    $("#voiceStart").attr("src", "./images/letter/record.png");
    $(".write-one_bottom>.nextPage").attr("src", "./images/letter/L1.png");
    $("#player").attr("src", "./images/letter/R1.png");
    hideALL();
    page.writeone.fadeIn();
}

function goTemplate2() {
    page.writeone.css("backgroundImage", "url('./images/letter/2.png')");
    $("#images").attr("src", "./images/letter/photobtn2.png");
    $("#voiceStart").attr("src", "./images/letter/record2.png");
    $(".write-one_bottom>.nextPage").attr("src", "./images/letter/L2.png");
    $("#player").attr("src", "./images/letter/R2.png");
    hideALL();
    page.page2.fadeOut(100);
    page.writeone.fadeIn();
}

function goTemplate3() {
    $("#images").attr("src", "./images/letter/photobtn3.png");
    $("#voiceStart").attr("src", "./images/letter/record3.png");
    $(".write-one_bottom>.nextPage").attr("src", "./images/letter/L3.png");
    $("#player").attr("src", "./images/letter/R3.png");
    hideALL();
    page.page2.fadeOut(100);
    page.writesec.fadeIn();
}

function goTemplate4() {
    hideALL();
    page.page2.fadeOut(100);
    page.writeTA.fadeIn();
}