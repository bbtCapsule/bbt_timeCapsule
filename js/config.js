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