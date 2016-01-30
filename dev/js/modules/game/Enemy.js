var game = require('./game'),
	platforms = require('./platforms');

var enemy,
	actions = {
	    left: false,
	    right: false,
	    up: false
	};

var Enemy = function(){};

Enemy.prototype = {

	create: function(){
		enemy = game.getRaw().add.sprite(250, game.getRaw().world.height - 150, 'enemy');
	    game.getRaw().physics.arcade.enable(enemy);

	    enemy.body.bounce.y = 0.2;
	    enemy.body.gravity.y = 300;
	    enemy.body.collideWorldBounds = true;

	    enemy.animations.add('left', [0, 1], 10, true);
	    enemy.animations.add('right', [2, 3], 10, true);

	    actions.right = true;
	    setInterval(function(){
	    	if(actions.right){
	    		actions.right = false;
	    		actions.left = true;
	    	} else {
	    		actions.right = true;
	    		actions.left = false;
	    	}
	    }, 1000);
	},

	update: function(player){
		game.getRaw().physics.arcade.collide(enemy, platforms.getRaw());
		game.getRaw().physics.arcade.collide(player.getRaw(), enemy);

		enemy.body.velocity.x = 0;

	    if(actions.left){
	        enemy.body.velocity.x = -100;
	        enemy.animations.play('left');
	    } else if(actions.right) {
	        enemy.body.velocity.x = 100;
	        enemy.animations.play('right');
	    } else {
	        enemy.animations.stop();
	        enemy.frame = 4;
	    }

	    if(actions.up && enemy.body.touching.down){
	        enemy.body.velocity.y = -350;
	    }
	},

	getRaw: function(){
		return enemy;
	}
	
};

module.exports = Enemy;