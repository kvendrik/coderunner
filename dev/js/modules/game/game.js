var game;

module.exports = {

	init: function(methods){
		var el = document.getElementsByClassName('js-playground')[0];
		game = new Phaser.Game(window.innerWidth*0.6, el.parentNode.offsetHeight, Phaser.Physics.P2JS, el, methods);
	},

	preload: function(){
		game.load.image('sky', 'img/game_assets/sky.png');
	    game.load.image('ground', 'img/game_assets/platform.png');
	    game.load.image('wall', 'img/game_assets/wall.png');
	    game.load.image('star', 'img/game_assets/star.png');
	    game.load.spritesheet('dude', 'img/game_assets/dude.png', 32, 48);
	    game.load.spritesheet('enemy', 'img/game_assets/baddie.png', 32, 32);
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.stage.backgroundColor = "#4488AA";
	},

	getRaw: function(){
		return game;
	}
	
};