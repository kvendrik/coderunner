module.exports = function(queManager, game, player, enemies){

	var publicMethodHelpers = window.publicMethodHelpers = {
	    publicOnUpdate: undefined,
	    setOnUpdate: function(func){
	        this.publicOnUpdate = func;
	    },
	    pipe: function(func){
	        queManager.addToQue(func);
	    },
	    move: function(dir, duration){
	        queManager.addToQue({
	            name: 'move',
	            start: function(){
	                player.updateAction(dir, true);
	            },
	            end: function(){
	                player.updateAction(dir, false);
	            },
	            duration: duration
	        });
	    },
	    getMyPosition: function(){
	        return { x: player.getRaw().x, y: player.getRaw().y };
	    },
	    getEnemiesPositions: function(){
	        var positions = [];
	        enemies.forEach(function(enemy){
	            positions.push({ x: enemy.getRaw().x, y: enemy.getRaw().y });
	        });
	        return positions;
	    },
	    setPlayerAction: function(actionName, value){
	        player.updateAction(actionName, value);
	    },
	    setMovementSpeed: function(speed){
	        player.setMovementSpeed(speed);
	    },
	    setVelocity: function(velocity){
	        player.setVelocity(velocity);
	    },
	    getWorldBounds: function(){
	    	var _game = game.getRaw();
	    	return { x: _game.width, y: _game.height };
	    }
	};

	return publicMethodHelpers;
	
};