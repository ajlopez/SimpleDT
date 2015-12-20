
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
