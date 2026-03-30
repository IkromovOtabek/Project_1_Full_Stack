document.addEventListener("DOMContentLoaded", () => {
  // 2. SFERA CHIZILISHI (Neon Drawing)
  const spherePaths = document.querySelectorAll(".sphere path");
  if (spherePaths.length > 0) {
    anime({
      targets: spherePaths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 3000,
      delay: (el, i) => i * 30,
      direction: 'alternate',
      loop: true
    });

    // Sferani doimiy aylantirish
    anime({
      targets: ".sphere",
      rotateZ: [0, 360],
      duration: 30000,
      easing: "linear",
      loop: true
    });
  }

  // 3. SICHQONCHA HARAKATI (Parallax)
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    
    anime({
      targets: ".animation-wrapper",
      translateX: x,
      translateY: y,
      easing: "easeOutQuad",
      duration: 1000
    });
  });
});

console.log("SignalShop Home Frontend Loaded.");