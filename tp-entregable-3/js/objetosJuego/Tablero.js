class Tablero {
    constructor(matriz, ctx) {
        this.matriz = matriz;
        this.ctx = ctx;
        this.casillero = null
    }

    create(inicioY, finY, inicioTable, filas, columnas) {
        for (let x = 0; x < filas; x++) {
            let fila = [];
            let inicioX = inicioTable;
            let finX = inicioTable + 105.3;
            for (let y = 0; y < columnas; y++) {
                this.casillero = new Casillero(this.ctx, inicioX, finX, inicioY, finY);
                fila.push(this.casillero);
                inicioX = inicioX + 105.3;
                finX = finX + 105.3;
            }
            this.matriz.push(fila);
            inicioY = inicioY + 67;
            finY = finY + 67;
        }
    }

    drawTable() {
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                this.matriz[i][j].draw();
            }
        }
    }

    getMatriz() {
        return this.matriz;
    }

    clearTable() {
        this.drawTable();
        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                this.casilleroDrawObj(i, j);
            }
        }
    }

    mouseUpTable(lastClickedFigure, i, j) {
        console.log(lastClickedFigure, i, j);
        if(((lastClickedFigure.getPosX() > this.matriz[i][j].getInicioX()) && (lastClickedFigure.getPosX() < this.matriz[i][j].getFinX())) 
            && ((lastClickedFigure.getPosY() > this.matriz[i][j].getInicioY()) && (lastClickedFigure.getPosY() < this.matriz[i][j].getFinY()))) {
                return true;
        }
        return false;
    }

    searchRow(mode) {
        let contador = 0;
        let aux = "";

        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                if(contador < mode){
                    if(this.matriz[i][j].getObj() != null) {
                        if(contador == 0) {
                            aux = this.matriz[i][j].getObj().getName();
                            contador++;
                        }else if(contador > 0) {
                            if(this.matriz[i][j].getObj().getName() == aux) {
                                contador++;
                            }else {
                                contador = 1;
                                aux = this.matriz[i][j].getObj().getName();
                            }
                        }
                    }else {
                        if(this.matriz[i][j].getObj() == null) {
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
                aux = "";
            }
                    
        }
        return false;
    }

    searchColumn(mode) {
        let contador = 0;
        let aux = "";

        let columna = 0;
        let fila = 0;

        while(columna < mode*2) {
            while(fila < mode*2) {
                if(contador < mode) {
                    if(this.matriz[fila][columna].getObj() != null) {
                        if(contador == 0) {
                            aux = this.matriz[fila][columna].getObj().getName();
                            contador++;
                        }else if(contador > 0) {
                            if(this.matriz[fila][columna].getObj().getName() == aux){
                                contador++;
                            }else {
                                aux = this.matriz[fila][columna].getObj().getName();
                                contador = 1;
                            }
                        }
                    }else if(this.matriz[fila][columna].getObj() == null) {
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
                aux = "";
            }
        }
        return false;
    }

    searchDiagonalLeft(mode, filas, columnas) {
        let contador = 0;
        let aux = "";
        let busqueda = false;

        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = 0; j < this.matriz[i].length; j++) {
                if(this.matriz[i][j].getObj() != null) {
                    contador = 1;
                    aux = this.matriz[i][j].getObj().getName();
                    busqueda = true;
                    let x = j;
                    let y = i;
                    while(busqueda === true) {
                        if(contador < mode) {
                            x++;
                            y++;
                            if(x < columnas && y < filas) {
                                if(this.matriz[y][x].getObj() != null) {
                                    if(this.matriz[y][x].getObj().getName() == aux) {
                                        contador++;
                                    }else {
                                        busqueda = false;
                                    }
                                }else if(this.matriz[y][x].getObj() == null) {
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

    searchDiagonalRight(mode, filas, columnas) {
        let contador = 0;
        let aux = "";
        let busqueda = false;

        for (let i = 0; i < this.matriz.length; i++) {
            for (let j = columnas-1; j >= 0; j--) {
                if(this.matriz[i][j].getObj() != null) {
                    contador = 1;
                    aux = this.matriz[i][j].getObj().getName();
                    busqueda = true;
                    let x = j;
                    let y = i;
                    while(busqueda === true) {
                        if(contador < mode) {
                            x--;
                            y++;
                            if(x >= 0 && y < filas) {
                                if(this.matriz[y][x].getObj() != null) {
                                    if(this.matriz[y][x].getObj().getName() == aux) {
                                        contador++;
                                    }else {
                                        busqueda = false;
                                    }
                                }else if(this.matriz[y][x].getObj() == null) {
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

    setOcupadoCasillero(lastClickedFigure, i, j) {
        this.matriz[i][j].setOcupado(lastClickedFigure);
    }

    casilleroDrawObj(i, j) {
        this.matriz[i][j].drawObj();
    }
}