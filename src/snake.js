// const Apple = require('./apple.js');

moves = {
    "N": [-1, 0],
    "E": [0, 1],
    "S": [1, 0],
    "W": [0, -1]
}

oppositeDirection = {
    "N": "S", 
    "E": "W", 
    "W": "E",
    "S": "N"
}

class Snake {
    constructor(board) {
        this.direction = "N";
        this.segments = [[14, 14], [15, 14]];
        this.board = board;
        this.turns = 0;
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
        head = Array.from(head);
        if (head[0] === apple[0][0] && head[1] === apple[0][1]) {
            window.parent.postMessage("ateApple", "*");
            return true;
        } else {
            return false;
        }
    }


    grow() {
        var end = this.segments.slice(-1);
        var oppositeDir = moves[this.direction].map(function(x) {x = -x});
        var r = end[0] + oppositeDir[0];
        var c = end[1] + oppositeDir[1];
        this.segments.push([r, c]);
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

    hitWall() {
        var head = this.segments[0];
        if (head[0] > this.board.dim 
            || head[0] < 0
            || head[1] > this.board.dim
            || head[1] < 0) {
                return true;
            } else {
                return false;
            }
    }

    didHitItself() {
        var head = this.segments[0];
        for (var i = 1; i < this.segments.length; i++) {
            var part = this.segments[i];
            if (head[0] === part[0] && head[1] === part[1]) {
                return true;
            } 
        }
        return false;
    }

    turn(newDirection) {
        if (this.direction !== oppositeDirection[newDirection]) {
            this.direction = newDirection;
            this.turns++;
        }
    }

}

module.exports = Snake;