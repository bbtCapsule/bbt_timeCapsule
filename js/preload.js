$(function(){
    allload();
    $("img").click(function(event){
        event.preventDefault();
        return false;
    })
    function allload(){
        var idx=1;
        var timer =0;
        var imgdownload = new createjs.LoadQueue(true);
        function anime(){
            timer = setInterval(function(){
                if(idx>3){
                    idx=1;
                }
                var src="./images/"+idx+".png";
                idx++;
                $("#rotate").attr("src",src);
            },500)
    
        }
        function handleComplete(){
            //加载完成 等其他图片放进来以后 把图片放进↓的加载列表 就打开
            $("#loading").fadeOut(800);
           clearInterval(timer);
        }
        // imgdownload.on("fileload", handleFileLoad, this);
    //    imgdownload.on("progress",anime);
        imgdownload.on("complete",handleComplete);
        imgdownload.loadManifest([
            "./images/map.jpg",
            "./images/letter/1.png",
            "./images/letter/2.png",
            "./images/letter/3.png",
            "./images/letter/4.png",
            "./images/letter/41.png",
            "./images/letter/line2.png",
            "./images/letter/dele.png",
            "./images/letter/L1.png",
            "./images/letter/photobtn.png",
            "./images/letter/record.png",
            "./images/HYYOUYUANTIJ.TTF",
            "./images/地图-箭头.png",
            "./images/record_normal.png",
            "./images/sing.gif",
        ]);
    imgdownload.load();
}
})