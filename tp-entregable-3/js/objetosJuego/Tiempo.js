class Tiempo{
    constructor(cronometroJugador, interact) {
        this.intervalo = null;
        this.cronometroJugador = cronometroJugador;
        this.interact = interact;
    }
    //Metodo para inicar el cronometro de la partida.
    startCronometro() {
        this.intervalo = setInterval(() => {
            if(this.cronometroJugador < 5){
                this.cronometroJugador++;
                this.interact.innerHTML = `A la partida le quedan: ${5 - this.cronometroJugador} - Minutos`;
            }else {
                clearInterval(this.intervalo);
            }
        }, 60000)
    }
    //Metodo para detener el cronometro.
    stopCronometro() {
        this.cronometroJugador = 5;
        clearInterval(this.intervalo);
    }
    //Metodo para obtener la cantidad de minutos que pasaron.
    getCronometro() {
       return this.cronometroJugador;
    }
    //Metodo para reiniciar la partida.
    setCronometro() {
        this.cronometroJugador = 0;
    }
}