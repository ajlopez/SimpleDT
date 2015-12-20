
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

exports['info subcases with a numeric column'] = function (test) {
    var cases = [
        [ 3.5, 'value21', 'class2' ],
        [ 1.1, 'value21', 'class1' ],
        [ 1.1, 'value22', 'class1' ],
        [ 4.2, 'value23', 'class3' ]
    ];

    var result = analyzer.infox(cases, 2);

    test.ok(result);
    test.equal(Object.keys(result).length, 2);
    test.ok(result[0].infox >= 0);
    test.ok(parseFloat(result[0].value) >= 0);
    test.ok(result[1] >= 0);
};

exports['info subcases with a definitive numeric column'] = function (test) {
    var cases = [
        [ 2, 'class1' ],
        [ 1, 'class1' ],
        [ 4, 'class2' ],
        [ 3, 'class2' ]
    ];

    var result = analyzer.infoxval(cases, 1, 0);

    test.ok(result);
    console.dir(result);
    test.equal(Object.keys(result).length, 3);
    test.ok(result[1] >= 0);
    test.ok(result[2] >= 0);
    test.ok(result[3] >= 0);
};

exports['infox by columns values'] = function (test) {
    var cases = [
        [ 3.5, 'value21', 'class2' ],
        [ 1.1, 'value21', 'class1' ],
        [ 1.1, 'value22', 'class1' ],
        [ 4.2, 'value23', 'class3' ]
    ];
    
    var result = analyzer.infoxval(cases, 2, 0);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(Object.keys(result).length, 2);
    test.ok(result[1.1]);
    test.ok(result[3.5]);
    test.ok(result[1.1] > 0);
    test.ok(result[3.5] > 0);
};

