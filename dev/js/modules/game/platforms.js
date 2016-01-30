var game = require('./game');

var platforms;

module.exports = {

	create: function(){
		platforms = game.getRaw().add.group();
	    platforms.enableBody = true;

	    var ground = platforms.create(0, game.getRaw().world.height - 64, 'ground');
	    ground.scale.setTo(2, 2);
	    ground.body.immovable = true;

	    // var ledge = platforms.create(400, 400, 'ground');
	    // ledge.body.immovable = true;

	    // ledge = platforms.create(0, 250, 'ground');
	    // ledge.body.immovable = true;

	    var wall = platforms.create(0, 0, 'wall');
	    wall.body.immovable = true;
	},

	getRaw: function(){
		return platforms;
	}
	
};