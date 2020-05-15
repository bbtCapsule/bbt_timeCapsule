//config
const phpurl =
  "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" +
  encodeURIComponent(location.href); //微信登录授权跳转页
const getWxurl =
  "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi"; //微信请求jsapi页

//const baseUrl = "https://hemc.100steps.net/2020//bbt_timeCapsule/py/api";
const baseUrl = "https://hemc.100steps.net/2020//bbt_timeCapsule/py/api"; //测试用url
const apiurl = `${baseUrl}/`;
const shareurl = encodeURIComponent(location.href);
const shareimg_url = "图片url";
var nickname = "Hi~";
var icon = "your_icon.jpg"; //头像地址
var imgs = []; //上传的图片地址数组
var voice = ""; //录音文件链接
function checkLogin() {
  var checkurl = apiurl + "check_wechat_login"; //后台检测登录
  axios.get(checkurl).then(res => {
    wxlogin();
    if (res.data.message == 0 || res.data.errcode == 400) {
      window.location.href = phpurl; //微信登录授权跳转页
    } else {
      return true;
    }
  });
}

function wxlogin() {
  fetch(getWxurl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: qs.stringify({
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
  var checkInfo_url = apiurl + "check_user_info";
  axios.get(checkInfo_url).then(res => {
    if (res.data.satus == 200) {
      if (res.data.record) {
        sessionStorage.setItem("username", res.data.nickname);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  })
}
// if(!checkInfo()||sessionStorage.getItem("username")=="none"){
if (sessionStorage.getItem("username") == "none") {
  var nickname, phone, email = "";
  $(".getInfo").fadeIn();
  $("#nickname").on('input', function (e) {
    nickname = $("#nickname").val();
    console.log("name  " + nickname);
  });
  $("#phone").on('input', function (e) {
    phone = $("#phone").val();
    console.log("phone  " + phone);
  });
  $("#email").on('input', function (e) {
    email = $("#email").val();
    console.log("email  " + email);
  });
  //调用检测函数 通过验证时把个人信息发给后台
  $("#submitInfo").on('click', function (e) {
      uploadInfo(nickname, phone, email);
  });
}
//把防注入单独写一个函数 传str进到函数里验证 返回true为通过验证 false为输入了非法信息
// function checkErr(str, reg) {
//   var x = str.replace(/\s/g, '');
//   var reg2 = new RegExp('[<>&*=:;]');
//   if (reg.test(x) && !reg2.test(x)) {
//     return true;
//   } else {
//     return false;
//   }
// }
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
// var startTime, endTime = '';
// function voiceRecord(type, minTime) { //type为0是录音，type为1是结束 minTime录音最少时间(单位毫秒)
//   if (type == 0) {
//     startTime = new Date().getTime();
//     wx.startRecord(); //开始录音
//   } else if (type == 1) {
//     endTime = new Date().getTime();
//     if (endTime - startTime < minTime) {
//       var localId = '';
//       alert('录音时间小于' + minTime / 1000 + '秒，请重试');
//     } else {
//       wx.stopRecord({ // 停止录音
//         success: function (res) {
//           voice = res.localId;
//         }
//       });
//     }
//   }
// }

// function voicePlay() {
//   if ($(this).hasClass('voicePlay')) {
//     $(this).removeClass('voicePlay');
//     // 停止播放接口
//     wx.stopVoice({
//       localId: voice // 需要停止的音频的本地ID，由stopRecord接口获得
//     });
//   } else {
//     $(this).addClass('voicePlay');
//     // 播放语音接口
//     wx.playVoice({
//       localId: voice // 需要播放的音频的本地ID，由stopRecord接口获得
//     });
//   }
// }
//上传个人信息
// var countTime = 10;
// function setTime(obj) {
//   var time = setInterval(function () {
//     if (countTime <= 0) {
//       obj.removeAttr('disabled');
//       clearInterval(time);
//       countTime = 10;
//       console.log(true);
      
//     } else {
//       obj.innerHTML=countTime;
//       console.log(false);
//       countTime--;
//     }
//   }, 1000)
// }

function uploadInfo(nickname, phone, email) {
  //icon是有默认值的（比如不想自定义头像）直接上传就行
  //先禁用按钮！！！！
  // setTime($('#submitInfo'));
  $("#submitInfo").attr("disabled", "disabled");
  axios({
    method: 'post',
    url: apiurl + 'user_info',
    headers: {
      'X-Requested-With': 'application/json'
    },
    data: {
      nickname: nickname,
      phone: phone,
      email: email,
      head_pic: icon
    }
  }).then(res => {
    if (res.data.errcode != 0 || res.status == 400) {
      //上传失败 把错误信息显示出来
    } else if (res.data.errcode == 0) {
      $(".getinfo").fadeOut(); //关掉表单 进入下一个页面
      window.location.href = "nextpage";
    }
  });
}

// function uploadCapsule(capsule_type, time_limit, cap_template, cap_location, content_word, content_pic, content_voice, content_name, content_phone, content_birth) {
//   $("#submitCapsule").attr("disabled", "disabled");
//   axios({
//     method: 'post',
//     url: apiurl + 'capsule',
//     headers: {
//       'X-Requested-With': 'application/json'
//     },
//     data: {
//       capsule_type: capsule_type,
//       time_limit: time_limit,
//       cap_template: cap_template,
//       cap_location: cap_location,
//       content_word: content_word,
//       content_pic: content_pic,
//       content_voice: content_voice,
//       content_name: content_name,
//       content_phone: content_phone,
//       content_birth: content_birth
//     }
//   }).then(res => {
//     if (res.data.errcode != 0 || res.status == 400) {
//       //上传失败 把错误信息显示出来
//     } else if (res.data.errcode == 0) {
//       page.writemap.attr('style', 'display:none;');
//       page.finish.attr('style', 'display:block;');
//     }
//   });
// }


// function gotoWrite() {
//   document.getElementById("aaa");
//   window.location.href = "write.html";
// }

// function gotoReceive() {
//   document.getElementById("bbb");
//   window.location.href = "receive.html";
// }