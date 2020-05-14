// 第一步：用户同意授权，获取code
window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
'appid=' + APPID + '&'
'redirect_uri=' + REDIRECT_URI + '&'
'response_type=' + RESPONSE_TYPE + '&'
'scope=' + SCOPE + '&'
'state=' + STATE + '#wechat_redirect';

