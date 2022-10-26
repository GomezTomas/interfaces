let sliderCategories = document.querySelector(".slider-categories");
let innerSliderCategories = document.querySelector(".slider-inner-categories");

let pressedCategories = false;
let startXcategories;
let xCategories;

sliderCategories.addEventListener("mousedown", function(e) {
    pressedCategories = true;
    startXcategories = e.offsetX - innerSliderCategories.offsetLeft;
    sliderCategories.style.cursor = 'grabbing';
});

sliderCategories.addEventListener("mouseenter", function() {
    sliderCategories.style.cursor = 'grab';
});

sliderCategories.addEventListener("mouseup", function() {
    sliderCategories.style.cursor = 'grab';
});

window.addEventListener("mouseup", function() {
    pressedCategories = false;
});

sliderCategories.addEventListener("mousemove", function(e) {
    if(!pressedCategories) return;
    e.preventDefault();

    xCategories = e.offsetX

    innerSliderCategories.style.left = `${xCategories - startXcategories}px`
    checkboundary();
})

function checkboundary(){
    let outerCategories = sliderCategories.getBoundingClientRect();
    let innerCategories = innerSliderCategories.getBoundingClientRect();

    console.log(outerCategories);
    console.log(innerCategories);

    if(parseInt(innerSliderCategories.style.left) > 0){
        innerSliderCategories.style.left = "0px";
    }else if(innerCategories.right < outerCategories.right){
        innerSliderCategories.style.left = `-${innerCategories.width - outerCategories.width}px`
    }
 }addgit commit -m 