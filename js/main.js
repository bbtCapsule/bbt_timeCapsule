//config
const phpurl =
  "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" +
  encodeURIComponent(location.href); //微信登录授权跳转页
const tokenurl = "https://api.weixin.qq.com/cgi-bin/token?grant_\
type=client_credentia";
const getWxurl =
  "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi"; //微信请求jsapi页

//const baseUrl = "https://hemc.100steps.net/2020//bbt_timeCapsule/py/api";
const baseUrl = "https://zekaio.cn/2020/timecapsule/api"; //测试用url
const apiurl = `${baseUrl}/`;
const shareurl = encodeURIComponent(location.href);
const shareimg_url = "图片url";
var nickname = "Hi~";
var icon = "your_icon.jpg"; //头像地址
var imgages = {
  localIds: [],
  serverId: []
}; //上传的图片地址数组
var show_imgList = []; //用户绑定页面上显示图片的变量
var mediaIds = [] //接收上传图片返回的serverId（该字段就是调用获取临时素材接口的媒体ID
var voice = []; //录音localid
var voiceIds = [];
axios({
    method: "post",
    url: apiurl + "set_open_id",
    data: {
      openid: 11111
    },
    withCredentials: true,
  })
  .then(res => {
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
        attention(xhr.statusText);
        console.log(textStatus);
      }
    },
    error: function (err) {
      console.log("出错了！请检查网络！");
      console.log(err);
      attention(err);
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
        jsApiList: ['chooseImage', 'uploadImage',
          "startRecord",
          "stopRecord", "onVoiceRecordEnd",
          "pauseVoice", "playVoice", "stopVoice", "onVoicePlayEnd",
          "uploadVoice",
          "updateTimelineShareData", "updateAppMessageShareData"
        ],
        debug: false
      });
      wx.ready(function () {
        //attention(window.location.href.split('#')[0]);
        wx.updateTimelineShareData({
          title: "毕业季：时光胶囊", // 分享标题
          link: shareurl,
          imgUrl: shareimg_url,
          success: function () {},
          cancel: function () {
            attention("取消了分享~")
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
          attention("取消了分享~")
        }
      });
      wx.error(function () {
        // this.$attention("授权失败了=n=", "提示", {
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

//调用微信图片接口
var that = this;

function chooseImg() { //不用上传头像了 就是上传信封的图片（可以有多张图
  wx.chooseImage({
    count: 2, // 限制为2张图片
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      that.images.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      for (var i = 0; i < res.localIds.length; i++) {
        that.show_imgList.push(res.localIds[i]);
      }
      var dele = function (idx) {
        if (show_imgList.length == 0) {
          return;
        }
        show_imgList.splice(idx, 1);
      }
      var show = function () {
        $("#pic1").src = show_imgList[0];
        $("#pic1").show();
        $("#pic_dele1").show();
        $("#pic_dele1").on('click', function () {
          $("#pic1").hide();
          $("#pic_dele1").hide();
          dele(0);
        })
        if (show_imgList.length > 1) {
          $("#pic2").src = show_imgList[1];
          $("#pic2").show();
          $("#pic_dele2").show();
          $("#pic_dele2").on('click', function () {
            $("#pic2").hide();
            $("#pic_dele2").hide();
            dele(1);
          })
        }
      }
      show();
      var uploadCount = 0;
      var localIdLength = that.imgages.localIds.length;
      var upload = function () {
        wx.uploadImage({
          localId: imgages.localIds[uploadCount],
          success: function (res) {
            that.imgages.serverId.push(res.serverId); //微信返回的该图片的服务ID，可调用获取素材的接口下载到自己项目的应用服务器
            var mediaIdsLength = that.mediaIds.length;
            var flag = false;
            if (mediaIdsLength > 0) {
              for (var i = 0; i < mediaIdsLength; i++) {
                if (that.mediaIds[i].id == value.id) {
                  that.mediaIds[i].mediaId.push(res.serverId);
                }
                flag = true;
              }
            }
            if (!flag) {
              var item = {
                id: '',
                mediaId: []
              };
              item.id = value.id;
              item.mediaId.push(res.serverId);
              that.mediaIds.push(item);
            }
            //如果还有照片，继续上传
            uploadCount++;
            if (uploadCount < localIdLength) {
              upload();
            }
          },
          fail: function (res) {
            attention(JSON.stringify(res));
          }
        });
      }; //循环上传
      upload();

    },
    fail: function (res) {
      attention(JSON.stringify(res));
    }
  });

};

function attention(str) {
  $("#allatt").fadeIn();
  $("#att").text(str);
  $("#allatt").on('click', function () {
    $("#allatt").fadeOut();
  })
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
      voice = [];
      attention('录音时间小于' + minTime / 1000 + '秒，请重试');
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

  $("#submitInfo").attr("disabled", "disabled");
  if (checkInput(nickname, 'str') && checkInput(phone, 'num')) {
    post();
    $('#introduce').fadeIn(300);
    $("#getInfo").fadeOut(80);
  } else {
    attention("啊喔！请输入正确信息！");
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
      statusCode: {
        410: res => {
          attention(res.responseJSON.message);
        },
        401: res => {
          attention(res.responseJSON.message);
        },
      },
      success(data, textStatus, xhr) {
        if (data.errcode != 0 || xhr.status == 400) {
          //上传失败 把错误信息显示出来
          attention(data.errmsg);
          console.log(data);
        } else if (data.errcode == 0) {
          $("#loading").fadeOut(80);
          $("#getinfo").fadeOut(); //关掉表单 进入下一个页面
          // mainPage.getInfo.attr('style', 'display:none;');
          mainPage.main.attr('style', 'display:block;');
        }
      },
      error: function (err) {
        console.log("出错了！请检查网络！");
        console.log(err);
        attention(err);
      }
    });
  }
}
//把防注入单独写一个函数 传str进到函数里验证 返回true为通过验证 false为输入了非法信息

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

function uploadCapsule(capsule_type,
  time_limit, cap_template,
  content_word,   txl_content, TA_info, from_qrcode, user_id) {
  $("#submitCapsule").attr("disabled", "disabled");
  $("#loading").fadeIn();
  cap_location = Math.floor((Math.random() * 7) + 1);
  var letter = ({});
  switch (capsule_type) {
    case 1: //写给TA
      if (cap_template == 1) {
        letter = JSON.stringify({
          capsule_type: capsule_type, // （胶囊类型）0，1，2分别代表私密，Ta，陌生人
          time_limit: time_limit, // （时间期限）0，1分别代表半年、一年
          cap_template: cap_template, // （胶囊模板）0，1分别代表普通信纸和同学录
          cap_location: cap_location, // 胶囊位置
          receiver_name: TA_info.name, // 收信人姓名
          receiver_tel: TA_info.tel, // 收信人电话
          receiver_email: TA_info.email, // 收信人邮箱
          content_name: txl_content.name, // 同学录上的姓名
          content_phone: txl_content.tel, // 同学录上的电话
          content_birth: txl_content.birth,
          content_word: txl_content.tucao,
          xingzuo: txl_content.star,
          place: txl_content.place,
          hobby: txl_content.hobby,
          music: txl_content.music,
          movie: txl_content.movie,
          food: txl_content.food,
          wechat: txl_content.wechat,
          QQ: txl_content.qq,
          email: txl_content.email,
          from_qrcode: from_qrcode,
          user_id: user_id,
          // 可选
          content_pic: mediaIds, // 调用uploadImage返回的serverid，没有上传图片就不传这个参数，就算只有一张图片也传数组
          content_voice: voiceIds // 调用微信停止录音接口返回的serverid，没有则不传
        })
      } else {
        letter = JSON.stringify({
          capsule_type: capsule_type, // （胶囊类型）0，1，2分别代表私密，Ta，陌生人
          time_limit: time_limit, // （时间期限）0，1分别代表半年、一年
          cap_template: cap_template, // （胶囊模板）0，1分别代表普通信纸和同学录
          cap_location: cap_location, // 胶囊位置
          receiver_name: TA_info.name, // 收信人姓名
          receiver_tel: TA_info.tel, // 收信人电话
          receiver_email: TA_info.email, // 收信人邮箱
          content_word: content_word, // 文字内容
          from_qrcode: from_qrcode, // 是否二维码写信
          // 可选
          content_pic: mediaIds, // 调用uploadImage返回的serverid，没有上传图片就不传这个参数，就算只有一张图片也传数组
          content_voice: voiceIds
        })
      }
      break;
    default:
      letter = JSON.stringify({
        capsule_type:capsule_type, // （胶囊类型）0，1，2分别代表私密，Ta，陌生人
        time_limit: time_limit, // （时间期限）0，1分别代表半年、一年
        cap_template: cap_template, // （胶囊模板）0，1分别代表普通信纸和同学录
        cap_location: cap_location, // 胶囊位置
        content_word: content_word, // 文字内容
        // 可选
        content_pic: mediaIds, // 调用uploadImage返回的serverid，没有上传图片就不传这个参数，就算只有一张图片也传数组
        content_voice: voiceIds
      })
      break;
  }
  $.ajax({
    method: 'POST',
    url: apiurl + 'capsule',
    contentType: "application/json;charset=utf-8",

    data: letter,
    statusCode: {
      410: res => {
        attention(res.responseJSON.message);
      },
      401: res => {
        attention(res.responseJSON.message);
      },
    },
    success(data, textStatus, xhr) {
      if (data.errcode != 0 || xhr.status == 400) {
        //上传失败 把错误信息显示出来
        attention(data.errmsg);
        console.log(data);
      } else if (data.errcode == 0) {
        $("#loading").fadeOut(200);
        page.writemap.attr('style', 'display:none;');
        page.finish.attr('style', 'display:block;');
      }
    },
    error: function (err) {
      console.log("出错了！请检查网络！");
      console.log(err);
      attention(err);
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


mainPage.welcome.show();

$('#welcome_btn').on('click', function () {
  //if(checkLogin()){
  if (localStorage.getItem("username") != undefined) {
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