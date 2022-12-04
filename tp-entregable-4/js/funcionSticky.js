let scrollTop = true;

let sliderAnimation = document.querySelector(".slider");
let animationActive = false;
let inicio = false;

window.onscroll = function () {
    stickyFunction();
    let y = window.scrollY;
    teamAnimation(y);
}

sliderAnimation.classList.toggle("positionSlider");

function teamAnimation(y) {
    if(y < 800 && animationActive === true) {
        animationActive = false;
        if(inicio === true) {
            sliderAnimation.classList.toggle("carruselMove");
            sliderAnimation.classList.toggle("positionSlider");
        }
    }else if(y > 800 && animationActive === false) {
        animationActive = true;
        sliderAnimation.classList.toggle("positionSlider");
        sliderAnimation.classList.toggle("carruselMove");
        inicio = true;
    }
}

let header = document.querySelector(".containerHeader");
let header1 = document.querySelector(".header-1");
let logo = document.querySelector(".logo");
let search = document.querySelector(".search");
let sticky = header.offsetTop;

function stickyFunction() {
    if(sticky != window.pageYOffset && scrollTop === true){
        header.classList.toggle("sticky");
        header1.classList.toggle("sticky");
        logo.classList.toggle("sticky");
        search.classList.toggle("sticky");
        scrollTop = false;
    }else if(sticky == window.pageYOffset && scrollTop === false){
        header.classList.toggle("sticky");
        header1.classList.toggle("sticky");
        logo.classList.toggle("sticky");
        search.classList.toggle("sticky");
        scrollTop = true;
    }
}
