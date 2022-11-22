let juegoActivo = false;

// Evento para el comienzo del juego, el cual abre un div con una animacion de loading y un porcentaje que se va a ir cargando.
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


// Le damos al windows un evento keyprees para inicializar el juego. El juego mostrara una imagen con el titulo con el aviso de apretar cualquier tecla abajo. 
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

        //En este evento tendra un menu con una imagen la cual se mantendra como fondo, mientras se intercalan los distintos elementos del html.
        //tendremos los botones del inicio los cuales vendran por defecto con el menu y luego los esconderemos.
        //Las fichas que podemos elegir para poder jugar cuando decidamos que modo queremos jugar.
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

        //Dependiendo al boton que apretemos eligiremos el modo a jugar, y este se mandara por parametro al juego. Ya que dependiendo de esto, se vera el tamaño del tablero, la cantidad de casilleros y el tamaño de la linea a completar.
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
        });


        function elegirEscudos(mode) {
            let buttonsGame = document.getElementById("buttonsGame");
            toggle2(buttonsGame, fichasEleccion);

            let buttonopcionA = document.getElementById("buttonOpcionA");
            let buttonopcionB = document.getElementById("buttonOpcionB");

            buttonopcionA.addEventListener("click", () => {
                let imgFichaRiver = "assets/img/riverFicha.png";
                let imgFichaBoca = "assets/img/fichaBoca.png";

                play(imgFichaRiver, imgFichaBoca, mode);
            });

            buttonopcionB.addEventListener("click", () => {
                let imgFichaRiver = "assets/img/fichaRiver2.png";
                let imgFichaBoca = "assets/img/fichaBoca.png";

                play(imgFichaRiver, imgFichaBoca, mode);
            });
        }

        function toggle2(toggle1, toggle2) {
            toggle1.classList.toggle("desactive");
            toggle2.classList.toggle("desactive");
        }
        //En esta funcion se iniciara el juego. El juego esta conformado por 4 objetos principales que son: Las fichas, Los casilleros(Conforman el tablero),El tablero, y El tiempo a jugar.
        //En esta funcion uniremos con logica los 4 objetos recien mencionados. 
        function play(fichaRiver, fichaBoca, mode) {

            let canvas = document.getElementById("myCanvas");
            canvas.classList.toggle("active");
            let timeGame = document.getElementById("timeGame");
            timeGame.classList.toggle("active");
            let timeTurn = document.getElementById("timeTurn");
            timeTurn.classList.toggle("active");
            let opcionInGame = document.getElementById("opcionInGame");
            opcionInGame.classList.toggle("active");
            fichasEleccion.classList.toggle("desactive");
            gameMenu.classList.toggle("active");
            //Utilizamos un array donde van a estar las fichas creadas, y una matriz la cual va a contener todos los casilleros. Esta matriz la utilizamos para crear el objeto Tablero.
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
            let local = true;
            let winner = document.getElementById("winner");
            let exitEnGame = document.getElementById("exitEndGame");

            //Le damos un evento al boton de reiniciar asi podemos limpiar y empezar la partida en cualquier momento.
            let reload = document.getElementById("reload");
            reload.addEventListener("click", () => {
                cronometroPartida = 0;
                cronometroJugador = 0;
                local = true;
                for (let i = 0; i < fichasEnPartida.length; i++) {
                    fichasEnPartida.pop();
                }
                for (let i = 0; i < matriz.length; i++) {
                    for (let j = 0; j < matriz[i].length; j++) {
                        matriz[i][j].deleteOcupado();
                    }
                }
                clearCanvas();
            });

            //Creamos el tablero de acuerdo al modo que hayamos elegido.
            function tableModeCreate() {

                if(mode == 5){
                    let inicioTable = 150;
                    createTablero(inicioTable);
                }else if(mode == 4){
                    let inicioTable = 255.3;
                    createTablero(inicioTable);
                }else if(mode == 3){
                    let inicioTable = 360.6;
                    createTablero(inicioTable);
                }

            }

            let inicioY = 0;
            let finY = 67;

            tableModeCreate();

            //Creamos el objeto Tablero.
            function createTablero(inicioTable) {
                table = new Tablero(matriz, ctx);

                table.create(inicioY, finY, inicioTable, filas, columnas);
            }

            console.log(table.getMatriz());

            //Dibujamos el Tablero.
            table.drawTable();

            //Seleccionamos del DOM el lugar que queremos para insertar cuanto tiempo nos queda de partida.
            let time = document.getElementById("time");
            time.classList.toggle("active");

            //Creamos los objetos Tiempo para la partida y los turnos.
            timepoPartida = new Tiempo(cronometroPartida, 5, 60000);
            timePlayer = new Tiempo(cronometroJugador, 15, 1000);

            //Si queremos salir del juego durante la partida dejamos este boton para salir y volver a iniciar el juego con otras opciones.
            //Se quiso no hacer un reload de la pagina pero se bugueaba con la informacion anterior por lo tanto no fue factible.
            let exit = document.getElementById("exit");
            exit.addEventListener("click", () => {
                location.reload();
            });

            //En esta funcion se crearan las fichas de acuerdo al turno que toque. Cada 15 segundos las fichas no utilizadas se borraran y creara una nueva del otro jugador.
            //La idea es que sean 15 segundos cada turno.
            timeTurnInterval();

            function timeTurnInterval() {

                timepoPartida.startCronometro();
                timePlayer.startCronometro();

                let turnInterval = setInterval(() => {
                    if(timepoPartida.getCronometro() < timepoPartida.getMax()){ 
                        console.log(timePlayer.getCronometro());         
                        if(timePlayer.getCronometro() == 1) {
                            if(local === true) {
                                infoFichaRiver();
                            }else {
                                infoFichaBoca();
                            }
                        }else if(timePlayer.getCronometro() == timePlayer.getMax()) {
                            fichasEnPartida.pop();
                            timePlayer.setCronometro();
                            actualizar();
                        }
                        timeGame.innerHTML = `Tiempo del turno: ${timePlayer.getCronometro()}`;
                        time.innerHTML = `A la partida le quedan: ${5 - timepoPartida.getCronometro()}`;
                    }else if(timepoPartida.getCronometro() == timepoPartida.getMax()){
                        timepoPartida.stopCronometro();
                        timePlayer.stopCronometro();
                        fichasEnPartida.pop();
                        time.innerHTML = `FIN DE LA PARTIDA`;
                        clearInterval(turnInterval);
                        actualizar();
                    }
                }, 1000);

            }

            //Creamos la ficha de river.
            function infoFichaRiver() {
                local = false;
                let color = 'red';
                let x = 75;
                let imgFicha = fichaRiver;
                drawFicha("River", x, color, imgFicha);
                timeTurn.innerHTML = `Turno de River`;
            }

            //Creamos la ficha de boca.
            function infoFichaBoca() {
                local = true;
                let color = 'blue';
                let x = 1278;
                let imgFicha = fichaBoca;
                drawFicha("Boca", x, color, imgFicha);
                timeTurn.innerHTML = `Turno de Boca`;
            }

            //Creo la ficha y la dibujo.
            function drawFicha(name, x, color, img){
                ficha = new Circle(name, x, 335, 25, color ,ctx, img);
                fichasEnPartida.push(ficha);
                actualizar();
            }
            //Actualizo el canvas.
            function actualizar() {
                clearCanvas();
                for (let i = 0; i < fichasEnPartida.length; i++) {
                    fichasEnPartida[i].draw();
                }
            }

            //Limpio el canvas y el tablero.
            function clearCanvas() {
                ctx.fillStyle = "green";
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                //Limpio el objeto Tablero.
                table.clearTable();
            }

            //Le agrego un evento al canvas, para cuando mantenga presionado el mouse, con el objetivo de tomar una ficha, saber cual es y su ubicacion.
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

            //Nos devuelve la ubicacion de la ficha.
            function findClickedFigure(x, y) {
                for (let i = 0; i < fichasEnPartida.length; i++) {
                    const element = fichasEnPartida[i];
                    if(element.isPointInside(x, y)) {
                        return element;
                    }
                }
            }

            //Acoplado a lo anterior mientras mantengo presionado el click voy a poder mover el mouse y con esto tambien a la ficha.
            //Cada vez que muevo la ficha su ubicacion en el canvas se actualizara.
            //Tambien actuzalizamos el canvas para que tenga un movimiento fluido y no lo pinte.
            canvas.addEventListener("mousemove", onMouseMove, false);

            function onMouseMove(e) {
                if(isMouseDown && lastClickedFigure != null){
                    //Seteamos la vieja posicion de la ficha por una nueva.
                    lastClickedFigure.setPosition(e.layerX, e.layerY);
                    actualizar();
                }
            }

            //Aca entra el factor mas imprtante para saber si termino la partida o no.
            //Al soltar el mouse se consultara si la ficha fue soltada en algun objeto Casillero. Si esto es asi el Casillero tomara la opcion de estar OCUPADO y se le pintara la ficha. Al instante de suceder eso la ficha que soltamos se eliminara del canvas.
            //Cuando se actualice el canvas y el tablero se buscara de las 4 maneras posibles si existe alguna linea que cumpla con el modo elegido.
            //Se busca de manera horizontal, vertical y diagonalX2.
            //Por un metodo del Tablero se recorrera su matriz con los objetos y se buscara la secuencia indicada de acuerdo al tipo de busqueda.
            canvas.addEventListener("mouseup", onMouseUp, false);

            function onMouseUp (e) {
                let aux = null;
                isMouseDown = false;
                
                for (let i = 0; i < matriz.length; i++) {
                    for (let j = 0; j < matriz[i].length; j++) {
                        if(lastClickedFigure != null) {
                        aux = lastClickedFigure;
                            //Se le consultara al Tablero si la ficha fue soltada sobre este y en cual casillero.
                            if(table.mouseUpTable(lastClickedFigure, i, j)) {
                                //Seteo el objeto de mi tablero y su ocupacion.
                                table.setOcupadoCasillero(lastClickedFigure, i, j);
                                //Dibujo el objeto que contiene el casillero.
                                table.casilleroDrawObj(i, j);

                                lastClickedFigure == null;
                                fichasEnPartida.pop();    
                            
                                actualizar();

                                busquedaLinea(aux);
                            }
                        }
                    }
                }
            }

            function busquedaLinea(obj) {
                //Cada tipo de busqueda devolvera un booleano. El primero que devuelva true accedera al if.
                if(table.searchRow(mode) || table.searchColumn(mode) || table.searchDiagonalLeft(mode, filas, columnas) || table.searchDiagonalRight(mode, filas, columnas)) {
                    //al encontrar una linea se mostrara sobre el canvas un div con el nombre del ganador y con la opcion de salir del juego para resetear toda la informacion.
                    console.log(obj);
                    timepoPartida.stopCronometro();
                    timeGame.innerHTML = `Partida Terminada`;
                    document.getElementById("winnerTitle").innerHTML = `El ganador de la partida es ${obj.getName()}`
                    winner.classList.toggle("active");
                    opcionInGame.classList.toggle("active");
                    exitEnGame.addEventListener("click", () => {
                        location.reload();
                    });
                }
                timePlayer.setCronometro();
            }
        }
    }
}