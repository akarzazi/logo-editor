var _ = _ || {};
_.throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

_.debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

_.serialize = function (obj, prefix) {
    var str = [], p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push((v !== null && typeof v === "object") ?
              _.serialize(v, k) :
              encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

_.paramsToJson = function (search) {
    if (!search)
        return {};

    var obj = {};
    var pairs = search.split('&');
    for (i in pairs) {
        var split = pairs[i].split('=');
        var attempted = decodeURIComponent(split[1]);
        obj[decodeURIComponent(split[0])] = isNaN(+attempted) || attempted == "" ? attempted : +attempted;
    }
    return obj;
}
_.isWebkit = function () {
    return 'WebkitAppearance' in document.documentElement.style && !/Edge/.test(navigator.userAgent);
}