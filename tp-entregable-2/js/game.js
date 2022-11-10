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

        let btn5EnLinea = document.getElementById("5_en_linea");
        btn5EnLinea.addEventListener("click", () => {
            jugarOpciones.classList.toggle("active");
            let img = new Image();
            img.src = '/tp-entregable-2/assets/img/Tablero_5_en_linea.png';
            img.onload = function() {
                ctx.drawImage(img, 150, 0);
            }
            mode5line(ctx, canvas, canvasWidth, canvasHeight);
        });

        let btn4EnLinea = document.getElementById("4_en_linea");
        btn4EnLinea.addEventListener("click", () => {
            jugarOpciones.classList.toggle("active");
            // mode4line(ctx);
        });

        let btn3EnLinea = document.getElementById("3_en_linea");
        btn3EnLinea.addEventListener("click", () => {
            jugarOpciones.classList.toggle("active");
            // mode3line(ctx);
        });

    }
});

function mode5line(ctx, canvas, canvasWidth, canvasHeight) {
let delta = new Object();
let X = canvasWidth/2;
let Y = canvasHeight/2;

let local = true;

if(local === true){
    let color = "#ffff";
    let fichaRiver = new Circle(75, 335, 25, color, ctx);
    fichaRiver.draw();

canvas.addEventListener("mousedown", function(evt) {
   
    let mousePos = oMousePos(canvas, evt);
    fichaRiver.draw();
    if(ctx.isPointInPath(mousePos.x, mousePos.y)){
        fichaRiver.setArrastrar(true);
        delta.x = X - mousePos.x;
        delta.y = Y - mousePos.y;
        }
    }, false);
        
canvas.addEventListener("mousemove", function(evt) {
    let mousePos = oMousePos(canvas, evt);

    if(fichaRiver.getArrastrar){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        X = mousePos.x + delta.x;
        Y = mousePos.y + delta.y;
        fichaRiver.draw();
        }
    }, false);
        
canvas.addEventListener("mouseup", function(evt) {
    fichaRiver.setArrastrar(false);
    }, false);
}

}

function oMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
        return {// devuelve un objeto
            x: Math.round(evt.clientX - rect.left),
            y: Math.round(evt.clientY - rect.top)
        };
}    