module.exports = {
    update: function(func){
        window.publicMethodHelpers.setOnUpdate(func);
    },
    pipe: function(func){
        window.publicMethodHelpers.pipe(func);
    },
    moveRight: function(steps){
        window.publicMethodHelpers.move('right', steps*100);
    },
    moveLeft: function(steps){
        window.publicMethodHelpers.move('left', steps*100);
    },
    setAction: function(actionName, value){
        window.publicMethodHelpers.setPlayerAction(actionName, value);
    },
    jump: function(){
        window.publicMethodHelpers.move('up', 1000);
    },
    getPosition: function(){
        return window.publicMethodHelpers.getMyPosition();
    },
    setMovementSpeed: function(speed){
        window.publicMethodHelpers.setMovementSpeed(speed);
    },
    setVelocity: function(velocity){
        window.publicMethodHelpers.setVelocity(velocity);
    },
    getEnemiesPositions: function(){
        return window.publicMethodHelpers.getEnemiesPositions();
    },
    getWorldBounds: function(){
        return window.publicMethodHelpers.getWorldBounds();
    }
};