// const Apple = require('./apple.js');

moves = {
    "N": [-1, 0],
    "E": [0, 1],
    "S": [1, 0],
    "W": [0, -1]
}

class Snake {
    constructor(board) {
        this.direction = "N";
        this.segments = [[14, 14], [15, 14] ];
        this.board = board;
    }

    isOccupying(pos) {
        var result = false;
        for (var i = 0; i < this.segments.length; i++) {
            var seg = this.segments[i];
            if (pos[0] === seg[0] && pos[1] === seg[1]) {
                result = true;
            }
        }
        return result;
    }

    eatApple() {
        var head = this.segments[0];
        var apple = this.board.apple.position;
        if (head[0] === apple[0] && head[1 === apple[1]]) {
            return true;
        } else {
            return false;
        }
    }


    grow() {
        var end = this.segments.slice(-1);
        var r = end[0]
    }

    move() {      
        var positionAhead;
        var currentPosition;
        for (var i = 0;i < this.segments.length; i++) {
            var seg = this.segments[i];
            var currentPosition = seg;
            if (i === 0) {
                positionAhead = seg;
                var r = seg[0] + moves[this.direction][0];
                var c = seg[1] + moves[this.direction][1];
                this.segments[i] = [r, c];

                if (this.eatApple()) {
                    this.board.apple.replace();
                    this.grow();
                }
            } else {
                this.segments[i] = positionAhead;
                positionAhead = currentPosition;
            }
        }
    }

    turn(newDirection) {
        this.direction = newDirection;
    }

}

module.exports = Snake;