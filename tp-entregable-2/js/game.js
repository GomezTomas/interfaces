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



window.addEventListener("keypress", playActive);

function playActive() {
    if(juegoActivo === true){
        setTimeout(() => {
            let gameIntro = document.getElementById("gameIntro");
            gameIntro.classList.toggle("active");
            let pressKey = document.getElementById("pressKey");
            pressKey.classList.toggle("active");
            window.removeEventListener("keypress", playActive);
        }, 200);

        let gameMenu = document.getElementById("game-menu");
        let fichasEleccion = document.getElementById("fichasEleccion");
        let instrucciones = document.getElementById("instrucciones");
        fichasEleccion.classList.toggle("desactive");
        instrucciones.classList.toggle("desactive");
        gameMenu.classList.toggle("active");

        

        let buttonMode5 = document.getElementById("mode5");
        let buttonMode4 = document.getElementById("mode4");
        let buttonMode3 = document.getElementById("mode3");
        let help = document.getElementById("help");
        let back = document.getElementById("back");
        let closeHelp = document.getElementById("closeHelp");

        buttonMode5.addEventListener("click", () => {
            let mode = 5;
            elegirEscudos(mode);
        });
        buttonMode4.addEventListener("click", () => {
            let mode = 4;
            elegirEscudos(mode);
        });
        buttonMode3.addEventListener("click", () => {
            let mode = 3;
            elegirEscudos(mode);
        });

        help.addEventListener("click", () => {
            toggle2(buttonsGame, instrucciones);
        })

        back.addEventListener("click", () => {
            toggle2(buttonsGame, fichasEleccion);
        });

        closeHelp.addEventListener("click", () => {
            toggle2(buttonsGame, instrucciones);
        })


        function elegirEscudos(mode) {
            let buttonsGame = document.getElementById("buttonsGame");
            toggle2(buttonsGame, fichasEleccion);

            let buttonopcionA = document.getElementById("buttonOpcionA");
            let buttonopcionB = document.getElementById("buttonOpcionB");

            buttonopcionA.addEventListener("click", () => {
                let imgFichaRiver = "/tp-entregable-2/assets/img/riverFicha.png";
                let imgFichaBoca = "/tp-entregable-2/assets/img/fichaBoca.png";

                play(imgFichaRiver, imgFichaBoca, mode);
            });

            buttonopcionB.addEventListener("click", () => {
                let imgFichaRiver = "/tp-entregable-2/assets/img/fichaRiver2.png";
                let imgFichaBoca = "/tp-entregable-2/assets/img/fichaBoca2.png.png";

                play(imgFichaRiver, imgFichaBoca, mode);
            });
        }

        function toggle2(toggle1, toggle2) {
            toggle1.classList.toggle("desactive");
            toggle2.classList.toggle("desactive");
        }

        function play(fichaRiver, fichaBoca, mode) {

            let canvas = document.getElementById("myCanvas");
            canvas.classList.toggle("active");
            fichasEleccion.classList.toggle("desactive");
            gameMenu.classList.toggle("active");

            /** @type {CanvasRenderingContext2D} */
            let ctx = canvas.getContext("2d");
            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;
            let lastClickedFigure = null;
            let isMouseDown = false;
            let fichasEnPartida = [];
            let columnas = mode*2;
            let filas = mode*2;
            let matriz = [];
            let cronometroJugador = 0;
            let cronometroPartida = 0;

            let inicioY = 0;
            let finY = 67;

            for (let x = 0; x < filas; x++) {
                let fila = [];
                let inicioX = 150;
                let finX = 150 + 105.3;
                for (let y = 0; y < columnas; y++) {
                    casillero = new Casillero(ctx, inicioX, finX, inicioY, finY);
                    fila.push(casillero);
                    inicioX = inicioX + 105.3;
                    finX = finX + 105.3;
                }
                matriz.push(fila);
                inicioY = inicioY + 67;
                finY = finY + 67;
            }

            console.log(matriz);

            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    matriz[i][j].draw();
                }
            }

            let local = true;

            tiempoDePartida();

            timepoDelJugador();

            function timepoDelJugador() {
                    setInterval(() => {
                    if(cronometroPartida < 5){
                        if(cronometroJugador < 15){
                            if(cronometroJugador == 0 && local === true){
                                local = false;
                                let color = 'red';
                                let x = 75;
                                let imgFicha = fichaRiver;
                                drawFicha("River", x, color, imgFicha);   
                            }else if (cronometroJugador == 0 && local === false){
                                local = true;
                                let color = 'blue';
                                let x = 1278;
                                let imgFicha = fichaBoca;
                                drawFicha("Boca", x, color, imgFicha); 
                            }
                            cronometroJugador++;
                        }else{
                            fichasEnPartida.pop();
                            cronometroJugador = 0;
                        }

                        
                    }
                }, 1000);
            }

            function tiempoDePartida() {
                let tiempoPartida = setInterval(() => {
                    if(cronometroPartida < 5){
                        cronometroPartida = cronometroPartida + 1;
                        console.log(cronometroPartida);
                        if(cronometroPartida == 5) {
                            console.log(cronometroPartida);
                        }
                    }else{
                        clearInterval(tiempoPartida);
                    }
                }, 60000);

            }

            function drawFicha(name, x, color, img){
                ficha = new Circle(name, x, 335, 25, color ,ctx, img);
                fichasEnPartida.push(ficha);
                actualizar();
            }

            function actualizar() {
                clearCanvas();
                for (let i = 0; i < fichasEnPartida.length; i++) {
                    fichasEnPartida[i].draw();
                }
            }

            function clearCanvas() {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                for (let i = 0; i < matriz.length; i++) {
                    for (let j = 0; j < matriz[i].length; j++) {
                        matriz[i][j].draw();
                        matriz[i][j].drawObj();
                    }
                }
            }

            canvas.addEventListener("mousedown", onMouseDown, false);

            function onMouseDown(e) {
                isMouseDown = true;

                if(lastClickedFigure != null) {
                    lastClickedFigure = null;
                }

                let clickFig = findClickedFigure(e.layerX, e.layerY);
                if(clickFig != null) {
                    lastClickedFigure = clickFig;
                }
                actualizar();
            }

            function findClickedFigure(x, y) {
                for (let i = 0; i < fichasEnPartida.length; i++) {
                    const element = fichasEnPartida[i];
                    if(element.isPointInside(x, y)) {
                        return element;
                    }
                }
            }

            canvas.addEventListener("mousemove", onMouseMove, false);

            function onMouseMove(e) {
                if(isMouseDown && lastClickedFigure != null){
                    lastClickedFigure.setPosition(e.layerX, e.layerY);
                    actualizar();
                }
            }

            canvas.addEventListener("mouseup", onMouseUp, false);

            function onMouseUp (e) {
                isMouseDown = false;
                
                for (let i = 0; i < matriz.length; i++) {
                    for (let j = 0; j < matriz[i].length; j++) {
                        if(lastClickedFigure != null) {
                        if(((lastClickedFigure.getPosX() > matriz[i][j].getInicioX()) && (lastClickedFigure.getPosX() < matriz[i][j].getFinX()))
                        && ((lastClickedFigure.getPosY() > matriz[i][j].getInicioY()) && (lastClickedFigure.getPosY() < matriz[i][j].getFinY()))) {
                            matriz[i][j].setOcupado(lastClickedFigure);
                            matriz[i][j].drawObj();
                            
                            setTimeout(() => {
                                lastClickedFigure == null;
                                fichasEnPartida.pop();
                                actualizar();
                            }, 100);

                            busquedaLinea();
                        }
                        }
                    }
                }
            }

            function busquedaLinea() {
                let encontrado = false;

                if(encontrado === false) {
                    encontrado = busquedaPorFila();
                }

                if(encontrado === false) {
                    encontrado = busquedaPorColumna();
                }

                if(encontrado === false) {
                    encontrado = busquedaPorDiagonalIzquierda();
                }

                if(encontrado === false) {
                    encontrado = busquedaPorDiagonalDerecha();
                }


                if(encontrado === true) {
                    cronometroPartida = 5;
                    console.log(cronometroPartida);
                }else{
                    cronometroJugador = 0;
                }
                
            }

            function busquedaPorFila() {
                let contador = 0;
                let aux = "";

                for (let i = 0; i < matriz.length; i++) {
                    for (let j = 0; j < matriz[i].length; j++) {
                        if(contador < mode){
                            if(matriz[i][j].getObj() != null) {
                                if(contador == 0) {
                                    aux = matriz[i][j].getObj().getName();
                                    contador++;
                                }else if(contador > 0) {
                                    if(matriz[i][j].getObj().getName() == aux) {
                                        contador++;
                                    }else {
                                        contador = 1;
                                        aux = matriz[i][j].getObj().getName();
                                    }
                                }
                            }else {
                                if(matriz[i][j].getObj() == null) {
                                    contador = 0;
                                    aux = "";
                                }
                            }
                        }else {
                            return true;
                        }
                    }
                    if(contador == mode) {
                        return true;
                    }else{
                        contador = 0;
                        axu = "";
                    }
                    
                }
                return false;
            }

            function busquedaPorColumna() {
                let contador = 0;
                let aux = "";

                let columna = 0;
                let fila = 0;

                while(columna < mode*2) {
                    while(fila < mode*2) {
                        if(contador < mode) {
                            if(matriz[fila][columna].getObj() != null) {
                                if(contador == 0) {
                                    aux = matriz[fila][columna].getObj().getName();
                                    contador++;
                                }else if(contador > 0) {
                                    if(matriz[fila][columna].getObj().getName() == aux){
                                        contador++;
                                    }else {
                                        aux = matriz[fila][columna].getObj().getName();
                                        contador = 1;
                                    }
                                }
                            }else if(matriz[fila][columna].getObj() == null) {
                                aux = "";
                                contador = 0;
                            }
                        }else {
                            return true;
                        }
                        fila++;
                    }
                    if(contador == mode) {
                        return true;
                    }else{
                        columna++;
                        fila = 0;
                        contador = 0;
                        axu = "";
                    }
                }
                return false;
            }

            function busquedaPorDiagonalIzquierda() {
                let contador = 0;
                let aux = "";
                let busqueda = false;

                for (let i = 0; i < matriz.length; i++) {
                    for (let j = 0; j < matriz[i].length; j++) {
                        if(matriz[i][j].getObj() != null) {
                            contador = 1;
                            aux = matriz[i][j].getObj().getName();
                            busqueda = true;
                            let x = j;
                            let y = i;
                            while(busqueda === true) {
                                if(contador < mode) {
                                    x++;
                                    y++;
                                    if(x < columnas && y < filas) {
                                        if(matriz[y][x].getObj() != null) {
                                            if(matriz[y][x].getObj().getName() == aux) {
                                                contador++;
                                            }else {
                                                busqueda = false;
                                            }
                                        }else if(matriz[y][x].getObj() == null) {
                                            busqueda = false;
                                        }
                                    }else{
                                        return false;
                                    }
                                }else if(contador == mode) {
                                    busqueda = false;
                                    return true;
                                }
                            }
                        }
                    }
                    if(contador == mode) {
                        return true;
                    }
                }
                return false;
            }

            function busquedaPorDiagonalDerecha() {
                let contador = 0;
                let aux = "";
                let busqueda = false;

                for (let i = 0; i < matriz.length; i++) {
                    for (let j = columnas-1; j >= 0; j--) {
                        if(matriz[i][j].getObj() != null) {
                            contador = 1;
                            aux = matriz[i][j].getObj().getName();
                            busqueda = true;
                            let x = j;
                            let y = i;
                            while(busqueda === true) {
                                if(contador < mode) {
                                    x--;
                                    y++;
                                    if(x >= 0 && y < filas) {
                                        if(matriz[y][x].getObj() != null) {
                                            if(matriz[y][x].getObj().getName() == aux) {
                                                contador++;
                                            }else {
                                                busqueda = false;
                                            }
                                        }else if(matriz[y][x].getObj() == null) {
                                            busqueda = false;
                                        }
                                    }else{
                                        return false;
                                    }
                                }else if(contador == mode) {
                                    busqueda = false;
                                    return true;
                                }
                            }
                        }
                    }
                    if(contador == mode) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
}