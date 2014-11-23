
var analyzer = require('../lib/analyzer');

var cases = [
    [ 'value11', 'value21', 'class1' ],
    [ 'value12', 'value22', 'class1' ],
    [ 'value13', 'value21', 'class2' ],
    [ 'value12', 'value22', 'class2' ],
    [ 'value12', 'value23', 'class3' ]
];

exports['info cases'] = function (test) {
    var result = analyzer.info(cases, 2);
    
    console.dir(result);
    test.ok(result);
    test.ok(result > 0);
};

exports['info subcases'] = function (test) {
    var result = analyzer.infox(cases, 2);

    console.dir(result);
    test.ok(result);
    test.equal(Object.keys(result).length, 2);
    test.ok(result[0] >= 0);
    test.ok(result[1] >= 0);
};

