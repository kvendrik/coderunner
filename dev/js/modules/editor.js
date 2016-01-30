module.exports = {
  
    init: function(gameMethods){
        var self = this;

        this._running = false;

        this._initCm();
        this._bindEvents();

        this._gameMethods = gameMethods;
        window.publicGameMethods = gameMethods.publicMethods;

        return {
            stopRunning: self._stopRunning.bind(self)
        };
    },
  
    _initCm: function(){
        var cm = CodeMirror(document.getElementsByClassName('js-editor')[0], {
            value: 'this.moveRight(10);\nthis.moveLeft(5);\nthis.jump();\nthis.getMyPosition();\nthis.runScript();',
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai'
        });

        cm.setSize(null, window.innerHeight);
    
        this._cm = cm;
    },

    _stopRunning: function(){
        this._gameMethods.resetPlayer();
        this._gameMethods.clearQue();
        this._btnEl.innerHTML = 'Run';
        this._running = false;
    },
  
    _bindEvents: function(){
        var btnEl = this._btnEl = document.getElementsByClassName('js-editor-run')[0];
        btnEl.addEventListener('click', function(){
            if(this._running){
                this._stopRunning();
            } else {
                this._execEditorCode(self._cm);
                btnEl.innerHTML = 'Stop';
                this._running = true;
            }
        }.bind(this), false);
    },
  
    _execEditorCode: function(editor){
        var val = this._cm.getValue();
        new Function('(function(window){'+val+'}).apply(window.publicGameMethods);')();
    }
  
};