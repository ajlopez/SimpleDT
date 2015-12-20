
"use strict"

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
