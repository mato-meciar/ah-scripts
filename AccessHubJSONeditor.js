// ==UserScript==
// @name         AccessHub JSON editor
// @version      0.2.2
// @namespace    https://greasyfork.org/users/326979
// @description  try to take over the world!
// @author       Vincek
// @homepageURL  https://gist.githubusercontent.com/mato-meciar/3da45264035088fdcdede215702997e7/
// @updateURL    https://gist.githubusercontent.com/mato-meciar/3da45264035088fdcdede215702997e7/raw/AccessHub%2520JSON%2520editor.js
// @downloadURL  https://gist.githubusercontent.com/mato-meciar/3da45264035088fdcdede215702997e7/raw/AccessHub%2520JSON%2520editor.js
// @supportURL   https://gist.githubusercontent.com/mato-meciar/3da45264035088fdcdede215702997e7/
// @match        *.idaccesshub.com/ECM/jbpmworkflowmanagement/showrequestdetails/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

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
