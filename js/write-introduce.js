

var next = document.getElementById('next');
next.addEventListener('click', function () {
    let page1 = document.getElementsByClassName('page1');
    let page2 = document.getElementsByClassName('page2');
    page1[0].style.display = 'none';
    page2[0].style.display = 'block';

})
var back = document.getElementById('back');
back.addEventListener('click', function () {
    let page1 = document.getElementsByClassName('page1');
    let page2 = document.getElementsByClassName('page2');
    page1[0].style.display = 'block';
    page2[0].style.display = 'none';
})


var nextPage = document.getElementById('nextPage');
nextPage.addEventListener('click', function () {
    var sender = getRadio(document.getElementsByName('sender'));
    var year = getRadio(document.getElementsByName('year'));
    sessionStorage.setItem('capsule_type', sender);
    sessionStorage.setItem('time_limit', year);
    if (sender === null) {
        console.log(null);
    } else if (sender == 2) {
        console.log(sender);
        window.location.href = 'write-TA.html';
    } else  {
        console.log(sender);

        window.location.href = 'write-one.html';

    }

})