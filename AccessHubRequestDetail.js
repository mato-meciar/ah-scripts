// ==UserScript==
// @name         AccessHub Request Detail
// @version      0.4.4
// @namespace    https://greasyfork.org/users/326979
// @description  try to take over the world!
// @author       Martin Meciar
// @homepageURL  https://gist.githubusercontent.com/mato-meciar/4080cf002230507fe73ba47f55ba2146/
// @updateURL    https://gist.githubusercontent.com/mato-meciar/4080cf002230507fe73ba47f55ba2146/raw/AccessHub%2520Request%2520Detail.js
// @downloadURL  https://gist.githubusercontent.com/mato-meciar/4080cf002230507fe73ba47f55ba2146/raw/AccessHub%2520Request%2520Detail.js
// @supportURL   https://gist.githubusercontent.com/mato-meciar/4080cf002230507fe73ba47f55ba2146/
// @match        *.idaccesshub.com/ECM/jbpmworkflowmanagement/showrequestdetails/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// prepare and inject the script into the page
$(document).ready(function()
{
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
                    /*SD-3077 •	SQL analytics control are not getting created. resolved this*/
                    results.push(text[1]);
            }
        }
    }
    //results = [...new Set(results)]  //SD-2370 This is not a systax error it looping through logic in grails to Create array of unique set data. Browser will understand this
    return results;
}
function showPreview(taskIDList) {
    var analyticsQryVal = "";
    var externalConnection = "";
    analyticsQryVal =
        "select taskkey as 'Task Key', provisioningcomments as 'Provisioning Comments', taskdate as 'Create Date', updatedate as 'Update Date', CONCAT(TIMESTAMPDIFF(DAY, taskdate, updatedate), 'd, ', TIMESTAMPDIFF(HOUR, taskdate, updatedate)%24, 'h, ', TIMESTAMPDIFF(MINUTE, taskdate, updatedate)%60, 'min, ', TIMESTAMPDIFF(SECOND, taskdate, updatedate)%60, 's')  as 'Time to Complete', source as 'Source' from arstasks where taskkey in (" + taskIDList + ")";
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
                    minWidth: 1200,
                    modal: true,
                    draggable: false,
                    resizable: true,
                    show: { effect: "fade" },
                    hide: { effect: "fade" },
                    width: 1800,
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
    if(!document.querySelector(selector) || document.querySelector(selector) != null) {
        let i = 1
        let max = $('#\\#scroller1 > tbody:nth-child(2) > tr > td:nth-child(1)').length
        let taskIDList = []
        for (i; i <= max; i++) {
            let element = $(`#\\#scroller1 > tbody:nth-child(2) > tr:nth-child(${i}) > td:nth-child(1)`)[0]
            let taskID = element.innerHTML
            taskIDList.push(parseInt(taskID))
            //element.innerHTML = `<button class="btn purple" type="button" id="yui-gen${i}-button" onclick="showPreview(${taskID})"><i class="icon-eye-open"></i> ${taskID}</button>`
        }
        let element = $('#\\#scroller1 > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1)')[0]
        if (element) {
            element.innerHTML = `<button class="btn purple" type="button" id="yui-gen1-button" onclick="showPreview('${taskIDList.join(', ')}')"><i class="icon-eye-open"></i> Task ID</button>`
        }
    }
    else {
        setTimeout(function() {
            waitForElementToDisplay(selector, time);
        }, time);
    }
}

// set up a mutation observer
var mutationObserver = new MutationObserver(function(mutations) {
    waitForElementToDisplay('#ui-tabs-1', 2000);
});

// set the mutation observer to check for the data table changes
mutationObserver.observe(document.getElementById('ui-tabs-1'), {
    attributes: true,
    characterData: true,
    childList: false,
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false,
});

