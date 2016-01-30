var game = require('./game'),
    player = require('./player'),
    platforms = require('./platforms'),
    stars = require('./stars'),
    Enemy = require('./Enemy'),
    publicBases = require('./publicBases');

var enemies = [new Enemy()];

player.init(publicBases);

module.exports = {
    init: function(){
        game.init({
            preload: preload,
            create: create,
            update: update
        });

        return {
            clearQue: function(){
                publicBases.clearQue();
            },
            resetPlayer: function(){
                player.resetPos();
            },
            publicMethods: {
                moveRight: function(steps){
                    publicBases.move('right', steps*100);
                },
                moveLeft: function(steps){
                    publicBases.move('left', steps*100);
                },
                jump: function(){
                    publicBases.move('up', 1000);
                },
                run: function(){
                    publicBases.runQue();
                }
            }
        };
    }
};

var preload = function(){
    game.preload();
};

var create = function(){
    game.create();
    platforms.create();
    player.create();
    stars.create();

    enemies.forEach(function(enemy){
        enemy.create();
    });
};

var update = function(){
    player.update();
    stars.update();

    enemies.forEach(function(enemy){
        enemy.update();
    });
};