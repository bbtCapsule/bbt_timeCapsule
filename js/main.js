//config
const phpurl =
  "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" +
  encodeURIComponent(location.href);//微信登录授权跳转页
const getWxurl =
"https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi";//微信请求jsapi页

//const baseUrl = "https://hemc.100steps.net/2020//bbt_timeCapsule/py/api";
const baseUrl = "https://hemc.100steps.net/2020//bbt_timeCapsule/py/api"; //测试用url
const apiurl = `${baseUrl}/`;
const shareurl = encodeURIComponent(location.href);
const shareimg_url = "图片url";
function checkLogin() {
    var checkurl = apiurl + "check_wechat_login";//后台检测登录
    axios.get(checkurl).then(res => {
      wxlogin();
      if (res.data.message == 0 || res.data.errcode == 400) {
        window.location.href = phpurl;//微信登录授权跳转页
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
      })})
      .then(res => res.json())
      .then(res => { 
        wx.config({
          appId: res.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"],
          debug: false
        });
        wx.ready(function() {
          //alert(window.location.href.split('#')[0]);
          wx.updateTimelineShareData({
            title: "毕业季：时光胶囊", // 分享标题
            link: shareurl,
            imgUrl: shareimg_url,
            success: function() {},
            cancel: function() {
              alert("取消了分享~")
            }
          });
        });
        //分享给朋友
        wx.updateAppMessageShareData({
          title: "毕业季：时光胶囊",
          desc: "", // 分享描述
          link: shareurl,
          imgUrl: shareimg_url,//分享d 图片小方块
        success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            alert("取消了分享~")
          }
        });
        wx.error(function() {
          // this.$alert("授权失败了=n=", "提示", {
          //   confirmButtonText: "重试",
          //   cancelButtonText: "取消"
          // }).catch(() => {});
          //点击重试 再重新请求一次  取消就消失弹框
          
        });
        //处理验证成功的信息
      })
}//微信登录

//检测录入信息状态
function checkInfo(){
    var checkInfo_url = apiurl + "check_user_info";
    axios.get(checkInfo_url).then(res =>{
        if(res.data.satus == 200){
            if(res.data.record){
                sessionStorage.setItem("username",res.data.nickname);
            return true;
            }
        }else{
            $(".getInfo").faceIn();
        return false;
        }
    })
}
setTimeout(function(){
    $(".getInfo").fadeIn();
},1000)

//调用微信图片接口

//调用录音

//上传