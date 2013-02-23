describe('tagger', function() {
    var tagger = require('../tagger');
    var collection;

    describe('tagAll', function() {
        it('should add tags to elements in an array', function() {
            collection = [{}, {}, {}];
            tagger.tagAll(collection, ['tag1', 'tag2']);
            expect(collection[0].tags['tag1']).toBe(true);
            expect(collection[0].tags['tag2']).toBe(true);
            expect(collection[0].tags['tag3']).not.toBe(true);
            expect(collection[1].tags['tag1']).toBe(true);
            expect(collection[1].tags['tag2']).toBe(true);
            expect(collection[1].tags['tag3']).not.toBe(true);

        });

        it('should add tags to elements in an object', function() {
            collection = {element1: {}, element2: {}, element3: {}};
            tagger.tagAll(collection, ['tag1', 'tag2']);
            expect(collection.element1.tags['tag1']).toBe(true);
            expect(collection.element1.tags['tag2']).toBe(true);
            expect(collection.element1.tags['tag3']).not.toBe(true);
            expect(collection.element2.tags['tag1']).toBe(true);
            expect(collection.element2.tags['tag2']).toBe(true);
            expect(collection.element2.tags['tag3']).not.toBe(true);
        });

        it('should be able to set a single tag specified in a string instead of an array of tags', function() {
            collection = [{}, {}, {}];
            tagger.tagAll(collection, 'myTag');
            expect(collection[0].tags['myTag']).toBe(true);
        });

        it('should be able to conditionally add tags to elements in a collection', function() {
            collection = [{value: 1}, {value: 2}, {value: 3}];
            tagger.tagAll(collection, ['myTag'], function(element) {
                return element.value > 2;
            });
            expect(collection[0].tags).toBe(undefined);
            expect(collection[1].tags).toBe(undefined);
            expect(collection[2].tags.myTag).toBe(true);
        });
    });

    describe('unTagAll', function() {
        it('should unset tags from elements in a collection', function() {
            collection = [{tags: {tag1: false, tag2: true}}, {tags: {tag2: true}}, {tags: {tag3: true}}];
            tagger.unTagAll(collection, ['tag1', 'tag2']);
            expect(collection[0].tags.tag1).toBe(false);
            expect(collection[0].tags.tag2).toBe(false);
            expect(collection[1].tags.tag2).toBe(false);
            expect(collection[2].tags.tag3).toBe(true);
        });
    });

    describe('toggleAll', function() {
        it('should toggle tags from elements in a collection', function() {
            collection = [
                {tags:{tag1:true, tag2: false}},
                {tags:{tag1:false, tag2: false}},
                {tags:{tag3:true, tag1: false}}
            ];
            tagger.toggleAll(collection, ['tag1']);
            expect(collection[0].tags.tag1).toBe(false);
            expect(collection[0].tags.tag2).toBe(false);
            expect(collection[1].tags.tag1).toBe(true);
            expect(collection[1].tags.tag2).toBe(false);
            expect(collection[2].tags.tag1).toBe(true);
            expect(collection[2].tags.tag3).toBe(true);
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
