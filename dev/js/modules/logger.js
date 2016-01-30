module.exports = {
  
    init: function(gameMethods, editorMethods){
        var self = this;

        this._el = document.getElementsByClassName('js-logger')[0];
        this._editorMethods = editorMethods;
        this._bindEvents();

        gameMethods.setPublicMethod('log', ['msg'], function(){
            if(editorMethods.isRunning()){
                self._addLog(arguments, false);
            }
        });
    },
  
    _bindEvents: function(){
        window.onerror = this._handleEditorCodeError.bind(this);
    },

    _addLog: function(msgs, isError){
        var wrapper = this._el,
            el = document.createElement('li'),
            msg = '';
        
        if(isError) el.className = 'logger__li--err';
        for(var i = 0; i < msgs.length; i++){
            if(typeof msgs[i] === 'object'){
                msg += '{';
                for(var key in msgs[i]){
                    msg += key+':'+msgs[i][key]+',';
                }
                msg += '}';
            } else {
                msg += msgs[i]+' ';
            }
        }
        console.log(msg);
        el.innerHTML = msg;
        wrapper.appendChild(el);

        wrapper.scrollTop = wrapper.scrollHeight;
    },
  
    _handleEditorCodeError: function(msg, url, lineIdx, charIdx, err){
        this._addLog([msg], true);
        this._editorMethods.stopRunning();
    }
  
};