var snippets = require('./snippets');

module.exports = {
  
    init: function(gameMethods){
        var self = this;

        this._wrapper = document.getElementsByClassName('js-editor')[0];

        this._running = false;

        this._initCm();
        this._bindEvents();

        snippets.init(this._cm, function(){
            return self._running;
        });

        this._gameMethods = gameMethods;

        return {
            isRunning: function(){
                return self._running;
            },
            stopRunning: self._stopRunning.bind(self),
            setOnRun: function(func){
                self._onRun = func;
            }
        };
    },
  
    _initCm: function(){
        var cm = CodeMirror(this._wrapper, {
            value: localStorage['coderunner__editor-value'] || 'moveRight(10);\nmoveLeft(5);\njump();\npipe(function(){\n\tlog(getMyPosition());\n\tlog(getEnemiesPositions());\n});',
            lineNumbers: true,
            mode: 'javascript',
            theme: 'monokai'
        });

        cm.on('change', function(editor){
            var val = editor.getValue();
            localStorage['coderunner__editor-value'] = val;
        });
        cm.setSize(null, window.innerHeight);
    
        this._cm = cm;
    },

    _stopRunning: function(){
        this._gameMethods.resetPlayer();

        this._runBtnEl.innerHTML = 'Run';
        this._running = false;
        document.body.classList.remove('game-running');
        this._cm.options.readOnly = false;
    },

    _startRunning: function(){
        if(typeof this._onRun === 'function'){
            this._onRun();
        }

        this._runBtnEl.innerHTML = 'Stop';
        document.body.classList.add('game-running');
        this._running = true;
        this._cm.options.readOnly = true;

        this._execEditorCode(self._cm);
        this._gameMethods.runQue();
    },
  
    _bindEvents: function(){
        var self = this;

        var expandBtnEl = document.getElementsByClassName('js-editor-expand')[0],
            runBtnEl = this._runBtnEl = document.getElementsByClassName('js-editor-run')[0];

        expandBtnEl.addEventListener('click', function(){
            var parentEl = self._wrapper.parentNode;

            if(parentEl.classList.contains('pane--expanded')){
                parentEl.classList.remove('pane--expanded');
                expandBtnEl.innerHTML = 'Expand Editor';
            } else {
                parentEl.classList.add('pane--expanded');
                expandBtnEl.innerHTML = 'Collapse Editor';
            }
        }, false);

        runBtnEl.addEventListener('click', function(){
            if(self._running){
                self._stopRunning();
            } else {
                self._startRunning();
            }
        }, false);
    },
  
    _execEditorCode: function(editor){
        var val = this._cm.getValue();

        var argsStr = '',
            execArgsStr = '',
            publicMethods = this._gameMethods.publicMethods;

        for(var name in publicMethods){
            argsStr += name+', ';
            execArgsStr += publicMethods[name].toString()+', ';
        }

        argsStr = argsStr.replace(/\,\s$/, '');
        execArgsStr = execArgsStr.replace(/\,\s$/, '');

        if(!this._frame){
            var frame = this._frame = document.createElement('iframe');
            this._wrapper.appendChild(frame);
        }

        this._frame.contentWindow.eval('(function('+argsStr+', window, document){'+val+'}).apply(null, ['+execArgsStr+']);');
    }
  
};