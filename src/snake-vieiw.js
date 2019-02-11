const Board = require('./board.js');

keyCodes = {
    '37': 'W',
    '38': "N",
    '39': "E",
    '40': "S"
}

class View {
    constructor(el) {
        this.$el = $(el);
        var dim = 30;
        this.board = new Board(dim);
        this.pause = false;
        this.gameOverFlag = false;
        $(window).on("keydown", this.handleKeyEvent.bind(this));
        this.setUpGrid();
        // this.interval = setInterval(this.step.bind(this), 200);
        window.addEventListener('message', this.handlePostMessage.bind(this));
    }

    handlePostMessage(e) {
        if (e.data === "pause") {
            if (this.pause) {
                this.pause = false;
                this.interval = setInterval(this.step.bind(this), 200);
            } else {
                this.pause = true;
                clearInterval(this.interval);
            }
        }

        if (e.data === "play again") {
            // if (this.gameOverFlag) {
                this.gameOverFlag = false;
                window.parent.postMessage("play again", "*");
                this.board.snake.direction = "N";
                this.board.snake.segments = [
                    [14, 14],
                    [15, 14]
                ];
                this.interval = setInterval(this.step.bind(this), 200);
            // }

        }
    }

    gameOver() {
        clearInterval(this.interval);
        this.gameOverFlag = true;
        window.parent.postMessage("game over", "*");
    }
    
    handleKeyEvent(event) {
        var keyCode = String(event.keyCode);
        var dir = keyCodes[keyCode];
        this.board.snake.turn(dir);
    }
    
    step() {
        this.board.snake.move();
        this.isOver();
        this.render();
    }

    isOver() {
        if (this.board.snake.hitWall()) {
            window.parent.postMessage("snake hit a wall", "*");
            this.gameOver();
        }

        if (this.board.snake.didHitItself()) {
            window.parent.postMessage("snake hit itself", "*");
            this.gameOver();
        }
    }

    render() {
        this.updateClasses(this.board.snake.segments, 'snake');
        this.updateClasses(this.board.apple.position, 'apple');
    }

    setUpGrid() {
        var html = "";
        for (var i = 0; i < this.board.dim; i++) {
            html += '<ul>';
            for (var j = 0; j < this.board.dim; j++) {
                html += '<li></li>';
            }
            html += '</ul>';
        }

        this.$el.html(html);
        this.$li = this.$el.find('li');
    }

    updateClasses(coords, className) {
        this.$li.filter('.' + className).removeClass();
        for (var i = 0; i < coords.length; i++) {
            const coordsNum = coords[i][0] * this.board.dim + coords[i][1];
            this.$li.eq(coordsNum).addClass(className);
        }
    }
}

module.exports = View;