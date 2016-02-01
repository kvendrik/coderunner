Coderunner
==========

### Todo
* Add snippets/tabs
* Add `getWorldBounds`
* Add methods cheatsheet
* Add multiplayer (everyone who is active on the page)

### Snippets

##### Dodge Enemies
Jump when enemies get too close and turn around at the left and right side of the level
```javascript
update(function(){
	var enemiesPos = getEnemiesPositions();
	
	enemiesPos.forEach(function(enemyPos){
  	if(getMyPosition().x + 70 > enemyPos.x && getMyPosition().x < enemyPos.x){
    	setPlayerAction('up', true);
      setTimeout(function(){
      	setPlayerAction('up', false);
      }, 500);
      return;
    }
  });
    
  if(getMyPosition().x - 50 < 0){
		setPlayerAction('right', true);
    setPlayerAction('left', false);
  }
});
```
