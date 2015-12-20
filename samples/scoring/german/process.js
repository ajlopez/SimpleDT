
var sdt = require('../../..');

var fs = require('fs');

var filetext = fs.readFileSync('german.data.txt').toString();

var lines = filetext.split('\n');

for (var k in lines)
    lines[k] = lines[k].trim();
    
var data = [];

for (var k in lines) {
    var values = lines[k].split(' ');
    for (var j in values) {
        var value = values[j];
        
        if (value[0] >= '0' && value[0] <= '9')
            values[j] = parseInt(value);
    }
    data.push(values);
}

var tree = sdt.tree(data, data[0].length - 1);

console.log(JSON.stringify(tree, null, 4));