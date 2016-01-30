var game = require('./modules/game/main'),
	editor = require('./modules/editor');

var gameMethods = game.init();
editor.init(gameMethods);