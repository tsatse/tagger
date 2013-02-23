(function(root) {
    function definitionFunction() {
        function _setTagValue(element, tags, newValue) {
            if(element.tags === undefined) {
                if(newValue !== false) {
                    element.tags = {};
                }
                else {
                    return;
                }
            }
            if(!(tags instanceof Array)) {
                tags = [tags];
            }
            tags.forEach(function(tag, index, array) {
                if(typeof newValue === 'function') {
                    element.tags[tag] = newValue(element.tags, tag);
                }
                else {
                    element.tags[tag] = newValue;
                }
            });
        }

        function toggleTag(element, tags) {
            _setTagValue(element, tags, function(elementTags, tagName) {return !elementTags[tagName];});
        }

        function tag(element, tags) {
            _setTagValue(element, tags, true);
        }

        function unTag(element, tags) {
            _setTagValue(element, tags, false);
        }

        function _forAll(collection, tags, action, condition) {
            var keys,
                i;
            _walk(collection, function(element) {
                if(typeof condition !== 'function' || condition(element)) {
                    action(element, tags);
                }
            });
        }

        function tagAll(collection, tags, condition) {
            _forAll(collection, tags, tag, condition);
        }

        function unTagAll(collection, tags, condition) {
            _forAll(collection, tags, unTag, condition);
        }

        function toggleAll(collection, tags, condition) {
            _forAll(collection, tags, toggleTag, condition);
        }

        function _walk(collection, callback) {
            var keys,
                i;

            console.log('walking ' + collection);
            if(collection instanceof Array) {
                collection.forEach(callback);
            }
            else if(typeof collection === 'object') {
                keys = Object.keys(collection);
                for(i = 0 ; i < keys.length ; i++) {
                    callback(collection[keys[i]]);
                }
            }
            else {
                console.log('tagger: invalid type for collection ' + typeof collection);
            }
        }

        function _matchTags(candidates, reference) {
            var result = true;
            candidates.forEach(function(candidate) {
                if(!reference[candidate]) {
                    result = false;
                }
            });
            return result;
        }

        function apply(callback, collection, tags) {
            _walk(collection, function(element) {
                if(_matchTags(tags, element.tags)) {
                    callback(element);
                }
            });
        }

        return {
            tag: tag,
            unTag: unTag,
            toggleTag: toggleTag,
            tagAll: tagAll,
            unTagAll: unTagAll,
            toggleAll: toggleAll,
            apply: apply
        };
    }
    if ( typeof define === 'function' && define.amd ) {
        define(definitionFunction);
    }
    else if ( typeof module === 'object' && module.exports ) {
        module.exports = definitionFunction();
    }
    else {
        root.tagger = definitionFunction();
    }
})(this);
