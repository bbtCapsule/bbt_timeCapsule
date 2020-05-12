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