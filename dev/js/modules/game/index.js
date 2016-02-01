var game = require('./game'),
    platforms = require('./platforms'),
    Player = require('./Player'),
    Enemy = require('./Enemy'),
    queManager = require('./queManager'),
    publicMethods = require('./publicMethods');

var enemies = [new Enemy()],
    player = new Player(queManager, {
        onResetPos: function(){
            publicMethodHelpers.setOnUpdate(undefined);
        }
    });

var publicMethodHelpers = require('./publicMethodHelpers')(queManager, game, player, enemies);

module.exports = {
    init: function(){
        game.init({
            preload: preload,
            create: create,
            update: update
        });

        return {
            setPublicMethod: function(name, args, func){
                publicMethodHelpers[name] = func;
                this.publicMethods[name] = 'function('+args.join(',')+'){ window.publicMethodHelpers.'+name+'('+args.join(',')+'); }';
            },
            clearQue: function(){
                queManager.clearQue();
            },
            resetPlayer: function(){
                player.resetPos();
            },
            runQue: function(){
                queManager.runQue();
            },
            publicMethods: publicMethods
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

    enemies.forEach(function(enemy){
        enemy.create();
    });
};

var update = function(){
    player.update();

    enemies.forEach(function(enemy){
        enemy.update(player);
    });

    if(typeof publicMethodHelpers.publicOnUpdate === 'function') publicMethodHelpers.publicOnUpdate();
};