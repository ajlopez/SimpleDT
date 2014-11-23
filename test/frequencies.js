
var analyzer = require('../lib/analyzer');

var cases = [
    [ 'value11', 'value21', 'class1' ],
    [ 'value12', 'value22', 'class1' ],
    [ 'value13', 'value21', 'class2' ],
    [ 'value14', 'value22', 'class2' ],
    [ 'value15', 'value23', 'class3' ]
];

exports['no frequencies'] = function (test) {
    var freqs = analyzer.frequencies([], 2);
    
    test.ok(freqs);
    test.equal(typeof freqs, 'object');
    test.equal(Object.keys(freqs).length, 0);
};

exports['cases frequencies'] = function (test) {
    var freqs = analyzer.frequencies(cases, 2);
    
    test.ok(freqs);
    test.equal(typeof freqs, 'object');
    test.equal(Object.keys(freqs).length, 3);
    test.equal(freqs.class1, 2);
    test.equal(freqs.class2, 2);
    test.equal(freqs.class3, 1);
};

