
var sdt = require('../..');

var fs = require('fs');

var filetext = fs.readFileSync('startups.data.txt').toString();

var lines = filetext.split('\n');

for (var k in lines)
    lines[k] = lines[k].trim();
    
var data = [];

for (var k in lines) {
	if (k == 0)
		continue;
	
    var values = lines[k].split(',');
	
    for (var j in values) {
        var value = values[j];
        
        if (value[0] >= '0' && value[0] <= '9')
            values[j] = parseFloat(value);
    }
	
	values[values.length - 1] = Math.floor(10 * values[values.length - 1] / (values[0] + values[1] + values[2]));
	
    data.push(values);
}

console.dir(data);

var tree = sdt.tree(data, data[0].length - 1);

console.log(JSON.stringify(tree, null, 4));