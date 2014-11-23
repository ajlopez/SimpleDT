
var analyzer = require('../lib/analyzer');

var cases = [
    [ 'value11', 'value21', 'class1' ],
    [ 'value12', 'value22', 'class1' ],
    [ 'value13', 'value21', 'class2' ],
    [ 'value14', 'value22', 'class2' ],
    [ 'value15', 'value23', 'class3' ]
];

exports['info cases'] = function (test) {
    var result = analyzer.info(cases, 2);
    
    test.ok(result);
    test.ok(result > 0);
};
