export class Organism {
    constructor(context2d, position, size) {
        this.RECT = 'rect';
        this.CIRCLE = 'circle';
        this.SHAPE = this.CIRCLE;

        this._context = context2d;
        this._position = position;
        this._size = size;
        this._alive = false;
        this._numberSurrounding = null;
    }

    isAlive() {
        return this._alive;
    }

    setAlive(alive) {
        this._alive = alive;
    }

    /**
     * 
     * @param {Number} number 
     */
    setNumberSurrounding(number) {
        this._numberSurrounding = number;
    }

    /** 
     * @returns {Number}
    */
    getNumberSurrounding() {
        return this._numberSurrounding;
    }

    draw() {
        this._context.clearRect(this._position.x, this._position.y, this._size, this._size);
        this._context.fillStyle = 'rgb(200, 0, 0)';
        this._context.strokeStyle = 'rgb(200, 0, 0)';

        if (this.SHAPE === this.CIRCLE) {
            this._drawCircle();
        } else {
            this._drawRect();
        }
        
    }

    _drawCircle() {
        this._context.beginPath();
        this._context.arc(this._position.x + this._size / 2, this._position.y + this._size / 2, this._size/2, 0, Math.PI * 2);
        if (this._alive) {
            this._context.fill();
        } else {
            this._context.stroke();
        }
    }

    _drawRect() {
        if (this._alive) {
            this._context.fillRect(this._position.x, this._position.y, this._size, this._size);
        } else {
            this._context.strokeRect(this._position.x, this._position.y, this._size, this._size);
        }
    }

    drawNumbers() {
        this._context.fillText(this._numberSurrounding, this._position.x + this._size / 2, this._position.y + this._size / 2);
    }
}
