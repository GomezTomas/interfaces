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
        img.src = './assets/img/canchaFutbol.png';
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
            document.getElementById("img-uno").src = "./assets/img/riverMenu.png";
            document.getElementById("img-dos").src = "./assets/img/bocaMenu.png";
        });
        let buttonComoJugar = document.getElementById("comoJugarMenu");
        buttonComoJugar.addEventListener("mouseenter", () => {
            document.getElementById("img-uno").src = "./assets/img/signoPreguntaMenu.png";
            document.getElementById("img-dos").src = "./assets/img/teclasMenu.png";
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

        let figures = [];
        let lastClickedFigure = null;
        let isMouseDown = false;

        let btn5EnLinea = document.getElementById("5_en_linea");
        btn5EnLinea.addEventListener("click", () => {
            jugarOpciones.classList.toggle("active");
            let img = new Image();
            img.src = './assets/img/Tablero_5_en_linea.png';
            img.onload = function() {
                ctx.drawImage(img, 150, 0);
            }
            mode5line(ctx, figures, lastClickedFigure, isMouseDown);
            menuGame.remove();
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
        
        canvas.addEventListener( "mousedown", (e) => {
            console.log(e);
            m = getMousePos(e, canvas);
            let posX = m.x;
            let posY = m.y;
            let color = "#FFFFFF"
            let fichaBoca = new Circle(posX, posY, 25, color, ctx);
            figures.splice(1,1)

        })
    }
});

function getMousePos(e, canvas){
    let ClientRect = canvas.getBoundingClientRect();
    return {
        x: Math.round(e.clientX - ClientRect.left),
        y: Math.round(e.clientY - ClientRect.top)
    }
}

function mode5line(context, figures, lastClickedFigure, isMouseDown){
    
    let local = true;
    while(figures.length < 5){
        if(local === true){
            fichaRiver(context, figures, 30 * figures.length);
        }else{
            fichaBoca(context, figures, 30 * figures.length);
        }
        drawFigure(context, figures);
        if(local === true){
            local = false;
        }
        console.log(figures.length);
    }
}

function drawFigure(ctx, figures){
    for(let i = 0; i < figures.length; i++){
        figures[i].draw();
        console.log(figures[i]);
    }
}

function fichaRiver(ctx, figures){
    let posX = 75;
    let posY = 335;
    let color = "#ff0000"
    let fichaRiver = new Circle(posX, posY, 25, color, ctx);
    figures.push(fichaRiver);
}

function fichaBoca(ctx, figures, y){
    let posX = 1278;
    let posY = 335 - y;
    let color = "#0019FB"
    let fichaBoca = new Circle(posX, posY, 25, color, ctx);
    figures.push(fichaBoca);
}
