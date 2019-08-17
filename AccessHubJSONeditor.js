// ==UserScript==
// @name         AccessHub JSON editor
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.2.2
// @description  Provides a clickable button for editing connections in better editor
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubJSONeditor.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubJSONeditor.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.idaccesshub.com/ECM/ecmConfig/addnewconnection/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

(function() {
    'use strict';

    //function to send json to our separate json editor app
    var editInNewTab = function(json, type){
        var w = window.open('https://ah-json-editor.w3ibm.mybluemix.net/#/edit?json=' + encodeURIComponent(json) + '&type=' + encodeURIComponent(type));
    };

    var findConnectionType = function(){
        //console.log($("div#s2id_externalconnectiontype >> span.select2-chosen").first().text().trim());
        var connectionType = $("div#s2id_externalconnectiontype >> span.select2-chosen").first().text().trim();
        return connectionType;
    };

    //function to add super edit button and functionality to json editing
    var addSuperEditButton = function(){
        //console.log("adding button ...");
        var button = $('<input type="button" value="SuperEdit">');
        var taJson = $(this);
        var connectionType = findConnectionType();
        button.click(function(){
            //console.log(taJson.val());
            editInNewTab(taJson.val(), connectionType);
        });
        $(this).parent().append(button);
    };


    //add the superedit button to jsons
    $("textarea[name*='Json']").each(addSuperEditButton);
    $("textarea[name*='JSON']").each(addSuperEditButton);

})();
