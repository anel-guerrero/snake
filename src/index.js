import _ from 'lodash';
const View = require('./snake-vieiw');

var $el = $('<div></div>');
$el.addClass('container');
var el = $el[0];
document.body.appendChild(el);
var view = new View(el);

