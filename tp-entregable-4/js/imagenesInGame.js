let imagenes = ["assets/img/gameImg-1.png", "assets/img/gameImg-2.png", "assets/img/gameImg-3.png", "assets/img/gameImg-4.png", "assets/img/gameImg-5.png"]

let btnIzquierda = document.getElementById("izquierda");

let btnDerecha = document.getElementById("derecha");

btnIzquierda.addEventListener("click", switchImageLeft);

btnDerecha.addEventListener("click", switchImageRight);

let img1 = document.querySelector(".imgGame-1");
img1.src = imagenes[0];

let img2 = document.querySelector(".imgGame-2");
img2.src = imagenes[1];

let aux1 = imagenes[0];
let aux2 = imagenes[1];

function switchImageRight() {
    if(aux1 === imagenes[0] && aux2 === imagenes[1]){
        img1.classList.toggle("opacityImgGameRight");
        img1.src = imagenes[1];
        aux1 = imagenes[1];
        img2.classList.toggle("opacityImgGameRight");
        img2.src = imagenes[2];
        aux2 = imagenes[2];
        setTimeout(() => {
            img1.classList.toggle("opacityImgGameRight");
            img2.classList.toggle("opacityImgGameRight");
        },500);
    }else if(aux1 === imagenes[1] && aux2 === imagenes[2]){
        img1.classList.toggle("opacityImgGameRight");
        img1.src = imagenes[2];
        aux1 = imagenes[2]
        img2.classList.toggle("opacityImgGameRight");
        img2.src = imagenes[3];
        aux2 = imagenes[3];
        setTimeout(() => {
            img1.classList.toggle("opacityImgGameRight");
            img2.classList.toggle("opacityImgGameRight");
        },500);
    }else if(aux1 === imagenes[2] && aux2 === imagenes[3]){
        img1.classList.toggle("opacityImgGameRight");
        img1.src = imagenes[3];
        aux1 = imagenes[3];
        img2.classList.toggle("opacityImgGameRight");
        img2.src = imagenes[4];
        aux2 = imagenes[4];
        setTimeout(() => {
            img1.classList.toggle("opacityImgGameRight");
            img2.classList.toggle("opacityImgGameRight");
        },500);
    }
}

function switchImageLeft() {
    if(aux1 === imagenes[3] && aux2 === imagenes[4]){
        img1.classList.toggle("opacityImgGameLeft");
        img1.src = imagenes[2];
        aux1 = imagenes[2];
        img2.classList.toggle("opacityImgGameLeft");
        img2.src = imagenes[3];
        aux2 = imagenes[3];
        setTimeout(() => {
            img1.classList.toggle("opacityImgGameLeft");
            img2.classList.toggle("opacityImgGameLeft");
        },500);
    }else if(aux1 === imagenes[2] && aux2 === imagenes[3]){
        img1.classList.toggle("opacityImgGameLeft");
        img1.src = imagenes[1];
        aux1 = imagenes[1];
        img2.classList.toggle("opacityImgGameLeft");
        img2.src = imagenes[2];
        aux2 = imagenes[2];
        setTimeout(() => {
            img1.classList.toggle("opacityImgGameLeft");
            img2.classList.toggle("opacityImgGameLeft");
        },500);
    }else if(aux1 === imagenes[1] && aux2 === imagenes[2]){
        img1.classList.toggle("opacityImgGameLeft");
        img1.src = imagenes[0];
        aux1 = imagenes[0];
        img2.classList.toggle("opacityImgGameLeft");
        img2.src = imagenes[1];
        aux2 = imagenes[1];
        setTimeout(() => {
            img1.classList.toggle("opacityImgGameLeft");
            img2.classList.toggle("opacityImgGameLeft");
        },500);
    }
}