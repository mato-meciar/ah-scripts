// ==UserScript==
// @name         AccessHub Pending Tasks
// @version      0.3.1
// @namespace    https://greasyfork.org/users/326979
// @description  try to take over the world!
// @author       Martin Meciar
// @homepageURL  https://gist.githubusercontent.com/mato-meciar/f78a2c2b654a591326c16904531e1b70/
// @updateURL    https://gist.githubusercontent.com/mato-meciar/f78a2c2b654a591326c16904531e1b70/raw/AccessHub%2520Pending%2520Tasks.js
// @downloadURL  https://gist.githubusercontent.com/mato-meciar/f78a2c2b654a591326c16904531e1b70/raw/AccessHub%2520Pending%2520Tasks.js
// @supportURL   https://gist.githubusercontent.com/mato-meciar/f78a2c2b654a591326c16904531e1b70/
// @match        *.idaccesshub.com/ECM/jbpmworkflowmanagement/showrequestdetails/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

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


