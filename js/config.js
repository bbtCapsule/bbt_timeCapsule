const baseUrl = "https://hemc.100steps.net/2020/timecapsule/api"; //测试用url
const apiurl = `${baseUrl}/`;
const phpurl =
  "https://hemc.100steps.net/2017/wechat/Home/Index/index?state=" +
  encodeURIComponent(window.location.href); //微信登录授权跳转页
const getWxurl = "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi"; //微信请求jsapi页
const shareurl = encodeURIComponent(location.href);
const shareimg_url = "图片url";
var info_check = false;
;
function attention(str) {
  $("#allatt").fadeIn();
  $("#att").text(str);
  $("#allatt").on("click", function () {
    $("#allatt").fadeOut();
  });
}
function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  switch (res.status) {
    case 401:
      window.location.href = phpurl;
      break;
    case 410:
      attention("不在活动时间");
      break;
    case 500:
      attention("服务器错误，请稍后重试");
      break;
  }
  const err = new Error(res.statusText);
  err.res = res;
  throw err;
}

// 微信登录
var check = false;
function checkLogin(succ_fun = () => {}) {
  fetch(apiurl + "check_wechat_login", {
    method: "get",
    credentials: "include",
    mode: "cors",
  })
    .then(checkStatus)
    .then(() => {
      check = true;
      succ_fun();
    });
}

// 检测用户是否填写信息

function checkInfo() {
  fetch(apiurl + "check_user_info", {
    method: "get",
    credentials: "include",
    mode: "cors",
  })
    .then(checkStatus)
    .then((res) => res.json())
    .then((res) => {
      info_check = res.record;
    });
}

// 加载完成后检测一次微信登录和是否填写信息
window.onload = () => {
 checkLogin(checkInfo);
};

// 获取微信JSSDK配置，以表单形式传参数，不要把content-type设置成"application/x-www-form-urlencoded"
function wxlogin() {
  console.log("wx login start");

  let formdata = new FormData();
  formdata.append("url", location.href.split("#")[0]);

  fetch(getWxurl, {
    credentials: "include",
    method: "POST",
    body: formdata,
  })
    .then((res) => res.json())
    .then((res) => {
      wx.config({
        appId: res.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: [
          "chooseImage",
          "uploadImage",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "pauseVoice",
          "playVoice",
          "stopVoice",
          "onVoicePlayEnd",
          "uploadVoice",
          "updateTimelineShareData",
          "updateAppMessageShareData",
        ],
        debug: false,
      });
      wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.checkJsApi({
          jsApiList: [
            "chooseImage",
            "uploadImage",
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "pauseVoice",
            "playVoice",
            "stopVoice",
            "onVoicePlayEnd",
            "uploadVoice",
            "updateTimelineShareData",
            "updateAppMessageShareData",
          ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            console.log("接口可用");
            console.log(res);
          },
        });
      });
      //   wx.ready(function () {
      //     //attention(window.location.href.split('#')[0]);
      //     wx.updateTimelineShareData({
      //       title: "毕业季：时光胶囊", // 分享标题
      //       link: shareurl,
      //       imgUrl: shareimg_url,
      //       success: function () {},
      //       cancel: function () {
      //         attention("取消了分享~")
      //       }
      //     });
      //   //分享给朋友
      //   wx.updateAppMessageShareData({
      //     title: "毕业季：时光胶囊",
      //     desc: "", // 分享描述
      //     link: shareurl,
      //     imgUrl: shareimg_url, //分享d 图片小方块
      //     success: function () {
      //       // 用户确认分享后执行的回调函数
      //     },
      //     cancel: function () {
      //       // 用户取消分享后执行的回调函数
      //       attention("取消了分享~")
      //     }
      //   });
      wx.error(function (err) {
        console.log(err);
        //attention("授权失败了=n= 刷新一下吧")
        //点击重试 再重新请求一次  取消就消失弹框
      });
    });
}
