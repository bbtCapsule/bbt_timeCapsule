$(function(){
    var nowpage=window.location.pathname.match(/(\w+.html)$/) [0];
    $("img").click(function(event){
        event.preventDefault();
        return false;
    })
    function onepic(){
        var backgroundownload = new createjs.LoadQueue(true);
        backgroundownload.loadManifest([
            "imgages/map.png",
            "imgages/letter/1.png",
            "imgages/letter/2.png",
            "imgages/letter/3.png",
            "imgages/letter/4.png",
            "imgages/letter/41.png",
        ]);
        backgroundownload.load();
    }
    function allload(){
        var imgdownload = new createjs.LoadQueue(true);
        function handleComplete(){
            //加载完成
        }
        // imgdownload.on("fileload", handleFileLoad, this);
        imgdownload.on("complete", handleComplete, this);
        imgdownload.loadManifest([
            // "css/index.css",
            "imgages/map.png",
        ]);
    imgdownload.load();
}
function loading(){
    var imgdownload = new createjs.LoadQueue(true);
    function handleComplete(){
        console.log("completed");
        complete();
        anime(1);
    }
    imgdownload.on("complete", handleComplete, this);
    imgdownload.loadManifest([
]);
imgdownload.load();
}
})