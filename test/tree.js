
var simpledt = require('..');

exports['tree with no cases'] = function (test) {
    var tree = simpledt.tree([], 2);
    
    test.ok(tree);
    test.equal(typeof tree, 'object');
    test.equal(tree.value, null);
}

exports['tree with only one value'] = function (test) {
    var tree = simpledt.tree([
        [ 'value1', 'class1' ],
        [ 'value2', 'class1' ]
    ], 1);
    
    test.ok(tree);
    test.equal(typeof tree, 'object');
    test.equal(tree.value, 'class1');
}

exports['tree with definitive attribute'] = function (test) {
    var tree = simpledt.tree([
        [ 'value1', 'class1' ],
        [ 'value2', 'class1' ],
        [ 'value3', 'class2' ],
        [ 'value4', 'class2' ]
    ], 1);
    
    test.ok(tree);
    test.equal(typeof tree, 'object');
    test.equal(tree.attribute, 0);
    test.ok(tree.values);
    test.ok(tree.values.value1);
    test.equal(tree.values.value1.value, 'class1');
    test.ok(tree.values.value2);
    test.equal(tree.values.value2.value, 'class1');
    test.ok(tree.values.value3);
    test.equal(tree.values.value3.value, 'class2');
    test.ok(tree.values.value4);
    test.equal(tree.values.value4.value, 'class2');
}

exports['tree with definitive numeric attribute'] = function (test) {
    var tree = simpledt.tree([
        [ 2, 'class1' ],
        [ 1, 'class1' ],
        [ 4, 'class2' ],
        [ 3, 'class2' ]
    ], 1);
    
    test.ok(tree);
    test.equal(typeof tree, 'object');
    test.equal(tree.attribute, 0);
    test.ok(tree.values);
    console.dir(tree);
    test.ok(tree.values['<= 2']);
    test.equal(tree.values['<= 2'].value, 'class1');
    test.ok(tree.values['> 2']);
    test.equal(tree.values['> 2'].value, 'class2');
}
