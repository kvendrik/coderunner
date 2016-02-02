var defaultSnippetsGetter = require('./defaultSnippets');

module.exports = {

    init: function(editor, getIsRunning){
        var self = this;

        this._wrapper = document.getElementsByClassName('js-snippets-list')[0];
        this._editor = editor;
        this._getIsRunning = getIsRunning;

        this._getSavedSnippets();

        this._snippetItems = [];
        this._activeSnippetItem = null;

        this._bindEvents();
        this._listSnippets();

        return {
            changeActiveSnippet: function(idx){
                self._changeActiveSnippet(idx);
            },
            saveCodeToActiveSnippet: function(code){
                var activeSnippet = self._getActiveSnippet();
                self._savedSnippets[activeSnippet.name] = code;
                localStorage['coderunner__editor-snippets'] = JSON.stringify(self._savedSnippets);
            }
        };
    },

    _getSavedSnippets: function(){
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

    _getActiveSnippet: function(){
        var snippetEl = this._activeSnippetItem;
        if(!snippetEl) return null;

        var name = snippetEl.getAttribute('data-name'),
            code = this._savedSnippets[name];

        return {
            name: name,
            code: code,
            el: snippetEl
        };
    },

    _changeActiveSnippet: function(elOrIdx){
        var items = this._snippetItems,
            newActiveItem = !isNaN(elOrIdx) ? items[elOrIdx] : elOrIdx;

        if(!newActiveItem) return;

        var name = newActiveItem.getAttribute('data-name'),
            code = this._savedSnippets[name];

        if(this._activeSnippetItem){
            this._activeSnippetItem.classList.remove('snippets-list__item--active');
        }

        newActiveItem.classList.add('snippets-list__item--active');
        this._activeSnippetItem = newActiveItem;

        this._editor.setValue(code);
    },

    _bindEvents: function(){
        var self = this,
            wrapper = this._wrapper;

        wrapper.addEventListener('click', function(e){
            var target = e.target;

            if(self._getIsRunning()) return;

            switch(target.tagName){
                case 'LI':
                    self._changeActiveSnippet(target);
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

    _removeSnippet: function(snippetEl){
        var confirmed = confirm('Are you sure you would like to remove this snippet?');
        if(confirmed){
            var name = snippetEl.getAttribute('data-name');

            delete this._savedSnippets[name];
            localStorage['coderunner__editor-snippets'] = JSON.stringify(this._savedSnippets);

            this._wrapper.removeChild(snippetEl);
        }
    },

    _handleAddSnippetClick: function(){
        var snippetName = prompt('Please enter a name for this snippet', 'Snippet #'+Object.keys(this._savedSnippets).length);
        if(snippetName === null) return;
        if(!snippetName){
            alert('Thats not a valid snippet name');
        } else if(this._savedSnippets[snippetName]){
            alert('There is already a snippet with that name');
        } else {
            this._addSnippet(snippetName, '', true);
        }
    },

    _addSnippet: function(name, code, isNew){
        var el = document.createElement('li');
        el.className = 'tabs__tab';
        el.setAttribute('data-name', name);
        el.innerHTML = name+'<span>x</span>';
        this._wrapper.appendChild(el);

        this._snippetItems.push(el);

        if(isNew){
            this._savedSnippets[name] = code;
            localStorage['coderunner__editor-snippets'] = JSON.stringify(this._savedSnippets);

            var idx = Object.keys(this._savedSnippets).length-1;
            this._changeActiveSnippet(idx);
        }
    }

};