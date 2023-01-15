function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("gsapImageRevealLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("gsapImageRevealRight")) {
        x = 100;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}

// "load" 網頁「所有」資源都已經載入完成後才會觸發
// "DOMContentLoaded" document被完整的讀取跟解析後觸發，不須等待外部資源讀取完成
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gsapImageReveal").forEach(function (elem) {
        hide(elem);

        ScrollTrigger.create({
            trigger: elem,
            // markers: true,
            onEnter: function () { animateFrom(elem) },
            onEnterBack: function () { animateFrom(elem, -1) },
            onLeave: function () { hide(elem) }
        });
    });
});

// https://codepen.io/GreenSock/pen/pojzxwZ