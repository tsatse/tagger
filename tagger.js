(function(root) {
    function definitionFunction() {
        function _tagElement(tags, element) {
            if(element.tags === undefined) {
                element.tags = {};
            }
            tags.forEach(function(tag) {
                element.tags[tag] = true;
            });
        }

        function tag(collection, tags) {
            var keys,
                i;

            _walk(collection, function(element) {
                _tagElement(tags, element);
            });
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
        root.yajefa = definitionFunction();
    }
})(this);
