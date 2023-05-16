// ==UserScript==
// @name         AccessHub Better Logs
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.3.1
// @description  Ignore the 1000 lines limitation when fetching logs
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubBetterLogs.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubBetterLogs.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.idaccesshub.com/ECM/logs/showLogs*
// @match        *.saviyntcloud.com/ECM/logs/showLogs*
// @grant        none
// @run-at       document-body
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==


$(document).ready(function() {
    let button = $('.btn-logs')[0]
    let icon = document.createElement('i')
    icon.setAttribute('class', 'icon-refresh')
    button.innerHTML = button.innerHTML.replace('Get Logs', 'Better Logs')
    button.setAttribute('onclick', 'document.forms.displayLogs.submit()')

    var checkExist = setInterval(function() {
        if (document.getElementById('loggers')) {
            let logView = document.getElementById('loggers')
            logView.removeAttribute('disabled')
            logView.setAttribute('readonly', '')
            logView.setAttribute('style', 'background-color: black !important; color: white !important; font-family: "Helvetica" !important; font-size: 14px !important;')
            clearInterval(checkExist);
        }
    }, 1000);
})
