// ==UserScript==
// @name         AccessHub XLS Export Shortcut
// @version      0.2
// @namespace    https://greasyfork.org/users/326979
// @description  try to take over the world!
// @author       Martin Meciar
// @homepageURL  https://gist.githubusercontent.com/mato-meciar/46f400ff48284ea69025ec63f884edcf/
// @updateURL    https://gist.githubusercontent.com/mato-meciar/46f400ff48284ea69025ec63f884edcf/raw/AccessHub%2520XLS%2520Export%2520Shortcut.js
// @downloadURL  https://gist.githubusercontent.com/mato-meciar/46f400ff48284ea69025ec63f884edcf/raw/AccessHub%2520XLS%2520Export%2520Shortcut.js
// @supportURL   https://gist.githubusercontent.com/mato-meciar/46f400ff48284ea69025ec63f884edcf/
// @match        *.idaccesshub.com/ECM/jbpmworkflowmanagement/showrequestdetails/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

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
