document.addEventListener("DOMContentLoaded", () => {
  const loginCard = document.querySelector(".glass-login-container");
  const spherePaths = document.querySelectorAll(".sphere-svg path");

  // 1. Sfera chizish animatsiyasi
  anime({
    targets: spherePaths,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 3000,
    delay: (el, i) => i * 30,
    direction: 'alternate',
    loop: true
  });

  // 2. Sfera 3D aylanishi
  anime({
    targets: ".sphere-wrapper",
    rotateZ: 360,
    duration: 25000,
    easing: "linear",
    loop: true
  });

  // 3. Sichqonchaga qarab 3D Tilt effekti
  document.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
    const yAxis = (window.innerHeight / 2 - e.clientY) / 25;

    if (loginCard) {
      loginCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
  });

  // 4. Kirishda formaning sekin chiqishi
  anime({
    targets: ".glass-login-container",
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: 1500,
    easing: "easeOutExpo"
  });
});