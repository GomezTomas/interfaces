let scrollTop = true;

window.onscroll = function () {
    stickyFunction();
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
