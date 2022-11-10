class Circle {
    constructor(posX, posY, radius, fill, ctx){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.radius = radius;
        this.arrastrar = false;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fill
        this.ctx.fill();
        this.ctx.closePath();
    }

    getRadius(){
        return this.radius;
    }

    getArrastrar(){
        return this.arrastrar;
    }

    setArrastrar(boolean) {
        this.arrastrar = boolean;
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
}