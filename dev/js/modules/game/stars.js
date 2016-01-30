var game = require('./game'),
	player = require('./player'),
	platforms = require('./platforms');

var stars;

module.exports = {

	create: function(){
		stars = game.getRaw().add.group();
	    stars.enableBody = true;

	    for(var i = 0; i < 12; i++){
	        var star = stars.create(i * 70, 0, 'star');
	        star.body.gravity.y = 150;
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }
	},

	update: function(){
		game.getRaw().physics.arcade.collide(stars, platforms.getRaw());
    	game.getRaw().physics.arcade.collide(stars, player.getRaw(), this._collectStar);
	},

	_collectStar: function(player, star){
    	star.kill();
	}
	
};