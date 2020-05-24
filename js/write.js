// 获取jssdk配置
wxlogin();

// 相关参数
var capsule_type,
  time_limit,
  cap_template, //胶囊类型 取信期 信纸类型
  content_word,
  //  content_pic, content_voice,
  content_name,
  content_phone,
  content_birth;
var TA_info = new Object();
var from_qrcode = false;
var user_id = "none";
var txl_content = new Object();
var trySend = false;
var message = [];
var str0 =
  "未来的我会更好/这是写给自己的信/未来的我们，或许还在这里/可目之所及，心之所向/或许已不同于往吧";
var str1 =
  "亲爱的朋友，想你了/这是写给朋友的信/希望未来的你/看见我的信时/能够收获一丝感动";
var str2 =
  "素不相识却似曾相识/这是写给陌生人的信/虽然你我不曾认识/但你的小纸条/或许能够温暖、鼓励未来的我";
//页面初始的显示
var sing = $("#sing_box");
var singbtn = $("#recordbtn");
var isSet = false;
var letterType = 0;
var hasTAinfo = false;
hideALL();

page.page1.show();
if (window.location.href.split("?uid=").length == 2) {
  console.log("来自二维码！");
  attention("写一封信，希望未来的TA（自己）能够收获一丝感动~");
  hasTAinfo = true;
  user_id = window.location.href.split("?uid=")[1];
  from_qrcode = true;
  capsule_type = 1;
  goPage2();
}

//获取radio
function getRadio(obj) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].checked === true) {
      return obj[i].value;
    }
  }
  return -1;
}
page.writemap.on("click", function () {
  $("#mai_att").fadeOut(100);
  OpenMove();
  areaShow();
  console.log('埋胶囊');

});
//页面开关
prePage.page1.on("click", function () {
  window.location.href = "main.html";
  forbidMove();
});
//1&2 开始
function mixHtml(str) {
  var arr = str.split("/");
  var html = "";
  for (i = 0; i < arr.length; i++) {
    html += arr[i] + "<br>";
  }
  return html;
}
$(".choose").on("click", function () {
  let idx = Number(getRadio(document.getElementsByName("sender")));
  let src = "url(./images/other/K" + idx + ".png)";
  let str = "";
  switch (idx) {
    case 0:
      str = str0;
      break;
    case 1:
      str = str1;
      break;
    case 2:
      str = str2;
      break;
    default:
      str =
        "当过去凋零成遗迹/用文字刻划出暖意/我们携手在华园地图上标记/保存那些珍贵的回忆/为你定格那一刻的美好";
      break;
  }
  $(".page1_intro").css("backgroundImage", src);
  $("#page1_intro").html(mixHtml(str));
});
nextPage.page1.on("click", function () {
  capsule_type = getRadio(document.getElementsByName("sender"));

  if (capsule_type === -1) {
    attention("你还没有选择！");
  } else {
    if (capsule_type == 1) {
      $("#show_L4").show();
      $("p#num").text("0/4");
    } else {
      $("#show_L4").hide();
      $("p#num").text("0/3");
    }
    page.page1.fadeOut(200);
    page.page2.fadeIn(100);
  }
});
prePage.page2.on("click", function () {
  page.page2.fadeOut(200);
  page.page1.fadeIn(100);
  isSet = false;
});
//1&2 结束
//page2的分支有三个
//type 若0 选了信纸1、2。 若1选了信纸3。 若2选了同学录
$(".switchbox").on("click", function () {
  if ($("#show_L4").css("display") == "none") {
    sum = 3;
  } else {
    sum = 4;
  }
  str = "/" + sum;
  var num = getRadio(document.getElementsByName("template"));
  switch (num) {
    case "L1":
      letterType = 0;
      $("#num").text("1" + str);
      break;
    case "L2":
      letterType = 0;
      $("#num").text("2" + str);
      break;
    case "L3":
      letterType = 1;
      $("#num").text("3" + str);
      break;
    case "L4":
      letterType = 2;
      $("#num").text("4" + str);
      break;
    default:
      $("#num").text("0" + str);
      break;
  }
});

