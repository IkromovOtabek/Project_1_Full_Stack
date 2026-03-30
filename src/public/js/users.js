document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".glass-card");
  const spherePaths = document.querySelectorAll(".sphere-svg path");

  // 1. Sichqonchaga qarab jadvalni egish (Tilt Effect)
  document.addEventListener("mousemove", (e) => {
    // const x = (window.innerWidth / 2 - e.clientX) / 25;
    // const y = (window.innerHeight / 2 - e.clientY) / 25;

    if (board) {
      board.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
  });

  // 2. Sfera animatsiyasi
  anime({
    targets: spherePaths,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutQuart",
    duration: 3000,
    delay: anime.stagger(50),
    direction: 'alternate',
    loop: true
  });

  anime({
    targets: ".sphere-wrapper",
    rotateZ: 360,
    duration: 20000,
    easing: "linear",
    loop: true
  });

  // 3. Jadval qatorlari paydo bo'lishi
  anime({
    targets: "tr",
    opacity: [0, 1],
    translateX: [-50, 0],
    delay: anime.stagger(100),
    easing: "easeOutExpo"
  });
});

console.log("Users frontend javascript file");

$(function() {
    $(".user-status").on("change", function(e) {
        const id = e.target.id;
        // console.log("id:", id);

        const userStatus = $(`#${id}.user-status`).val();
        // console.log("userStatus", userStatus);

        // axious updateChosenUser

        axios.post("/admin/user/edit", {
            _id: id,
            userStatus: userStatus,
        }).then(response => {
            // console.log("response", response);
            const result = response.data;
            // console.log("result", result);

            if(result.data) {
                console.log("user updated");
                $(".user-status").blur();
            } else alert("User update failed");


        }).catch(err => {
            console.log(err);
            alert("user uptade failed");
        });


    });
});