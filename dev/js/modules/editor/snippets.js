var defaultSnippetsGetter = require('./defaultSnippets');

module.exports = {

    init: function(editor, getIsRunning){
        this._wrapper = document.getElementsByClassName('js-snippets-list')[0];
        this._editor = editor;
        this._getIsRunning = getIsRunning;

        var savedSnippets = localStorage['coderunner__editor-snippets'],
            defaultSnippets = defaultSnippetsGetter();

        if(savedSnippets && typeof savedSnippets === 'string'){
            try {
                savedSnippets = JSON.parse(savedSnippets);
            } catch(err){
                savedSnippets = defaultSnippets;    
            }
        } else {
            savedSnippets = defaultSnippets;
        }

        this._savedSnippets = savedSnippets;
        localStorage['coderunner__editor-snippets'] = JSON.stringify(savedSnippets);

        this._bindEvents();
        this._listSnippets();
    },

    _listSnippets: function(){
        var savedSnippets = this._savedSnippets;
        for(name in savedSnippets){
            if(savedSnippets.hasOwnProperty(name)){
                var code = savedSnippets[name];
                this._addSnippet(name, code, false);
            }
        }
    },

    _bindEvents: function(){
        var self = this;

        this._wrapper.addEventListener('click', function(e){
            var target = e.target,
                code = target.getAttribute('data-code');

            if(self._getIsRunning()) return;

            switch(target.tagName){
                case 'LI':
                    if(code) self._editor.setValue(code);
                    break;
                case 'SPAN':
                    self._removeSnippet(target.parentNode);
                    break;
                case 'A':
                    self._handleAddSnippetClick();
                    break;
            }
        }, false);
    },

    _removeSnippet: function(tabEl){
        var confirmed = confirm('Are you sure you would like to remove this snippet?');
        if(confirmed){
            var name = tabEl.innerHTML.match(/(^[^\<]+)/)[1];

            delete this._savedSnippets[name];
            localStorage['coderunner__editor-snippets'] = JSON.stringify(this._savedSnippets);

            this._wrapper.removeChild(tabEl);
        }
    },

    _handleAddSnippetClick: function(){
        var snippetName = prompt('Please enter a name for this snippet', 'Snippet #'+Object.keys(this._savedSnippets).length);
        if(!snippetName){
            alert('Thats not a valid snippet name');
        } else if(this._savedSnippets[snippetName]){
            alert('There is already a snippet with that name');
        } else {
            this._addSnippet(snippetName, this._editor.getValue(), true);
        }
    },

    _addSnippet: function(name, code, isNew){
        var el = document.createElement('li');
        el.className = 'tabs__tab';
        el.setAttribute('data-code', code);
        el.innerHTML = name+'<span>x</span>';
        this._wrapper.appendChild(el);

        if(isNew){
            this._savedSnippets[name] = code;
            localStorage['coderunner__editor-snippets'] = JSON.stringify(this._savedSnippets);
        }
    }

};