function switchPage(type) {
  //根据胶囊类型选择进入 其中第三个信纸是ser
  if (type == 0) {
    goTemplate1();
    // page.page2.fadeOut(200);
    // page.writeone.fadeIn(100);
    return page.writeone;
  } else if (type == 1) {
    goTemplate3();
    // page.page2.fadeOut(200);
    // page.writesec.fadeIn(100);
    return page.writesec;
  } else if (type == 2) {
    OpenMove();
    goTemplate4();
    // page.page2.fadeOut(200);
    // page.writeTA.fadeIn(100);
    return page.writeTA;
  }
}
//2&writeone&writesec&writeTA
nextPage.page2.on("click", function () {
  time_limit = getRadio(document.getElementsByName("year"));
  var template = getRadio(document.getElementsByName("template"));
  if (time_limit === -1) {
    attention("你还没有选择！");
  } else {
    if (template == "L1") {
      switchPage(0);
      cap_template = 0;
      goTemplate1();
    } else if (template == "L2") {
      switchPage(0);
      cap_template = 0;
      goTemplate2();
    } else if (template == "L3") {
      switchPage(1);
      cap_template = 0; //0是普通信纸
      goTemplate3();
    } else if (template == "L4") {
      switchPage(2);
      cap_template = 1; //1是同学录
      goTemplate4();
    }
  }
});
prePage.writeone.on("click", function () {
  forbidMove();
  $(".letter_text").val("");
  page.writeone.fadeOut(300);
  page.page2.fadeIn();
  message = [];
  isSet = false;
});
prePage.writesec.on("click", function () {
  forbidMove();
  $(".letter_text").val("");
  page.writesec.fadeOut(300);
  page.page2.fadeIn();
  message = [];
  isSet = false;
});
prePage.writeTA.on("click", function () {
  forbidMove();
  page.writeTA.fadeOut(300);
  page.page2.fadeIn();
  message = [];
  isSet = false;
});

// 根据type判断是否跳转填写信息
function switchCapsule(str) {
  console.log("胶囊类型是" + str + " 0写给自己 1写给专属 2写给陌生人");
  switch (Number(str)) {
    case 1:
      forbidMove();
      if (from_qrcode) {
        TrueSend();
        page.writemap.fadeIn(90);
        break;
      }
      page.writeTAsend.fadeIn(90);
      break;
    default:
      OpenMove();
      page.writemap.fadeIn(90);
      break;
  }
}

//writeone&writemap 1\2信纸
function disableBtn() {
  nextPage.writeone.css("opacity", "0.6");
  nextPage.writesec.css("opacity", "0.6");
  nextPage.writeTA.css("opacity", "0.6");
  nextPage.writeone.attr("disabled", "disabled");
  nextPage.writesec.attr("disabled", "disabled");
  nextPage.writeTA.attr("disabled", "disabled");
  setTimeout(() => {
    nextPage.writeone.attr("disabled", false);
    nextPage.writesec.attr("disabled", false);
    nextPage.writeTA.attr("disabled", false);
    nextPage.writeone.css("opacity", "1");
    nextPage.writesec.css("opacity", "1");
    nextPage.writeTA.css("opacity", "1");

    console.log("提交按钮解禁");
  }, 6000);
}

nextPage.writeone.on("click", function () {
  forbidMove();
  disableBtn();
  content_word = $(".letter_text").val();
  if (content_word == "") {
    trySend = false;
    attention("你没有写任何东西！");
  } else {
    //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
    if (checkInput(content_word, "str")) {
      trySend = true;
    } else {
      trySend = false;
      attention("是不是有什么信息写错了呢~");
      return;
    }
    page.writeone.fadeOut(300);
    switchCapsule(capsule_type);
    sendLetter(0);
    if (Number(capsule_type) != 1) {
      TrueSend();
    }
  }
});
// writeone&writemap 结束
//同学录？？
nextPage.writesec.on("click", function () {
  // cap_template, content_word
  OpenMove();
  disableBtn();
  content_word = $("#letter3").val();
  if (content_word == "") {
    trySend = false;
    attention("你没有写任何东西！");
  } else {
    if (checkInput(content_word, "str")) {
      trySend = true;
    } else {
      trySend = false;
      attention("是不是有什么信息写错了呢~");
      return;
    }
    //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);
    page.writesec.fadeOut(300);
    switchCapsule(capsule_type);
    sendLetter(3);
    TrueSend();
  }
});
//TA信息
nextPage.writeTA.on("click", function () {
  // cap_template, content_word
  disableBtn();
  forbidMove();
  //uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth);

  if (
    $("#txl_qq").val() == "" &&
    $("#txl_wechat").val() == "" &&
    $("#txl_email").val() == ""
  ) {
    attention("至少留下联系方式吧~");
    OpenMove();
    trySend = false;
    return;
  }
  trySend = true;
  page.writeTA.fadeOut(300);
  switchCapsule(capsule_type);
  sendLetter(4);

  console.log("还需要收件人信息");
});
//writeTA&writeTAsend 结束
// writeTAsend&writemap 开始

nextPage.writeTAsend.on("click", function () {
  // content_name,content_phone,content_birth;
  TA_info.name = $("#receiver_name").val();
  TA_info.tel = $("#receiver_tel").val();
  TA_info.email = $("#receiver_email").val();
  if (checkInput(TA_info.tel, "num") && TA_info.name != "") {
    console.log("提交");
    console.log("write ta send");
    nextPage.writeTAsend.attr("disabled", true);
    page.writeTAsend.fadeOut(100);
    page.writemap.fadeIn(80);
    TrueSend();
  } else {
    attention("信使找不到收件人TAT");
  }
});
// writeTAsend&writemap 结束
//反馈界面
$("#finish_rewrite").on("click", function () {
  window.location.reload();
  // page.finish.fadeOut(300);
  // page.page1.fadeIn();
});
$("#finish_back").on("click", function () {
  window.location.href = "main.html";
});
$(".txl_input").each(function () {
  $(this).bind("focus", function (e) {
    moveKeyboard(4);
  });
  $(this).bind("blur", function (e) {
    // $("txl_img").attr('class',"");
    // $("txl_img").removeClass(".change");
  });
});

