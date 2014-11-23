
var simpledt = (function() {

var analyzer = (function () {
    function frequencies(cases, n) {
        var result = { };
        
        cases.forEach(function (c) {
            var value = c[n];
            
            if (!result[value])
                result[value] = 0;
                
            result[value]++;
        });
        
        return result;
    }
    
    function split(cases, n) {
        var result = { };
        
        cases.forEach(function (c) {
            var value = c[n];
            
            if (!result[value])
                result[value] = [];
                
            result[value].push(c);
        });
        
        return result;
    }
    
    function info(cases, n) {
        var result = 0;
        var ncases = cases.length;
        
        var spl = split(cases, n);
        
        for (var n in spl) {
            var freq = spl[n].length / ncases;
            var value = - Math.log(freq) / Math.log(2) * freq;
            result += value;
        }
        
        return result;
    }
    
    function infox(cases, n) {
        var ncases = cases.length;
        var result = { };
        
        for (var k in cases[0]) {
            if (k == n)
                continue;
                
            var spl = split(cases, k);
            
            if (Object.keys(spl).length == 1)
                continue;
            
            var total = 0;
            
            for (var j in spl)
                total += spl[j].length / ncases * info(spl[j], n); 
                
            result[k] = total;
        }
        
        return result;
    }
    
    return {
        frequencies: frequencies,
        split: split,
        info: info,
        infox: infox
    };
})();

if (typeof(window) === 'undefined')
    module.exports = analyzer;

if (typeof(analyzer) == 'undefined')
    var analyzer = require('./analyzer');

var simpledt = (function () {
    function tree(cases, n) {
        if (!cases || cases.length == 0)
            return { value: null };
            
        var freq = analyzer.frequencies(cases, n);
        
        if (Object.keys(freq).length == 1)
            return { value: cases[0][n] };
            
        var infox = analyzer.infox(cases, n);
        
        var attr = null;
        var minimum = null;
        
        for (var name in infox) {
            if (attr == null || minimum > infox[name]) {
                attr = name;
                minimum = infox[name];
            }
        }
        
        if (attr == null)
            return { values: Object.keys(freq) };
            
        var result = { attribute: attr, values: { } };
        
        var split = analyzer.split(cases, attr);
        
        for (var name in split)
            result.values[name] = tree(split[name], n);
            
        return result;
    }
    
    return {
        tree: tree
    }
})();
    
if (typeof(window) === 'undefined')
    module.exports = simpledt;
    return simpledt;

})();
