const Snake = require('./snake.js');
const Apple = require('./apple.js');

class Board {
    constructor(dim) {
        this.dim = dim;
        this.snake = new Snake(this);
        this.apple = new Apple(this);
        this.turnCount = 0;
    }

    build() {
        var rows = Array(dim);
        var board = rows.map(function(row) {
            row = Array[dim];
        });
        this.grid = board;
    }

    addBlocks() {
        
        if (this.snake.turns % 7 === 0 && this.snake.turns !== 0 && this.snake.turns !== this.turnCount) {
            this.turnCount = this.snake.turns;
        }
    }

}

module.exports = Board;