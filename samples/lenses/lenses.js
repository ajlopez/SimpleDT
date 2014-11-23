
var analyzer = require('../../lib/analyzer');
var cases = require('./lenses.json');
var result = analyzer.infox(cases, 4);
console.dir(result);

var split = analyzer.split(cases, 3);

console.dir(split);

cases = split.normal;
result = analyzer.infox(cases, 4);
console.dir(result);

split = analyzer.split(cases, 2);
console.dir(split);

var casesno = split.no;
var casesyes = split.yes;

result = analyzer.infox(casesno, 4);
console.dir(result);


