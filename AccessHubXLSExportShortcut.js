// ==UserScript==
// @name         AccessHub XLS Export Shortcut
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.2
// @description  Provides a shortcut to XLS Export button
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubXLSExportShortcut.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubXLSExportShortcut.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        */ECM/analyticsConfig/runtimeanalytics/*
// @match        */ECM/analyticsHistoryES/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

if (/\/analyticsConfig\//.test (location.pathname)){
    (function() {
        'use strict';

        // function to add XLS Export button
        var addXLSExportButton = function() {
            var button = $("<a href=\"javascript:;\" onclick=\"exportdataTable('/ECM/analyticsHistory/detailsjson1?format=xls&amp;extension=xls','myDataTable',myDataTableQueryString)\" class=\"btn btn-primary\" style=\"margin: 0 10px 0 0;\"><i class=\"icon-download\"></i> Excel</a>");
            $(this).prepend(button);
        };

        // add the XLS Export button to the page
        $("div[class='btn-group']").append(addXLSExportButton);

    })();
} else if (/\/analyticsHistoryES\//.test (location.pathname)) {
    (function() {
        'use strict';

        // function to add XLS Export button
        var addXLSExportButtonES = function() {
            var onclick = $("a[class='excel']").attr('onclick').replaceAllStr('&', '&amp;').replaceAllStr('"', '&quot;');
            var button = $("<a class=\"excel btn btn-primary\" href=\"javascript:void(0);\" onclick=\"" + onclick + "\"><i class=\"icon-download\"></i> Excel</a>");
            $(this).prepend(button);
        };

        // add the XLS Export button to the page
        //$("div[class='portlet-title']").find("div[class='actions']").prepend(addXLSExportButtonES);

    })();
}
