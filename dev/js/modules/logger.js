module.exports = {
  
    init: function(editorMethods){
        this._editorMethods = editorMethods;
        this._bindEvents();
    },
  
    _bindEvents: function(){
        window.onerror = this._handleEditorCodeError.bind(this);
    },
  
    _handleEditorCodeError: function(msg, url, lineIdx, charIdx, err){
        var wrapper = document.getElementsByClassName('js-logger')[0],
            el = document.createElement('li');

        el.className = 'logger__li--err';
        el.innerHTML = msg;
        wrapper.appendChild(el);

        this._editorMethods.stopRunning();
    }
  
};