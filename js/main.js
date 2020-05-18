//config
const phpurl =
  "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" +
  encodeURIComponent(location.href); //微信登录授权跳转页
const getWxurl =
  "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi"; //微信请求jsapi页

//const baseUrl = "https://hemc.100steps.net/2020//bbt_timeCapsule/py/api";
const baseUrl = "https://zekaio.cn/2020/timecapsule/api"; //测试用url
const apiurl = `${baseUrl}/`;
const shareurl = encodeURIComponent(location.href);
const shareimg_url = "图片url";
var nickname = "Hi~";
var icon = "your_icon.jpg"; //头像地址
var imgs = []; //上传的图片地址数组
var voice = ""; //录音文件链接
axios({
  method:"post",
  url:apiurl+"set_open_id",
  data:{
    openid:11111
  },
  withCredentials:true,})
  .then(res =>{
    console.log("set_openid");
    console.log(res);
  });
function checkLogin() {
  let check = false;
  var checkurl = apiurl + "check_wechat_login"; //后台检测登录
  $.ajax({
    type: 'GET',
    url: checkurl,
    contentType: "application/json;charset=utf-8",
   
    success(data, textStatus, xhr) {
      //console.log(xhr.status);
      console.log(xhr.statusText);
      if (xhr.status == 200) {
        check = true;
      } else {
        alert(xhr.statusText);
        console.log(textStatus);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
  return check;
}

function wxlogin() {
  console.log("wx login start");
  fetch(getWxurl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        url: location.href.split("#")[0]
      })
    })
    .then(res => res.json())
    .then(res => {
      wx.config({
        appId: res.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['chooseImage', 'uploadImage', "startRecord",
          "stopRecord", "onVoiceRecordEnd",
          "pauseVoice", "playVoice", "stopVoice", "onVoicePlayEnd",
          "uploadVoice",
          "updateTimelineShareData", "updateAppMessageShareData"
        ],
        debug: false
      });
      wx.ready(function () {
        //alert(window.location.href.split('#')[0]);
        wx.updateTimelineShareData({
          title: "毕业季：时光胶囊", // 分享标题
          link: shareurl,
          imgUrl: shareimg_url,
          success: function () {},
          cancel: function () {
            alert("取消了分享~")
          }
        });
      });
      //分享给朋友
      wx.updateAppMessageShareData({
        title: "毕业季：时光胶囊",
        desc: "", // 分享描述
        link: shareurl,
        imgUrl: shareimg_url, //分享d 图片小方块
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          alert("取消了分享~")
        }
      });
      wx.error(function () {
        // this.$alert("授权失败了=n=", "提示", {
        //   confirmButtonText: "重试",
        //   cancelButtonText: "取消"
        // }).catch(() => {});
        //点击重试 再重新请求一次  取消就消失弹框

      });
      //处理验证成功的信息
    })
} //微信登录
//检测录入信息状态
sessionStorage.setItem("username", "none");

function checkInfo() {
  // 扫码进入的人才用的
  console.log("check info start");
  var checkInfo_url = apiurl + "check_user_info";
  $.ajax({
    type: 'GET',
    url: checkInfo_url,
    contentType: "application/json;charset=utf-8",
   
    success(data, textStatus, xhr) {
      if (data.record) {
        localStorage.setItem("username", data.nickname);
      } else {
        getInfo();
        console.log("没有录入过信息");
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}
$("#nickname").val("");
$("#phone").val("");
$("#email").val("");

// if(!checkInfo()||sessionStorage.getItem("username")=="none"){
function getInfo() { //show just
  console.log("get info start");
  $("#getInfo").fadeIn();
  //调用检测函数 通过验证时把个人信息发给后台
}
$("#nickname").on('change', function (e) {
  nickname = $("#nickname").val();
  // console.log("name  " + nickname);
  $("#submitInfo").attr('disabled', false);
});
$("#phone").on('input', function (e) {
  phone = $("#phone").val();
  // console.log("phone  " + phone);
  $("#submitInfo").attr('disabled', false);
});
$("#email").on('input', function (e) {
  email = $("#email").val();
  // console.log("email  " + email);
  $("#submitInfo").attr('disabled', false);
});
$("#submitInfo").on('click', function (e) {
  $("#submitInfo").attr('disabled', true);
  uploadInfo($("#nickname").val(),
    $("#phone").val(),
    $("#email").val());
  setTimeout(() => {
    $("#submitInfo").attr('disabled', false);
    console.log("按钮解禁");
  }, 3000)
});
//把防注入单独写一个函数 传str进到函数里验证 返回true为通过验证 false为输入了非法信息
function checkErr(str, reg) {
  var x = str.replace(/\s/g, '');
  var reg2 = new RegExp('[<>&*=:;]');
  if (reg.test(x) && !reg2.test(x)) {
    return true;
  } else {
    return false;
  }
}
//调用微信图片接口
function chooseImg(type) { //type  如果是1 就是指上传的是头像（只能选一张图  是0 就是上传信封的图片（可以有多张图
  if (type == 1) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        $("#head_pic").src = localIds[0];
        icon = localIds[0];
      }
    });
  } else {
    wx.chooseImage({
      count: 3, // 限制为三张图片
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        for (num in localIds) {
          imgs[num] = localIds[num];
        }
      }
    });
  }
}

//调用录音
var startTime = 0,
  endTime = 0;
//录音开始
function voiceRecord(type, minTime) { //type为0是录音，type为1是结束 minTime录音最少时间(单位毫秒)
  if (type == 0) {
    startTime = new Date().getTime();
    wx.startRecord(); //开始录音
  } else if (type == 1) {
    endTime = new Date().getTime();
    if (endTime - startTime < minTime) {
      var localId = '';
      alert('录音时间小于' + minTime / 1000 + '秒，请重试');
    } else {
      wx.stopRecord({ // 停止录音
        success: function (res) {
          voice = res.localId;
        }
      });
    }
  }
}

