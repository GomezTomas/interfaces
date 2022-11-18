class TiempoJugador{
    constructor(cronometroJugador) {
        this.intervalo = null;
        this.cronometroJugador = cronometroJugador;
    }

    startCronometro() {
        this.intervalo = setInterval(() => {
            this.cronometroJugador++;
        }, 1000)
    }

    stopCronometro() {
        clearInterval(this.intervalo);
    }

    getCronometro() {
       return this.cronometroJugador;
    }

    setCronometro() {
        this.cronometroJugador = 0;
    }
}