var game = require('./modules/game'),
	editor = require('./modules/editor'),
	logger = require('./modules/logger');

var gameMethods = game.init(),
	editorMethods = editor.init(gameMethods);

logger.init(gameMethods, editorMethods);