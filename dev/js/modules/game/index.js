var game = require('./game'),
    queManager = require('./queManager'),
    platforms = require('./components/platforms'),
    Player = require('./components/Player'),
    Enemy = require('./components/Enemy');

var enemies = [new Enemy()],
    player = new Player(queManager, {
        onResetPos: function(){
            publicMethodHelpers.setOnUpdate(undefined);
        }
    });

var publicMethods = require('./publicMethods'),
    publicMethodHelpers = require('./publicMethodsHelpers')(queManager, game, player, enemies);

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
                this.publicMethods[name] = 'function('+args.join(',')+'){ parent.publicMethodHelpers.'+name+'('+args.join(',')+'); }';
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