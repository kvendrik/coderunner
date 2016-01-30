var game = require('./game'),
	platforms = require('./platforms');

var player,
	actions = {
	    left: false,
	    right: false,
	    up: false
	};

module.exports = {

	init: function(publicBases){
		this._publicBases = publicBases;
	},

	create: function(){
		player = game.getRaw().add.sprite(32, game.getRaw().world.height - 150, 'dude');
	    game.getRaw().physics.arcade.enable(player);

	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;

	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);
	},

	update: function(){
		game.getRaw().physics.arcade.collide(player, platforms.getRaw());

		player.body.velocity.x = 0;

	    if(actions.left){
	        player.body.velocity.x = -150;
	        player.animations.play('left');
	    } else if(actions.right) {
	        player.body.velocity.x = 150;
	        player.animations.play('right');
	    } else {
	        player.animations.stop();
	        player.frame = 4;
	    }

	    if(actions.up && player.body.touching.down){
	        player.body.velocity.y = -350;
	    }
	},

	resetPos: function(){
		player.kill();

		this._publicBases.clearQue();

		actions = {
	    	left: false,
	    	right: false,
	    	up: false
		};

		this.create();
	},

	updateAction: function(name, newVal){
		if(typeof actions[name] === 'undefined') return false;
		actions[name] = newVal;
	},

	getRaw: function(){
		return player;
	}
	
};