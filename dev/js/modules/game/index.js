var publicBases = {
    _que: [],
    clearQue: function(){
        this._que = [];
    },
    runQue: function(){
        var i = 0,
            self = this;

        var doStep = function(){
            var step = self._que[i];
            step.start();
            setTimeout(function(){
                step.end();
                i++;
                if(i < self._que.length){
                    doStep();
                }
            }, step.duration);
        };

        doStep();
    },
    move: function(dir, duration){
        this._que.push({
            name: 'move',
            start: function(){
                player.updateAction(dir, true);
            },
            end: function(){
                player.updateAction(dir, false);
            },
            duration: duration
        });
    }
};

var game = require('./game'),
    Player = require('./Player'),
    Enemy = require('./Enemy'),
    platforms = require('./platforms'),
    stars = require('./stars');

var enemies = [new Enemy()],
    player = new Player(publicBases);

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
                runScript: function(){
                    publicBases.runQue();
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
    //stars.create();

    enemies.forEach(function(enemy){
        enemy.create();
    });
};

var update = function(){
    player.update();
    //stars.update(player);

    enemies.forEach(function(enemy){
        enemy.update(player);
    });
};