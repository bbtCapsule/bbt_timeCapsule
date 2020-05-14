//网页缩放函数
function scale() {
    var webWidth = 540; //css中固定的网页宽度
    var screenWidth = window.screen.width; //获取当前手机屏幕宽度   
    rate = screenWidth / webWidth; //缩放比例 = 当前手机屏幕宽度/css中固定的网页宽度
    if (screenWidth) {
        document.getElementsByTagName('meta')[name = "viewport"].content =
            "width=device-width,height=device-height,initial-scale=" +
            rate + ",maximum-scale=3.0,user-scalable=no"; //修改meta的属性   
    }
};
scale();
//微信授权
const APPID='';
const REDIRECT_URI='';
const RESPONSE_TYPE='code';
const SCOPE='snsapi_base';
const STATE='12334';


const serverUrl = "";
const loginUrl = "/user_info";
const checkLoginUrl = "/check_user_info";
const writeUrl = "/check_user_info";
const getQRUrl = "/getQRCode";



wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    jsApiList: [
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage'
    ] // 必填，需要使用的JS接口列表
})
