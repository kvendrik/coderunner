module.exports = {
  
    init: function(gameMethods, editorMethods){
        var wrapper = this._wrapper = document.getElementsByClassName('js-logger')[0];
        
        this._editorMethods = editorMethods;
        this._gameMethods = gameMethods;

        this._bindEvents();
    },
  
    _bindEvents: function(){
        var self = this;
        
        window.onerror = this._handleEditorCodeError.bind(this);

        this._gameMethods.setPublicMethod('log', ['msg'], function(){
            self._addLog(arguments, false);
        });

        this._editorMethods.setOnRun(function(){
            self._wrapper.innerHTML = '';
        });
    },

    _addLog: function(msgs, isError){
        var wrapper = this._wrapper,
            el = document.createElement('li'),
            msg = '';
        
        if(isError) el.className = 'logger__li--err';
        for(var i = 0; i < msgs.length; i++){
            var curr = msgs[i];
            if(typeof curr === 'object'){
                msg += JSON.stringify(curr);
            } else {
                msg += curr+' ';
            }
        }
        el.innerHTML = msg;
        wrapper.appendChild(el);

        wrapper.scrollTop = wrapper.scrollHeight;
    },
  
    _handleEditorCodeError: function(msg, url, lineIdx, charIdx, err){
        this._addLog([msg], true);
        this._editorMethods.stopRunning();
    }
  
};