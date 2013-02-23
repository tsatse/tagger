describe('tagger', function() {
    var tagger = require('../tagger');
    var collection;
    describe('tag_all', function() {
        
        it('should successfuly add tags to elements in an array', function() {
            collection = [{}, {}, {}];
            tagger.tag_all(collection, ['tag1', 'tag2']);
            expect(collection[0].tags['tag1']).toBe(true);
            expect(collection[0].tags['tag2']).toBe(true);
            expect(collection[0].tags['tag3']).not.toBe(true);
            expect(collection[1].tags['tag1']).toBe(true);
            expect(collection[1].tags['tag2']).toBe(true);
            expect(collection[1].tags['tag3']).not.toBe(true);

        });

        it('should successfuly add tags to elements in an object', function() {
            collection = {element1: {}, element2: {}, element3: {}};
            tagger.tag_all(collection, ['tag1', 'tag2']);
            expect(collection.element1.tags['tag1']).toBe(true);
            expect(collection.element1.tags['tag2']).toBe(true);
            expect(collection.element1.tags['tag3']).not.toBe(true);
            expect(collection.element2.tags['tag1']).toBe(true);
            expect(collection.element2.tags['tag2']).toBe(true);
            expect(collection.element2.tags['tag3']).not.toBe(true);
        });
    });

    describe('apply', function() {
        it('should only call the callback on array elements that have the specified tags', function() {
            var sum = 0;
            collection = [
                {tags: {tag1: true}, value: 1},
                {tags: {tag2: true}, value: 10},
                {tags: {tag1: true, tag2: true}, value: 100}
            ];
            tagger.apply(function(element){sum += element.value;}, collection, ['tag1']);
            expect(sum).toBe(101);
        });

        it('should only call the callback on object elements that have the specified tags', function() {
            var sum = 0;
            collection = {
                element1: {tags: {tag1: true}, value: 1},
                element2: {tags: {tag2: true}, value: 10},
                element3: {tags: {tag1: true, tag2: true}, value: 100}
            };
            tagger.apply(function(element){sum += element.value;}, collection, ['tag1']);
            expect(sum).toBe(101);
        });
    });
});
