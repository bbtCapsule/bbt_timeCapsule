//可以把不涉及数据传输的 动画函数、展示写在这里
$("#loading").on('click', function (e) {
    $("#loading").fadeOut(300);
})
$("#mai_att").on('click', function (e) {
    $("#mai_att").fadeOut(300);
})
function areaShow() {
    for(i=1;i<8;i++){
        $("#A"+i).on('click', function (e) {
            e.preventDefault();
            var clickId=$(this).attr("id");
            $("#"+clickId).attr("class","go");
            $("#mai_anim").css("top",e.pageY);
            $("#mai_anim").css("left",e.pageX);
            setTimeout(() => {
                $("#mai_anim").fadeIn(100);
            }, 2000);
            //addChanzi();
            setTimeout(() => {
                $("#"+clickId).attr("class","");
                $("#mai_anim").fadeOut(300);
                $(".mai").hide();
                $("#write-map").fadeOut(700);

                $("#finish").fadeIn(600);
            }, 3800);

        });
    }

}
areaShow();
$("#mai_att").on('click', function (e) {
    $("#mai_att").fadeOut(400);
    areaShow();
})
$("#go_receive").on('click', function (e) {
    window.location.href="receive.html"
})
$("#go_write").on('click', function (e) {
    window.location.href="write.html"
})
// function addChanzi(){
//     //出现铲子动画
// $(document).mousemove(function (e) {
//     // var xy_keleyi_com="x坐标:"+ e.pageX+",y坐标："+ e.pageY;
//     // console.log(xy_keleyi_com);
//     $("#mai_anim").css("top",e.pageY);
//     $("#mai_anim").css("left",e.pageX);
//     })
// }