$(".txl_textarea").each(function () {
  $(this).bind("focus", function (e) {
    moveKeyboard(4);
  });
  $(this).bind("blur", function (e) {});
});
$(".letter_text").each(function () {
  $(this).bind("focus", function (e) {
    console.log("foucus", letterType);
    moveKeyboard(letterType);
  });
  $(this).bind("blur", function (e) {
    if (voice != undefined) {
      $("#write-one>.content.write-one_content>.mp3").fadeIn();
      $("#write-sec>.content.write-one_content>.mp3").fadeIn();
    }
    if (hasImg) {
      $(".deleimg").show();
      $(".add_img").show();
    }
  });
});
$(".add_img").each(function () {
  $(this).bind("touchmove", function (e) {
    e.preventDefault();
  });
});

function sendLetter(letterType) {
  console.log("记录的是第几张信纸内容 0 前两张 1 第三张 4 同学录");
  console.log(letterType);
  console.log("type of lettertype");
  console.log(typeof letterType);
  switch (letterType) {
    case 4:
      $(".txl_input").each(function () {
        message.push($.trim($(this).val()));
      });
      txl_content.name = message[0];
      txl_content.birth = message[1];
      txl_content.star = message[2];
      txl_content.hobby = message[3];
      txl_content.wechat = message[4];
      txl_content.qq = message[5];
      txl_content.email = message[6];
      $(".txl_textarea").each(function () {
        message.push($.trim($(this).val()));
      });
      txl_content.place = message[7];
      txl_content.music = message[8];
      txl_content.movie = message[9];
      txl_content.food = message[10];
      txl_content.tucao = message[11];
      console.log(message);
      console.log(txl_content);
      break;
    default:
      $(".letter_text").each(function () {
        if ($(this).val() != "") {
          message.push($(this).val());
        }
      });
      console.log(message);
      break;
  }
}

$("#images").on("click", function () {
  setitem(0);
  isSet = true;
  console.log("第几张信纸" + cap_template);
  chooseImg();
});
$("#images3").on("click", function () {
  setitem(1);
  isSet = true;
  console.log("第3张信纸!");

  chooseImg();
});
$("#images4").on("click", function () {
  setitem(2);
  isSet = true;
  chooseImg();
});
$("#voiceStart").on("click", function () {
  if (!isSet) {
    setitem(letterType);
  }
  sing.fadeIn(100);
});
$("#voiceStart3").on("click", function () {
  if (!isSet) {
    console.log("第3张信纸!");

    setitem(letterType);
  }
  sing.fadeIn(100);
});

sing.on("click", function () {
  sing.fadeOut(100);
});
var timeoutEvent = 0;
singbtn.on({
  touchstart: function (e) {
    timeoutEvent = setTimeout(() => {
      console.log("is it over?");
    }, 3000);
    e.preventDefault();
    $("#sing_anim").attr("src", "./images/sing.gif");
    $("#mp3").fadeIn();
    $("#player").fadeIn();
    $("#voice_dele").fadeIn();
    singbtn.val("松开 结束");
    voiceRecord(0, 1000);
    hasSing = true;
  },
  // touchmove: function (e) {
  //   clearTimeout(timeoutEvent);
  //   timeoutEvent = 0;
  //   e.preventDefault();
  //   $("#sing_anim").attr("src", "./images/record_normal.png");
  //   singbtn.val("按住 开始");
  //   // voiceRecord(1, 1000);
  //   //sing.fadeOut(100);
  // },
  touchend: function (e) {
    e.preventDefault();
    if (timeoutEvent != 0) {
      $("#sing_anim").attr("src", "./images/record_normal.png");
      singbtn.val("按住 开始");
      voiceRecord(1, 1000);
    }
    //return false;
  },
  // touchcancel: function(e){
  //   e.preventDefault();
  //   $("#sing_anim").attr("src", "./images/record_normal.png");
  //   singbtn.val("按住 开始");
  // }
});

function TrueSend() {
  console.log("true send");
  console.log(typeof letterType);
  console.log(letterType);
  console.log(letterType != 2);
  if (letterType != 2) {
    console.log("不等于？");
    // }
    // if(letterType!=2){
    console.log("not =");
    uploadWrapper(
      capsule_type,
      time_limit,
      cap_template,
      message[0],
      [],
      TA_info,
      from_qrcode,
      user_id
    );
  } else {
    console.log("=");
    uploadWrapper(
      capsule_type,
      time_limit,
      cap_template,
      content_word,
      txl_content,
      TA_info,
      from_qrcode,
      user_id
    );
  }
}
