export class Organism {
    constructor(context2d, position, size, alive) {
        this._context = context2d;
        this._position = position;
        this._size = size;
        this._alive = alive;
    }

    draw() {
        this._context.fillStyle = 'rgb(200, 0, 0)';
        this._context.strokeStyle = 'rgb(200, 0, 0)';

        if (this._alive) {
            this._context.fillRect(this._position.x, this._position.y, this._size, this._size);
        } else {
            this._context.strokeRect(this._position.x, this._position.y, this._size, this._size);
        }
    }
}