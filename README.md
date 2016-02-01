Coderunner
==========

### Cheatsheet
Check out the [list of methods you can use in the game](https://github.com/kvendrik/coderunner/blob/gh-pages/dev/js/modules/game/publicMethods.js).

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
```
