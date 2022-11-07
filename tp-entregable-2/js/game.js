let juegoActivo = false;

let play = document.getElementById("playGame").addEventListener("click", () => {
    setTimeout(() =>{
        let loading = document.getElementById("loading");
        loading.classList.toggle("active");
    }, 1500);
    let loader = document.getElementById("loader");
    let porcentaje = document.getElementById("porcentaje");
    let playGame = document.getElementById("play-game");
    setTimeout(() =>{
        loader.classList.toggle("active");
        porcentaje.classList.toggle("active");
        playGame.classList.toggle("desactive");
        let number = 0;
        let interval = setInterval(() => {
            porcentaje.innerHTML = `${number}%`;
            number++;
            if(number > 100){
                loader.classList.toggle("active");
                porcentaje.classList.toggle("active");
                let gameIntro = document.getElementById("gameIntro");
                gameIntro.classList.toggle("active");
                setTimeout(() => {
                    loading.classList.toggle("active");
                    let pressKey = document.getElementById("pressKey");
                    pressKey.classList.toggle("active");
                    juegoActivo = true;
                }, 5000);
                clearInterval(interval);
            }
        }, 150);
    }, 2000);

});



window.addEventListener("keypress", () => {

    if(juegoActivo === true){
        setTimeout(() => {
            let gameIntro = document.getElementById("gameIntro");
            gameIntro.classList.toggle("active");
            let pressKey = document.getElementById("pressKey");
            pressKey.classList.toggle("active");
        }, 200);

        let canvas = document.getElementById("myCanvas");
        canvas.classList.toggle("active");
        /** @type {CanvasRenderingContext2D} */
        let ctx = canvas.getContext("2d");
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        let img = new Image();
        img.src = '/tp-entregable-2/assets/img/canchaFutbol.png';
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }

        let menuGame = document.getElementById("menuGame");
        menuGame.classList.toggle("active");
        let buttonCanvas = document.getElementById("buttonCanvas");
        buttonCanvas.classList.toggle("active");
        let imgMenuUno = document.getElementById("imgMenuUno")
        imgMenuUno.classList.toggle("active");
        let imgMenuDos = document.getElementById("imgMenuDos")
        imgMenuDos.classList.toggle("active");
        let buttonJugar = document.getElementById("jugarMenu");
        buttonJugar.addEventListener("mouseenter", () => {
            document.getElementById("img-uno").src = "/tp-entregable-2/assets/img/riverMenu.png";
            document.getElementById("img-dos").src = "/tp-entregable-2/assets/img/bocaMenu.png";
        });
        let buttonComoJugar = document.getElementById("comoJugarMenu");
        buttonComoJugar.addEventListener("mouseenter", () => {
            document.getElementById("img-uno").src = "/tp-entregable-2/assets/img/signoPreguntaMenu.png";
            document.getElementById("img-dos").src = "/tp-entregable-2/assets/img/teclasMenu.png";
        });

        buttonJugar.addEventListener("click", () => {
            let jugarOpciones = document.getElementById("jugarOpciones");
            jugarOpciones.classList.toggle("active");
            buttonCanvas.classList.toggle("active");
            imgMenuUno.classList.toggle("active");
            imgMenuDos.classList.toggle("active");
        });

        buttonComoJugar.addEventListener("click", () => {
            let comoJugar = document.getElementById("comoJugar");
            comoJugar.classList.toggle("active")
            buttonCanvas.classList.toggle("active");
            imgMenuUno.classList.toggle("active");
            imgMenuDos.classList.toggle("active");
        })

        let volver = document.getElementById("volver")
        volver.addEventListener("click", () => {
            let jugarOpciones = document.getElementById("jugarOpciones");
            jugarOpciones.classList.toggle("active");
            buttonCanvas.classList.toggle("active");
            imgMenuUno.classList.toggle("active");
            imgMenuDos.classList.toggle("active");
        });

        let menuHelp = document.getElementById("menuHelp");
            menuHelp.addEventListener("click", () => {
            comoJugar.classList.toggle("active")
            buttonCanvas.classList.toggle("active");
            imgMenuUno.classList.toggle("active");
            imgMenuDos.classList.toggle("active");
        });
    }
});