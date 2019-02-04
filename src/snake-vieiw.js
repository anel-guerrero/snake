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
        $(window).on("keydown", this.handleKeyEvent.bind(this));
        this.setUpGrid();
        var interval = setInterval(this.step.bind(this), 1000);
    }
    
    handleKeyEvent(event) {
        var keyCode = String(event.keyCode);
        var dir = keyCodes[keyCode];
        this.board.snake.turn(dir);
    }
    
    step() {
        this.board.snake.move();
        this.render();
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