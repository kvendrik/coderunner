var player = require('./player');

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