
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
