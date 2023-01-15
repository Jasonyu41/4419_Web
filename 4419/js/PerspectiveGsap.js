// const elem = document.getElementById("temp");
// var perspectivePx = 0;
// var rotateXPx = 45;
// elem.style.transform = "perspective(" + perspectivePx + "px) rotateX(" + rotateXPx + "deg)";
// function textMove() {
//     perspectivePx = (window.scrollY + window.innerHeight / 2) - elem.offsetTop;
//     if ((window.scrollY + window.innerHeight / 2) > elem.offsetTop) {
//         elem.style.transform = "perspective(" + perspectivePx + "px) rotateX(" + rotateXPx + "deg)";
//     }else {
//         elem.style.transform = "perspective(0px) rotateX(45deg)";
//     }
//     if(perspectivePx >= 500 && rotateXPx >= 0)
//     {
//         rotateXPx = 45 - (perspectivePx - 500)
//         elem.style.transform = "perspective(500px) rotateX(" + rotateXPx + "deg)"
//     }
// }
// window.addEventListener('scroll', e => textMove(), true);

gsap.to("#productText2", {
    scale: 1,
    scrollTrigger: {
        trigger: "#productText2",
        start: "-300px 50%",
        end: "200px 50%",
        scrub: true,
        // markers: true
    }
});
gsap.to("#productText2", {
    y: 300,
    rotationX: 0,
    scrollTrigger: {
        trigger: "#productText2",
        start: "200px 50%",
        end: "600px 50%",
        scrub: true,
        // markers: true
    }
});