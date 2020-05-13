
var nextPage = document.getElementById('nextPage');
nextPage.addEventListener('click', function () {
    var nickname = document.getElementById('nickname');
    var phone =document.getElementById('phone');
    var birth =document.getElementById('birth');
    sessionStorage.setItem('content_name', nickname);
    sessionStorage.setItem('content_phone', phone);
    sessionStorage.setItem('content_birth', birth);
    if (nickname === null) {
        console.log(null);
    } else if (sender == 2) {
        console.log(sender);
        window.location.href = 'write-TA.html';
    } else  {
        console.log(sender);
        window.location.href = 'write-one.html';
    }
})