window.ehound_APIKEY = ehound_GetAPIKey();

function ehound_GetAPIKey() {
    var myScript;

    var scripts = document.getElementsByTagName('script');
    for (var s in scripts) {
        var scriptSrc = (scripts[s].src) ? scripts[s].src : '';
        if (scriptSrc.indexOf('ehoundplatform.com/api/') > 0 && (
                scriptSrc.indexOf('proximity.js') > 0 ||
                scriptSrc.indexOf('proximitySSL.js') > 0)) {
            myScript = scripts[s];
        }
    }
    var queryString = myScript.src.replace(/^[^\?]+\??/, '');
    var KeyVal = queryString.split('=');
    var apiKey = KeyVal[1];

    return apiKey;
}

function ehound_Search() {
    this.point = undefined;
    this.count = undefined;
    this.max_distance = undefined;
    this.filters = undefined;
    this.logic = undefined;
    this.priority_distance = undefined;
    this.priority_filters = undefined;
    this.priority_logic = undefined;
    this.log_type = 'web';
    this.create_log = true;
    this.custom_logic = undefined;
    this.user_selection = undefined;
}

function ehound_SearchFilter(a, b, c) {
    this["field"] = a;
    this["operator"] = b;
    this["value"] = c;
}

ehound_SearchFilter.prototype.toString = function () {
    return this["field"] + ":" + this["operator"] + ":" + this["value"];
};

function ehound_LatLon(b, c) {
    this.lat = b;
    this.lon = c;
}

function ehound_Location(d) {
    //this.address=undefined;
    this.coords = undefined;

    if (typeof(arguments[0]) == "number" && typeof(arguments[1]) == "number") {
        this.coords = new ehound_LatLon(arguments[0], arguments[1]);
    } else {
        if (typeof(arguments[0]) == "string") {
            //this.address=new MMAddress({qs:arguments[0]})
        } else {
            for (var c = 0, b = arguments.length; c < b; ++c) {
                if (arguments[c] instanceof ehound_LatLon) {
                    this.coords = arguments[c];
                }
            }
        }
    }
}

function eHound(callBackFunc) {
    this.record_set = undefined;
    this.error_code = undefined;
    this.error_message = undefined;
    this.key = window.ehound_APIKEY;
    this.call_back = callBackFunc;
}

eHound.prototype.proximitySearch = function (c) {
    this.reset();
    var proximityRequest = "//app.ehoundplatform.com/api/1.3/proximity_search"
        + "?output=json"
        + "&jsonp=" + (this.call_back)
        + "&lat=" + (c.point.coords.lat)
        + "&lon=" + (c.point.coords.lon)
        + "&count=" + (c.count)
        + "&geo=" + (c.search_type)
        + "&service=" + (c.search_service)
        + "&max_distance=" + (c.max_distance)
        + "&filters=" + (c.filters)
        + "&logic=" + (c.logic)
        + "&priority_distance=" + (c.priority_distance)
        + "&priority_filters=" + (c.priority_filters)
        + "&priority_logic=" + (c.priority_logic)
        + "&log_type=" + (c.log_type)
        + "&create_log=" + (c.create_log)
        + "&api_key=" + (window.ehound_APIKEY)
        + "&custom_logic=" + (c.custom_logic)
        + "&user_selection=" + (c.user_selection)
        + "&ch=" + Math.floor(Math.random() * 10001);
    callProximityService(proximityRequest);
};
eHound.prototype.reset = function () {
    this.record_set = null;
    this.error_code = null;
    this.error_message = null;
};

function callProximityService(request) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    document.body.appendChild(script);
}
