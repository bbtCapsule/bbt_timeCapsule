fetch(apiurl + "getQRCode", {
  method: "get",
  credentials: "include",
  mode: "cors",
})
  .then(checkStatus)
  .then((res) => res.json())
  .then((res) => {
    if (res.errcode == 0) {
      document.getElementById("QR").src = res.image;
      $("#loading").fadeOut(800);
      clearInterval(timer);
    }
  })
  .catch((err) => {
    if (err.res.status == 404) {
      attention("请先填写个人信息");
      setTimeout(() => {
        window.location.href = "main.html";
      }, 1000);
    }
  });
