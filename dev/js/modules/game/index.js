var game = require('./game'),
    Player = require('./Player'),
    Enemy = require('./Enemy'),
    platforms = require('./platforms'),
    stars = require('./stars');

var enemies = [new Enemy()],
    player = new Player();

window.publicOnUpdate;

window.publicBases = {
    _que: [],
    clearQue: function(){
        this._que = [];
    },
    runQue: function(){
        var i = 0,
            self = this;

        var cont = function(){
            i++;
            if(i < self._que.length){
                doStep();
            }
        };

        var doStep = function(){
            var step = self._que[i];
            if(typeof step === 'function'){
                step();
                cont();
            } else {
                step.start();
                setTimeout(function(){
                    step.end();
                    cont();
                }, step.duration);
            }
        };

        if(self._que.length > 0) doStep();
    },
    pipe: function(func){
        this._que.push(func);
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
    onUpdate: function(func){
        window.publicOnUpdate = func;
    },
    setPlayerAction: function(actionName, value){
        player.updateAction(actionName, value);
    },
    setMovementSpeed: function(speed){
        player.setMovementSpeed(speed);
    },
    setVelocity: function(velocity){
        player.setVelocity(velocity);
    }
};

module.exports = {
    init: function(){
        game.init({
            preload: preload,
            create: create,
            update: update
        });

        return {
            setPublicMethod: function(name, args, func){
                window.publicBases[name] = func;
                this.publicMethods[name] = 'function('+args.join(',')+'){ window.publicBases.'+name+'('+args.join(',')+'); }';
            },
            clearQue: function(){
                window.publicBases.clearQue();
            },
            resetPlayer: function(){
                player.resetPos();
            },
            runScript: function(){
                window.publicBases.runQue();
            },
            publicMethods: {
                update: function(func){
                    window.publicBases.onUpdate(func);
                },
                pipe: function(func){
                    window.publicBases.pipe(func);
                },
                moveRight: function(steps){
                    window.publicBases.move('right', steps*100);
                },
                moveLeft: function(steps){
                    window.publicBases.move('left', steps*100);
                },
                setPlayerAction: function(actionName, value){
                    window.publicBases.setPlayerAction(actionName, value);
                },
                jump: function(){
                    window.publicBases.move('up', 1000);
                },
                getMyPosition: function(){
                    return window.publicBases.getMyPosition();
                },
                getEnemiesPositions: function(){
                    return window.publicBases.getEnemiesPositions();
                },
                setMovementSpeed: function(speed){
                    window.publicBases.setMovementSpeed(speed);
                },
                setVelocity: function(velocity){
                    window.publicBases.setVelocity(velocity);
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

    if(typeof window.publicOnUpdate === 'function') window.publicOnUpdate();
};