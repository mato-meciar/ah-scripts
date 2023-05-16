// ==UserScript==
// @name         AccessHub Pending Tasks
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.3.2
// @description  Provides a clickable link to list of pending tasks for opened Security System
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubPendingTasks.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubPendingTasks.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.idaccesshub.com/ECM/securitysystems/show/*
// @match        *.saviyntcloud.com/ECM/securitysystems/show/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

(function() {
    'use strict';

    // function to fetch the security system id
    var getId = function getId() {
        return window.location.pathname.split('/').slice(-1)[0];
    };

    // function to add pending tasks button
    var addTasksButton = function(){
        var button = $('<a target="_blank" href="/ECM/workflowmanagement/pendingtasklist?securitysystem=' + getId() + '" class="btn blue"><i class="icon-info"></i>&nbsp;Show Pending Tasks</a>');
        $(this).prepend(button);
    };

    // add the pending tasks button to the page
    $("div[class*='form-actions right']").append(addTasksButton);

})();


