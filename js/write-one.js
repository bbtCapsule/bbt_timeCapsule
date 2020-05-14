wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //音频 开始------------------------------------------------------------
    // 音频本地ID
    var localId;
    // 音频服务器ID
    var serverId;
    // 录音时间设置
    var startTime, endTime, minTime = 3000;
    //录音 开始----------------------
    document.getElementById('voiceStart').addEventListener('touchstart', function () {
        startTime = new Date().getTime();
        // 开始录音
        wx.startRecord();
    })
    document.getElementById('voiceStart').addEventListener('touchend', function () {
        endTime = new Date().getTime();
        if (endTime - startTime < 3000) {
            localId = '';
            alert('录音时间小于' + minTime / 1000 + '秒，请重试');
        } else {
            // 停止录音
            wx.stopRecord({
                success: function (res) {
                    localId = res.localId;
                }
            });
        }
    })
    // 监听录音自动停止接口
    wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
            localId = res.localId;
        }
    });
    //录音 结束---------------------------
    // 语音播放 开始----------------------
    document.getElementById('voicePlay').addEventListener('click', function () {
        var ele = document.getElementById('voicePlay');
        ele.addEventListener('click', function () {
            if (ele.getAttribute('class') === 'voicePlay') {
                ele.removeAttribute('class', 'voicePlay');
                // 停止播放接口
                wx.stopVoice({
                    localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
                });
            } else {
                ele.setAttribute('class', 'voicePlay');
                // 播放语音接口
                wx.playVoice({
                    localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
            }
        })
    })
    // 监听语音播放完毕接口
    wx.onVoicePlayEnd({
        success: function (res) {
            document.getElementById('voicePlay').removeAttribute('class', 'voicePlay');
            localId = res.localId; // 返回音频的本地ID
        }
    });
    //语音播放 结束--------------------
    //上传音频 开始--------------
    document.getElementById('sendAll').addEventListener('click', function () {
        if (localId) {
            // 上传语音接口
            wx.uploadVoice({
                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    serverId = res.serverId; // 返回音频的服务器端ID
                }
            });
        }
    })
    // 音频 结束-----------------------------------

    //图片 开始------------------------------------
    //图片本地ID
    var localIds;
    // 图片服务器ID
    var serverIds;
    document.getElementById('images').addEventListener('click', function () {
        // 拍照或从手机相册中选图接口
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
        });
    })
    // 上传图片 开始--------------------
    document.getElementById('sendAll').addEventListener('click', function () {
        // 上传图片接口
        wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                serverIds = res.serverId; // 返回图片的服务器端ID
            }
        })
    });
    //上传图片 结束-----------------------



});


wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});