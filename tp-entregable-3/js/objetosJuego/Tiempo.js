class Tiempo{
    constructor(cronometroJugador, interact) {
        this.intervalo = null;
        this.cronometroJugador = cronometroJugador;
        this.interact = interact;
    }

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

    stopCronometro() {
        this.cronometroJugador = 5;
        clearInterval(this.intervalo);
    }

    getCronometro() {
       return this.cronometroJugador;
    }

    setCronometro() {
        this.cronometroJugador = 0;
    }
}