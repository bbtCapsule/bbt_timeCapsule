    function postMes(url, data, RESPONSE) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/json');
        xmlhttp.send(JSON.stringify(data));
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response = xmlhttp.responseText;
                RESPONSE = JSON.parse(response);
                // var errcode = RESPONSE['errcode'];
                // var errmsg = RESPONSE['errmsg'];
                // if (errcode == 0) {                           //0
                //     window.location.href = './index.html';
                // } else {                                      //1
                //     document.getElementById('uWarn').innerHTML = errmsg;
                //     document.getElementById('uWarn').style.color = 'red';
                // }
            }
            // else {
            //     // document.getElementById('uWarn').innerHTML = errmsg;
            //     // document.getElementById('uWarn').style.color = 'red';
            // }
        }
    }