console.log("Signup frontend javascript file");
$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;


  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0],
        fileType = uploadFile["type"],
        validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg and png");
      } else {
        if (uploadFile) {

          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame").attr("src", URL.createObjectURL(uploadFile)).addClass("success");
        }
        filename = $(this)[0].files[0].name;

      }
      $(this).siblings(".upload-name").val(filename);
    }
  })
});



function validateSignupForm() {
  const userNick = $(".user-nick").val(),
    userPhone = $(".user-phone").val(),
    userPassword = $(".user-password").val(),
    confirmPassword = $(".confirm-password").val();

  if (
    userNick === "" ||
    userPhone === "" ||
    userPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }


  if (userPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false;
  }


  const userImage = $(".user-image").get(0).files[0] ? $(".user-image").get(0).files[0].name : null;

  if (!userImage) {
    alert("Please insert restaurant image");
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const formCard = document.querySelector(".glass-form-container");
  const spherePaths = document.querySelectorAll(".sphere-svg path");

  // 1. Sferani chizish animatsiyasi
  anime({
    targets: spherePaths,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 3000,
    delay: (el, i) => i * 30,
    direction: 'alternate',
    loop: true
  });

  // 2. Sferani 3D aylantirish
  anime({
    targets: ".sphere-wrapper",
    rotateZ: [0, 360],
    duration: 25000,
    easing: "linear",
    loop: true
  });

  // 3. Sichqoncha harakatiga qarab formani egish (Perspective Tilt)
  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
    const yAxis = (window.innerHeight / 2 - e.clientY) / 25;

    formCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // 4. Rasm yuklash preview mantiqi
  const fileInput = document.getElementById("input-file");
  const previewImg = document.getElementById("preview-target");
  const fileNameDisplay = document.getElementById("file-name-display");

  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      fileNameDisplay.innerText = file.name;
      reader.onload = (e) => previewImg.src = e.target.result;
      reader.readAsDataURL(file);
    }
  });
});