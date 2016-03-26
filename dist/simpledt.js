
var simpledt = (function() {

"use strict"

var sl = (function() {
    function Set(name) {
        var set = { };
        
        this.add = function (item) {
            var key = item[name];
            
            if (set[key])
                return;
                
            set[key] = item;
        }
        
        this.remove = function (item) {
            var key = item[name];
            
            if (set[key])
                delete set[key];
        }
        
        this.elements = function () {
            var result = [];
            
            for (var n in set)
                result.push(set[n]);
                
            return result;
        }
    }
    
    function unique(list, name) {
        var set = new Set(name);
        
        list.forEach(function (item) {
            set.add(item);
        });
        
        return set.elements();
    }
    
    function union(list, list2, name) {
        var set = new Set(name);

        list.forEach(function (item) {
            set.add(item);
        });
        
        list2.forEach(function (item) {
            set.add(item);
        });
        
        return set.elements();
    }

    function intersect(list, list2, name) {
        var map1 = {};
        var map2 = {};
        
        list.forEach(function (item) {
            var key = item[name];
            
            if (key && !map1[key])
                map1[key] = item;
        });
        
        list2.forEach(function (item) {
            var key = item[name];
            
            if (key && !map2[key])
                map2[key] = item;
        });
        
        var mapresult = {};
        var result = [];
        
        for (var key in map1) {
            if (key && !mapresult[key] && map2[key]) {
                var item = map1[key];
                mapresult[key] = item;
                result.push(item);
            }
        }
        
        return result;
    }
    
    function diff(list, list2, name) {
        var set = new Set(name);

        list.forEach(function (item) {
            set.add(item);
        });
        
        list2.forEach(function (item) {
            set.remove(item);
        });
        
        return set.elements();
    }
    
    function sum(list, names) {
        if (Array.isArray(names)) {
            var accum = { };
            
            names.forEach(function (name) {
                accum[name] = 0;
            });
            
            list.forEach(function (item) {
                names.forEach(function (name) {
                    var newvalue = item[name] + accum[name];
                    
                    if (!isNaN(newvalue))
                        accum[name] = newvalue;
                });
            });
            
            return accum;
        }
        else {
            var total = 0;
            var name = names;
        
            list.forEach(function (item) {
                var newvalue = total + item[name];
                
                if (!isNaN(newvalue))
                    total = newvalue;
            });
            
            return total;
        }
    }

    function aggr(list, key, names) {
        if (!Array.isArray(names))
            names = [names];
        
        var accums = { };
        
        list.forEach(function (item) {
            var ky = item[key];
            
            if (!accums[ky]) {
                var accum = { };
                accum[key] = ky;
                
                names.forEach(function (name) {
                    accum[name] = 0;
                });
                
                accums[ky] = accum;
            }
            
            var accum = accums[ky];
            
            names.forEach(function (name) {
                var newvalue = item[name] + accum[name];
                
                if (!isNaN(newvalue))
                    accum[name] = newvalue;
            });
        });
        
        var result = [];
        
        for (var n in accums)
            result.push(accums[n]);
            
        return result;
    }

    function project(list, names) {
        var result = [];
        
        if (typeof names == 'string')
            names = [names];

        if (typeof names == 'object' && !Array.isArray(names)) {
            list.forEach(function (item) {
                var newitem = { };
                
                for (var n in names)
                    newitem[names[n]] = item[n];

                result.push(newitem);
            });
        }
        else {
            list.forEach(function (item) {
                var newitem = { };
                
                names.forEach(function (name) {
                    newitem[name] = item[name];
                });
                
                result.push(newitem);
            });
        }
        
        return result;
    }
    
    function where(list, filter) {
        var result = [];
        
        if (typeof filter == 'function')
            list.forEach(function (item) {
                if (filter(item))
                    result.push(item);
            });
        else        
            list.forEach(function (item) {
                if (satisfy(item, filter))
                    result.push(item);
            });
        
        return result;
    }
    
    function first(list, filter) {
        if (typeof filter == 'function')
            for (var n in list) {
                var item = list[n];
                if (filter(item))
                    return item;
            }            
        else
            for (var n in list) {
                var item = list[n];
                if (satisfy(item, filter))
                    return item;
            }
        
        return null;
    }
    
    function count(list, filter) {
        if (!filter)
            return Object.keys(list).length;
            
        var result = 0;
        
        if (typeof filter == 'function')
            list.forEach(function (item) {
                if (filter(item))
                    result++;
            });
        else        
            list.forEach(function (item) {
                if (satisfy(item, filter))
                    result++;
            });
        
        return result;
    }
    
    function exist(list, filter) {
        if (typeof filter == 'function')
            for (var n in list) {
                var item = list[n];
                if (filter(item))
                    return true;
            }
        else        
            for (var n in list) {
                var item = list[n];
                if (satisfy(item, filter))
                    return true;
            }
        
        return false;
    }
    
    function all(list, filter) {
        for (var n in list) {
            var item = list[n];
            if (!satisfy(item, filter))
                return false;
        }
        
        return true;
    }
    
    function sort(list, name, descending) {
        var result = clone(list);
        
        result.sort(function (a, b) {
            var aval = a[name];
            var bval = b[name];
            
            if (aval < bval)
                if (descending)
                    return 1;
                else
                    return -1;
                
            if (aval > bval)
                if (descending)
                    return -1;
                else
                    return 1;
                
            return 0;
        });
        
        return result;
    }
    
    function clone(list) {
        return list.slice(0);
    }
    
    function satisfy(item, filter) {
        var type = typeof filter;
        
        if (type === 'function')
            return filter(item);
 
        if (type === 'string')
            return item[filter] !== undefined;

        if (type === 'object' && Array.isArray(filter)) {
            for (var n in filter)
                if (!satisfy(item, filter[n]))
                    return false;
                    
            return true;
        }
        
        for (var n in filter)
            if (item[n] != filter[n])
                return false;
                
        return true;
    }
    
    return {
        project: project,
        sort: sort,
        where: where,
        first: first,
        unique: unique,
        union: union,
        intersect: intersect,
        diff: diff,
        sum: sum,
        aggr: aggr,
        count: count,
        exist: exist,
        all: all
    }
})();


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