//录音播放
function voicePlay() {
  if ($(this).hasClass('voicePlay')) {
    $(this).removeClass('voicePlay');
    // 停止播放接口
    wx.stopVoice({
      localId: voice // 需要停止的音频的本地ID，由stopRecord接口获得
    });
  } else {
    $(this).addClass('voicePlay');
    // 播放语音接口
    wx.playVoice({
      localId: voice // 需要播放的音频的本地ID，由stopRecord接口获得
    });
  }
}
//录音删除
function voiceDel() {
  voice = '';
}
//录音上传
function uploadVoice() {
  wx.uploadVoice({
    localId: voice, // 需要上传的音频的本地ID，由stopRecord接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      return res.serverId; // 返回音频的服务器端ID
    }
  });
};

//按钮的禁用
var countTime = 6; //设为10秒钟
function setTime(obj) {
  console.log(String(obj) + " disabled");
  $(obj).attr("disabled", "true");
  var time = setInterval(function () {
    if (countTime <= 0) {
      obj.attr('disabled', 'false');
      clearInterval(time);
      countTime = 6;
      console.log(true);
    } else {
      //console.log(false);
      countTime--;
    }
  }, 800)
}
//上传个人信息
function uploadInfo(nickname, phone, email) {
  //icon是有默认值的（比如不想自定义头像）直接上传就行
  //先禁用按钮！！！！

  // $("#submitInfo").attr("disabled", "disabled");
  if (checkInput(nickname, 'str') && checkInput(phone, 'num')) {
    post();
    $('#introduce').fadeIn(300);
    $("#getInfo").fadeOut(80);
  } else {
    alert("wrong input!");
    $("#submitInfo").attr("disabled", true);
  }

  function post() {
    //upload
    console.log("upload info");
    $("#loading").fadeIn();
    $.ajax({
      method: 'POST',
      url: apiurl + 'user_info',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({
        nickname: nickname,
        phone: phone,
        email: email,
        //head_pic: icon
      }),
      success(data, textStatus, xhr) {
        if (data.errcode != 0 || xhr.status == 400) {
          //上传失败 把错误信息显示出来
          alert(data.errmsg);
          console.log(data);
        } else if (data.errcode == 0) {
          $("#loading").fadeOut(80);
          $("#getinfo").fadeOut(); //关掉表单 进入下一个页面
          // mainPage.getInfo.attr('style', 'display:none;');
          mainPage.main.attr('style', 'display:block;');
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
}

function checkInput(str, type) {
  //type 'str'  'num' for text or number
  let checkres = false; //wrong text
  console.log(str);
  if ((/^\s*$/.test(str) == true) || (str == "") || (str == undefined)) {
    return checkres;
  }
  if (type == 'str') {
    var check1 = new RegExp(/“|&|’|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g);
    var patt_illegal = new RegExp(/[\#\$\ % \^\ & \ *  {\}\:\\L\ < \ > \?}\'\"\\\/\b\f\n\r\t]/g);
    str.replace(check1, "");
    str.replace(patt_illegal, "");
    checkres = true;
    return checkres;
  } else if (type == 'num') {
    checkres = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(str);
  }
  return checkres;
}

function uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth) {
  $("#submitCapsule").attr("disabled", "disabled");
  $("#loading").fadeIn();
  $.ajax({
    method: 'POST',
    url: apiurl + 'capsule',
    contentType: "application/json;charset=utf-8",
   
    data: JSON.stringify({
      capsule_type: capsule_type,
      time_limit: time_limit,
      cap_template: cap_template,
      cap_location: cap_location,
      content_word: content_word,
      content_pic: content_pic,
      content_voice: content_voice,
      content_name: content_name,
      content_phone: content_phone,
      content_birth: content_birth
    }),
    success(data, textStatus, xhr) {
      if (data.errcode != 0 || xhr.status == 400) {
        //上传失败 把错误信息显示出来
        alert(data.errmsg);
        console.log(data);
      } else if (data.errcode == 0) {
        $("#loading").fadeOut(200);
        page.writemap.attr('style', 'display:none;');
        page.finish.attr('style', 'display:block;');
      }
    },
    error: function (err) {
      console.log(err);
    }
  })
}

// main页面跳转 
var mainPage = {
  welcome: $('#welcome'),
  getInfo: $('#getInfo'),
  main: $('#main'),
  introduce: $('#introduce')
}
for (var key in mainPage) {
  mainPage[key].attr('style', 'display:none;')
}

window.onload = function () {
  mainPage.welcome.attr('style', 'display:block;');
}
$('#welcome_btn').on('click', function () {
  //if(checkLogin()){
  if(localStorage.getItem("username")!=undefined){
    mainPage.introduce.fadeIn(100);
    mainPage.welcome.fadeOut(80);
  } 
  getInfo();
  mainPage.getInfo.fadeIn(100);
  mainPage.welcome.fadeOut(80);
  //mainPage.introduce.attr('style', 'display:block;');
  //}else{
  //wxlogin();
  //checkInfo();
  /// }
})
$('#go_intro').on('click', function () {
  $('#introduce').fadeIn(300);
  $('#main').fadeOut(80);
  // mainPage.main.attr('style', 'display:none;');
  // mainPage.introduce.attr('style', 'display:block;');
})
$('#intro_btn').on('click', function () {
  // mainPage.introduce.attr('style', 'display:none;');
  // mainPage.main.attr('style', 'display:block;');
  $('#introduce').fadeOut(300);
  $('#main').fadeIn(80);
})