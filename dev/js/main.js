var game = require('./modules/game'),
	editor = require('./modules/editor'),
	console = require('./modules/console');

var gameMethods = game.init(),
	editorMethods = editor.init(gameMethods);

console.init(editorMethods);