module.exports = {
    update: function(func){
        parent.publicMethodHelpers.setOnUpdate(func);
    },
    pipe: function(func){
        parent.publicMethodHelpers.pipe(func);
    },
    moveRight: function(steps){
        parent.publicMethodHelpers.move('right', steps*100);
    },
    moveLeft: function(steps){
        parent.publicMethodHelpers.move('left', steps*100);
    },
    setAction: function(actionName, value){
        parent.publicMethodHelpers.setPlayerAction(actionName, value);
    },
    jump: function(){
        parent.publicMethodHelpers.move('up', 1000);
    },
    getPosition: function(){
        return parent.publicMethodHelpers.getMyPosition();
    },
    setMovementSpeed: function(speed){
        parent.publicMethodHelpers.setMovementSpeed(speed);
    },
    setVelocity: function(velocity){
        parent.publicMethodHelpers.setVelocity(velocity);
    },
    getEnemiesPositions: function(){
        return parent.publicMethodHelpers.getEnemiesPositions();
    },
    getWorldBounds: function(){
        return parent.publicMethodHelpers.getWorldBounds();
    }
};