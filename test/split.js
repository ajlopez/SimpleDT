
var analyzer = require('../lib/analyzer');
var sl = require('simplelists');

var cases = [
    [ 'value11', 'value21', 'class1' ],
    [ 'value12', 'value22', 'class1' ],
    [ 'value13', 'value21', 'class2' ],
    [ 'value14', 'value22', 'class2' ],
    [ 'value15', 'value23', 'class3' ]
];

exports['split empty cases'] = function (test) {
    var result = analyzer.split([], 2);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(Object.keys(result).length, 0);
};

exports['split cases by class'] = function (test) {
    var result = analyzer.split(cases, 2);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(Object.keys(result).length, 3);
    
    test.ok(result.class1);
    test.ok(Array.isArray(result.class1));
    test.equal(result.class1.length, 2);
    
    for (var k = 0; k < result.class1.length; k++)
        test.equal(result.class1[k][2], 'class1');
    
    test.ok(result.class2);
    test.ok(Array.isArray(result.class2));
    test.equal(result.class2.length, 2);
    
    for (var k = 0; k < result.class2.length; k++)
        test.equal(result.class2[k][2], 'class2');
    
    test.ok(result.class3);
    test.ok(Array.isArray(result.class3));
    test.equal(result.class3.length, 1);
    
    for (var k = 0; k < result.class3.length; k++)
        test.equal(result.class3[k][2], 'class3');
};

exports['split by column value'] = function (test) {
    var cases = [
        [ 1, 'value21', 'class1' ],
        [ 1, 'value22', 'class1' ],
        [ 3, 'value21', 'class2' ],
        [ 4, 'value22', 'class2' ],
        [ 4, 'value23', 'class3' ]
    ];
    
    var result = analyzer.splitval(cases, 0, 2);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 2);
    
    sl.all(result[0], function (item) { return item[0] <= 2 });
    sl.all(result[1], function (item) { return item[0] > 2 });
};


