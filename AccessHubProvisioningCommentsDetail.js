// ==UserScript==
// @name         AccessHub Provisioning Comments Detail
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2024, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.3.5
// @description  Provides a clickable provisioning comments detail for pending & completed tasks
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubConnectionDetail.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubConnectionDetail.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        https://*.idaccesshub.com/ECM/workflowmanagement/completetasklist*
// @match        https://*.idaccesshub.com/ECM/workflowmanagement/pendingtasklist*
// @match        https://*.saviyntcloud.com/ECM/workflowmanagement/completetasklist*
// @match        https://*.saviyntcloud.com/ECM/workflowmanagement/pendingtasklist*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

// prepare and inject the script into the page
$(document).ready(function () {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.innerHTML = `
function getWordsBetweenCurlies(str) {
    var results = [],
        re = /{([^}]+)}/g,
        text;
    while ((text = re.exec(str))) {
        //console.log("Value of text 1: "+!(text[1].match(/kibanaURL/g).length!=0))
        if (text[1].indexOf(".") == -1) {
            if (text[1].match(/KIBANA_URL/g) != null) {
                if (text[1].match(/KIBANA_URL/g).length != 0) {
                    //results.push(text[1]);
                }
            } else {
                if (results.indexOf(text[1]) < 0)
                    /*SD-3077 •  SQL analytics control are not getting created. resolved this*/
                    results.push(text[1]);
            }
        }
    }
    //results = [...new Set(results)]  //SD-2370 This is not a systax error it looping through logic in grails to Create array of unique set data. Browser will understand this
    return results;
}
function showPreview(taskID) {
    var analyticsQryVal = "";
    var externalConnection = "";
    analyticsQryVal =
        "select taskkey, provisioningcomments from arstasks where taskkey = " + taskID;

    var runtime = "false";
    var sqlAnalytics = "true";

    console.log("inside the else block of details preview");
    let completepath = "/ECM/analyticsConfig/detailspreview";
    console.log(
        "analyticsQryVal :" +
        analyticsQryVal +
        " runtime :" +
        runtime +
        " sqlAnalytics :" +
        sqlAnalytics +
        " externalConnection :" +
        externalConnection
    );

    $.ajax({
        async: true,
        url: completepath,
        type: "post",
        dataType: "html",
        data: {
            analyticsQry: analyticsQryVal,
            runtime: runtime,
            sqlAnalytics: sqlAnalytics,
            externalConnection: externalConnection
        },
        success: function (returnData) {
            $(".opened-dialogs").dialog("close");

            $('<div class="opened-dialogs">')
                .html("loading...")
                .dialog({
                    position: ["center", 70],
                    open: function () {
                        $(this).html(returnData);
                        $(".ui-widget-overlay").css("background", "black"); //write background color change code here
                    },
                    close: function (event, ui) {
                        $(this).remove();
                    },

                    title: "TEST",
                    minWidth: 900,
                    modal: true,
                    draggable: false,
                    resizable: true,
                    show: { effect: "fade" },
                    hide: { effect: "fade" },
                    width: 900,
                    dialogClass: "ui-dialog-osx"
                });
        },
        error: function (e) { }
    });
}
`;
  $("head").append(s);
});

// wait for the table data to load, then add details button
function waitForElementToDisplay(selector, time) {
  if (!document.querySelector(selector) || document.querySelector(selector) != null) {
    let i = 1
    let max = parseInt(document.getElementsByName('usersList_length')[0].selectedOptions[0].value)
//  not needed for now
//    if (!$('body > div.footer > div.footer-inner')[0].innerText.includes('5.4')) {
//      i = 7
//      max += 6
//    }
    for (i; i <= max; i++) {
      let element = document.getElementsByTagName('tr')[i].getElementsByTagName('td')[1]
      let taskID = element.innerHTML
      element.innerHTML = `<button class="btn purple" type="button" id="yui-gen${i}-button" onclick="showPreview(${taskID})"><i class="icon-eye-open"></i> ${taskID}</button>`
    }
    return;
  }
  else {
    setTimeout(function () {
      waitForElementToDisplay(selector, time);
    }, time);
  }
}

// set up a mutation observer that re-adds the details buttons when user changes the amount of shown rows or filters the results
var mutationObserver = new MutationObserver(function (mutations) {
  waitForElementToDisplay('.btn-xs', 2000);
  //mutations.forEach(function(mutation) {
  //});
});

// set the mutation observer to check for the data table changes
mutationObserver.observe(document.getElementById('usersList'), {
  attributes: true,
  characterData: false,
  childList: false,
  subtree: true,
  attributeOldValue: false,
  characterDataOldValue: false,
});
