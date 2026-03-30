$(function () {
    // 1. Smartphone/Laptop Memory toggle
    $(".product-collection").on("change", function () {
        const selectedValue = $(this).val();
        if (selectedValue === "SMARTPHONE" || selectedValue === "LAPTOP") {
            $("#product-memory").slideDown(300);
        } else {
            $("#product-memory").slideUp(300);
        }
    });

    // 2. Open Form
    $("#process-btn").on("click", function () {
        $(".dish-container").slideToggle(500);
        $(this).hide();
    });

    // 3. Close Form
    $("#cancel-btn").on("click", function () {
        $(".dish-container").slideToggle(100);
        $("#process-btn").css("display", "flex");
    });

    // 4. Status Update (Axios)
    $(".new-product-status").on("change", async function (e) {
        const id = e.target.id;
        const productStatus = $(this).val();
        try {
            const response = await axios.post(`/admin/product/${id}`, { productStatus: productStatus });
            if (response.data.data) $(this).blur();
            else alert("Status update failed!");
        } catch (err) {
            alert("Update failed!");
        }
    });
});

// 5. Description Toggle Mantiqi
function toggleDesc(element) {
    const wrapper = element.querySelector('.desc-wrapper');
    const fullText = element.getAttribute('data-full');
    const shortText = element.getAttribute('data-short');

    // Boshqalarni yopish
    document.querySelectorAll('.desc-cell').forEach(cell => {
        if (cell !== element && cell.classList.contains('expanded')) {
            cell.classList.remove('expanded');
            cell.querySelector('.desc-wrapper').innerText = cell.getAttribute('data-short');
        }
    });

    if (element.classList.contains('expanded')) {
        wrapper.innerText = shortText;
        element.classList.remove('expanded');
    } else {
        wrapper.innerText = fullText;
        element.classList.add('expanded');
    }
}

// 6. Validate Form
function validateForm() {
    if ($(".product-name").val() === "" || $(".product-price").val() === "" || $(".product-left-count").val() === "") {
        alert("Please fill all required fields!");
        return false;
    }else return true;
}

// 7. Image Preview
function previewFileHandler(input, order) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => { $(`#image-section-${order}`).attr("src", reader.result); };
        reader.readAsDataURL(file);
    }
}

// 8. Animations
document.addEventListener("DOMContentLoaded", () => {
    anime({ targets: ".sphere-svg path", strokeDashoffset: [anime.setDashoffset, 0], duration: 3500, loop: true, direction: 'alternate', easing: 'easeInOutQuart' });
    anime({ targets: "tbody tr", opacity: [0, 1], translateY: [30, 0], delay: anime.stagger(60), easing: "easeOutExpo" });
});