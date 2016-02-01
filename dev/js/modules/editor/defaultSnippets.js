var defaultSnippets = {
   'Hello World': function(){
moveRight(10);
moveLeft(5);
jump();
    },
    'Dance': function(){
jump();
moveRight(5);
jump();
jump();
moveLeft(5);
jump();
    },
    'Pipes & Getters': function(){
moveRight(10);
moveLeft(5);
jump();
pipe(function(){
	log(getPosition());
	log(getEnemiesPositions());
});
    },
    'Dodge Enemies': function(){
update(function(){
  var enemiesPos = getEnemiesPositions();

  enemiesPos.forEach(function(enemyPos){
    var ex = enemyPos.x,
        x = getPosition().x;
    if(x + 70 > ex && x < ex ||
      x - 70 < ex && x > ex){
      setAction('up', true);
      setTimeout(function(){
        setAction('up', false);
      }, 500);
      return;
    }
  });

  if(getPosition().x - 50 < 0){
    setAction('right', true);
    setAction('left', false);
  }

  if(getPosition().x + 50 > getWorldBounds().x){
    setAction('right', false);
    setAction('left', true);
  }
});
    }
};

module.exports = function(){
	var snippetStrs = {};

	for(name in defaultSnippets){
        if(defaultSnippets.hasOwnProperty(name)){
        	snippetStrs[name] = defaultSnippets[name].toString().replace(/^function\s\(\)\{/, '').replace(/\}$/, '').trim();
        }
    }

    return snippetStrs;
};