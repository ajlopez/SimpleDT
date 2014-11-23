
var Analyzer = (function () {
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
    
    return {
        frequencies: frequencies
    };
})();

if (typeof(window) === 'undefined')
    module.exports = Analyzer;
