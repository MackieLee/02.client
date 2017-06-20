/**
 * Created by DELL on 2017/6/16.
 */
window.jQuery || document.write("<script src='../assets/js/jquery.js'>" + "<" + "/script>");

var Common = {
    URL: "http://localhost:21000/",
    AJAX: {
        jsonp: function (executor, params, isAsync) {
            $.ajax({
                url: Common.URL,

                async: isAsync == undefined ? true : false
            });
        }
    },
    DomLoadBeforePage: function (pathUrl, scriptObjs, styleObjs) {
        if (scriptObjs != null) {
            for (var i = 0; i < scriptObjs.length; i++) {
                document.write("<script src='" + pathUrl + scriptObjs[i] + "'></script>");
            }
        }

        if (styleObjs != null) {
            for (var i = 0; i < styleObjs.length; i++) {
                document.write("<link rel='stylesheet' href='" + pathUrl + styleObjs[i] + "'></link>");
            }
        }
    }
}