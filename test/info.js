
var analyzer = require('../lib/analyzer');
var sl = require('simplelists');

var cases = [
    [ 'value11', 'value21', 'class1' ],
    [ 'value12', 'value22', 'class1' ],
    [ 'value13', 'value21', 'class2' ],
    [ 'value12', 'value22', 'class2' ],
    [ 'value12', 'value23', 'class3' ]
];

exports['info cases'] = function (test) {
    var result = analyzer.info(cases, 2);
    
    test.ok(result);
    test.ok(result > 0);
};

exports['info subcases'] = function (test) {
    var result = analyzer.infox(cases, 2);

    test.ok(result);
    test.equal(Object.keys(result).length, 2);
    test.ok(result[0] >= 0);
    test.ok(result[1] >= 0);
};

exports['info subcases'] = function (test) {
    var result = analyzer.infox(cases, 2);

    test.ok(result);
    test.equal(Object.keys(result).length, 2);
    test.ok(result[0] >= 0);
    test.ok(result[1] >= 0);
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

