class Apple {
    constructor(board) {
        this.board = board;
        this.replace();
    }

    getPosition() {
        var r = Math.floor(Math.random() * this.board.dim);
        var c = Math.floor(Math.random() * this.board.dim);
        return [r, c];
    }

    replace() {
        var pos = this.getPosition();
        if (this.board.snake.isOccupying(pos)) {
            pos = this.getPosition();
        }
        this.position = [pos];
    }
}

module.exports = Apple;