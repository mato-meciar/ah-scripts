// ==UserScript==
// @name         AccessHub Request Detail
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.5.1
// @description  Provides a clickable button for tasks details when on a request info page
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubRequestDetail.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubRequestDetail.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.idaccesshub.com/ECM/jbpmworkflowmanagement/showrequestdetails/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

// prepare and inject the script into the page

let numOfTasks
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
var returnDataGlob
function showPreview(taskIDList) {
  var analyticsQryVal =
    "select taskkey as 'Task Key', provisioningcomments as 'Provisioning Comments', taskdate as 'Create Date', updatedate as 'Update Date', CONCAT(TIMESTAMPDIFF(DAY, taskdate, updatedate), 'd, ', TIMESTAMPDIFF(HOUR, taskdate, updatedate)%24, 'h, ', TIMESTAMPDIFF(MINUTE, taskdate, updatedate)%60, 'min, ', TIMESTAMPDIFF(SECOND, taskdate, updatedate)%60, 's') as 'Time to Complete', source as 'Source' from arstasks where taskkey in (" +
    taskIDList +
    ')'
  var externalConnection = ''
  var runtime = 'false'
  var sqlAnalytics = 'true'

  completepath = '/ECM/analyticsConfig/detailspreview'

  $.ajax({
    async: true,
    url: completepath,
    type: 'post',
    dataType: 'html',
    data: {
      analyticsQry: analyticsQryVal,
      runtime: runtime,
      sqlAnalytics: sqlAnalytics,
      externalConnection: externalConnection
    },
    success: function(returnData) {
      returnData = returnData.replace(/aLengthMenu.*.\\n.*.\\n.*.\\n.*/, 'aLengthMenu\": [[10], [10]],')
      returnData = returnData.replace(/iDisplayLength.*/, 'iDisplayLength\": 10,')
      returnDataGlob = returnData
      $('.opened-dialogs').dialog('close')

      $('<div class="opened-dialogs">')
        .html('loading...')
        .dialog({
          position: ['center', 70],
          open: function() {
            $(this).html(returnData)
            $('.ui-widget-overlay').css('background', 'black') //write background color change code here
          },
          close: function(event, ui) {
            $(this).remove()
          },

          title: '',
          minWidth: 1200,
          modal: true,
          draggable: false,
          resizable: false,
          show: { effect: 'fade' },
          hide: { effect: 'fade' },
          width: 1600,
          dialogClass: 'ui-dialog-osx'
        })
    },
    error: function(e) {}
  })
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
        }

        const tasksChunks = chunkArray(taskIDList, 10)

        const table = $('#ui-tabs-1')[0]
        if (table) {
            for (let i = 0; i < tasksChunks.length; i++) {
                const chunk = tasksChunks[i]
                let b = document.createElement('button')
                b.setAttribute("class", "btn purple")
                b.setAttribute("type", "button")
                b.setAttribute("id", `yui-gen${i+1}-button`)
                b.setAttribute("onclick", `showPreview('${chunk.join(', ')}')`)
                let low = 1 + (i * 10)
                let high = (i + 1) * 10
                b.innerHTML = `<i class="icon-eye-open"></i> [${low} - ${high}]`
                table.appendChild(b)

                let s = document.createElement('span')
                s.innerHTML = '&nbsp;'
                table.appendChild(s)
            }
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

function chunkArray(myArray, chunk_size){
    var results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}
