
var simpledt = (function() {

"use strict"

var sl = require('simplelists');

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
    
    function splitval(cases, n, val) {
        var result = [];

        result[0] = [];
        result[1] = [];
        
        cases.forEach(function (c) {
            var value = c[n];
            
            if (value <= val)
                result[0].push(c);
            else
                result[1].push(c);
        });
        
        return result;
    }
    
    function info(cases, n) {
        var result = 0;
        var ncases = cases.length;
        
        var spl = split(cases, n);
        
        for (var j in spl) {
            var freq = spl[j].length / ncases;
            var value = - Math.log(freq) / Math.log(2) * freq;
            result += value;
        }
        
        return result;
    }
    
    function infoxval(cases, n, k) {
        var cases = sl.sort(cases, k);
        var ncases = cases.length;
        var result = [];
        
        for (var j = 0; j < ncases - 1; j++) {
            if (cases[j][k] == cases[j + 1][k])
                continue;
            
            var val = cases[j][k];
            
            var spl = splitval(cases, k, val);
            
            var total = 0;
            
            for (var i in spl)
                total += spl[i].length / ncases * info(spl[i], n);
            
            result[val] = total;
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
            
            if (typeof cases[0][k] === 'number') {
                var infos = infoxval(cases, n, k);
                
                var val = null;
                var minimum = null;
                
                for (var i in infos)
                    if (val == null || minimum > infos[i]) {
                        val = i;
                        minimum = infos[i];
                    }
                    
                result[k] = { value: val, infox: minimum };
                
                continue;
            }
            
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
        splitval: splitval,
        info: info,
        infox: infox,
        infoxval: infoxval
    };
})();

if (typeof(window) === 'undefined')
    module.exports = analyzer;

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
        var val = null;
        var minimum = null;
        
        for (var name in infox) {
            if (typeof infox[name] === 'number') {
                if (attr == null || minimum > infox[name]) {
                    attr = name;
                    val = null;
                    minimum = infox[name];
                }
            }
            else {
                if (attr == null || minimum > infox[name].infox) {
                    attr = name;
                    val = infox[name].value;
                    minimum = infox[name].infox;
                }
            }
        }
        
        if (attr == null)
            return { values: Object.keys(freq) };
            
        var result = { attribute: attr, values: { } };
        
        if (val == null) {
            var split = analyzer.split(cases, attr);
            for (var name in split)
                result.values[name] = tree(split[name], n);
        }
        else {
            var split = analyzer.splitval(cases, attr, parseFloat(val));
            
            result.values['<= ' + val] = tree(split[0], n);
            result.values['> ' + val] = tree(split[1], n);
        }        
            
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
