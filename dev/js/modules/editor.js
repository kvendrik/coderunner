module.exports = {
  
    init: function(gameMethods){
        var self = this;

        this._running = false;

        this._initCm();
        this._bindEvents();

        this._gameMethods = gameMethods;

        return {
            isRunning: function(){
                return self._running;
            },
            stopRunning: self._stopRunning.bind(self)
        };
    },
  
    _initCm: function(){
        var cm = CodeMirror(document.getElementsByClassName('js-editor')[0], {
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
        this._btnEl.innerHTML = 'Run';
        this._running = false;
    },
  
    _bindEvents: function(){
        var btnEl = this._btnEl = document.getElementsByClassName('js-editor-run')[0];
        btnEl.addEventListener('click', function(){
            if(this._running){
                this._stopRunning();
                this._cm.options.readOnly = false;
            } else {
                this._execEditorCode(self._cm);
                btnEl.innerHTML = 'Stop';
                this._running = true;
                this._gameMethods.runScript();
                this._cm.options.readOnly = true;
            }
        }.bind(this), false);
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

        new Function('(function('+argsStr+', window, document){'+val+'}).apply(null, ['+execArgsStr+']);')();
    }
  
};