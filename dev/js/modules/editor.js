module.exports = {
  
    init: function(gameMethods){
        this._initCm();
        this._bindEvents();

        this._gameMethods = gameMethods;
        window.publicGameMethods = gameMethods.publicMethods;
    },
  
    _initCm: function(){
        var cm = CodeMirror(document.getElementsByClassName('js-editor')[0], {
            value: 'this.moveRight(10);\nthis.moveLeft(5);\nthis.jump();\nthis.run();',
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai'
        });

        cm.setSize(null, window.innerHeight);
    
        this._cm = cm;
    },
  
    _bindEvents: function(){
        var self = this,
            running = false;

        window.onerror = this._handleEditorCodeError.bind(this);

        var btnEl = document.getElementsByClassName('js-editor-run')[0];
        btnEl.addEventListener('click', function(){
            if(running){
                self._gameMethods.resetPlayer();
                btnEl.innerHTML = 'Run';
                running = false;
                //self._cm.isReadOnly(false);
            } else {
                self._execEditorCode(self._cm);
                btnEl.innerHTML = 'Stop';
                running = true;
                //console.log(self._cm);
                //self._cm.isReadOnly(true);
            }
        }, false);
    },
  
    _handleEditorCodeError: function(msg, url, lineIdx, charIdx, err){
        var wrapper = document.getElementsByClassName('js-console')[0],
            el = document.createElement('li');

        el.innerHTML = msg;

        wrapper.appendChild(el);
    },
  
    _execEditorCode: function(editor){
        var val = this._cm.getValue();
        this._gameMethods.clearQue();
        new Function('(function(window){'+val+'}).apply(window.publicGameMethods);')();
    }
  
};