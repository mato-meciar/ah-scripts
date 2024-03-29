// ==UserScript==
// @name         AccessHub Request Detail for v6
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2024, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.9.3
// @description  Provides a clickable button for tasks details when on a request info page
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubProvisioningCommentsForV6.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubProvisioningCommentsForV6.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        https://*.idaccesshub.com/ECMv6/request/*
// @match        https://*.saviyntcloud.com/ECMv6/request/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

// prepare and inject the script into the page
// let mutationObserver
// mutationObserver = new MutationObserver(function (mutations) {
//   waitForElementToDisplay('[class^="RequestHistoryContainer_headerIcon"]', 2000)
// })

try {
  waitForElementToDisplay(
    '[class^="RequestHistoryContainer_headerIcon"]',
    2000
  )
} catch (e) {
  waitForElementToDisplay(
    '[class^="RequestHistoryContainer_headerIcon"]',
    2000
  )
}

function waitForElementToDisplay (selector, time) {
  if (document.querySelector(selector)) {
    const content = document.querySelector(selector)
    if (content) {
      const requestId = window.location.href.split('requestHistory/')[1].split('/')[0]
      content.setAttribute('type', 'button')
      content.setAttribute('onclick', `fetchTasks('${requestId}')`)
      prepare()
    }
  } else {
    setTimeout(function () {
      waitForElementToDisplay(selector, time)
    }, time)
  }
}

waitForElementToDisplay('#panel1a-header', 2000)

function prepare () {
  const jquery = document.createElement('script')
  jquery.setAttribute('type', 'text/javascript')
  jquery.setAttribute('async', 'true')
  jquery.setAttribute('src', '/ECM/assets/plugins/jquery-1.12.4.min.js')
  document.body.appendChild(jquery)

  const btnStyle = document.createElement('style')
  btnStyle.setAttribute('type', 'text/css')
  btnStyle.innerHTML = `
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid rgba(100, 100, 100, 1);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
  
.MuiButton-root {
  color: #747474;
  border: none;
  padding: 6px 16px;
  font-size: 12px;
  min-width: 64px;
  box-sizing: border-box;
  font-style: normal;
  text-align: center;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  line-height: inherit;
  font-stretch: normal;
  border-radius: 3px;
  letter-spacing: normal;
  text-transform: capitalize;
}
.MuiButton-root:hover {
  text-decoration: none;
  background-color: rgba(116, 116, 116, 0.04);
}
.MuiButton-root.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
}
@media (hover: none) {
  .MuiButton-root:hover {
    background-color: transparent;
  }
}
.MuiButton-root:hover.Mui-disabled {
  background-color: transparent;
}
.MuiButton-label {
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
}
.MuiButton-text {
  padding: 6px 8px;
}
.MuiButton-textPrimary {
  color: rgba(15,98,254,1);
}
.MuiButton-textPrimary:hover {
  background-color: rgba(15, 98, 254, 0.04);
}
@media (hover: none) {
  .MuiButton-textPrimary:hover {
    background-color: transparent;
  }
}
.MuiButton-textSecondary {
  color: #f50057;
}
.MuiButton-textSecondary:hover {
  background-color: rgba(245, 0, 87, 0.04);
}
@media (hover: none) {
  .MuiButton-textSecondary:hover {
    background-color: transparent;
  }
}
.MuiButton-outlined {
  border: 1px solid;
  padding: 8px 15px;
}
.MuiButton-outlined.Mui-disabled {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.MuiButton-outlinedPrimary {
  color: rgba(15,98,254,1);
  border: 1px solid rgba(15, 98, 254, 0.5);
}
.MuiButton-outlinedPrimary:hover {
  border: 1px solid rgba(15,98,254,1);
  background-color: rgba(15, 98, 254, 0.04);
}
@media (hover: none) {
  .MuiButton-outlinedPrimary:hover {
    background-color: transparent;
  }
}
.MuiButton-outlinedSecondary {
  color: #f50057;
  border: 1px solid rgba(245, 0, 87, 0.5);
}
.MuiButton-outlinedSecondary:hover {
  border: 1px solid #f50057;
  background-color: rgba(245, 0, 87, 0.04);
}
.MuiButton-outlinedSecondary.Mui-disabled {
  border: 1px solid rgba(0, 0, 0, 0.26);
}
@media (hover: none) {
  .MuiButton-outlinedSecondary:hover {
    background-color: transparent;
  }
}
.MuiButton-contained {
  color: rgba(0, 0, 0, 0.87);
  padding: 9px 15px;
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
  background-color: #e0e0e0;
}
.MuiButton-contained:hover {
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  background-color: #d5d5d5;
}
.MuiButton-contained.Mui-focusVisible {
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12);
}
.MuiButton-contained:active {
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12);
}
.MuiButton-contained.Mui-disabled {
  color: rgba(0, 0, 0, 0.26);
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.12);
}
@media (hover: none) {
  .MuiButton-contained:hover {
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
    background-color: #e0e0e0;
  }
}
.MuiButton-contained:hover.Mui-disabled {
  background-color: rgba(0, 0, 0, 0.12);
}
.MuiButton-containedPrimary {
  color: #ffffff;
  background-color: rgba(15,98,254,1);
}
.MuiButton-containedPrimary:hover {
  background-color: rgba(10, 68, 177, 1);
}
@media (hover: none) {
  .MuiButton-containedPrimary:hover {
    background-color: rgba(15,98,254,1);
  }
}
.MuiButton-containedSecondary {
  color: #fff;
  background-color: #f50057;
}
.MuiButton-containedSecondary:hover {
  background-color: #c51162;
}
@media (hover: none) {
  .MuiButton-containedSecondary:hover {
    background-color: #f50057;
  }
}
.MuiButton-disableElevation {
  box-shadow: none;
}
.MuiButton-disableElevation:hover {
  box-shadow: none;
}
.MuiButton-disableElevation.Mui-focusVisible {
  box-shadow: none;
}
.MuiButton-disableElevation:active {
  box-shadow: none;
}
.MuiButton-disableElevation.Mui-disabled {
  box-shadow: none;
}
.MuiButton-colorInherit {
  color: inherit;
  border-color: currentColor;
}
.MuiButton-textSizeSmall {
  padding: 4px 5px;
  font-size: 0.6964285714285714rem;
}
.MuiButton-textSizeLarge {
  padding: 8px 11px;
  font-size: 0.8035714285714285rem;
}
.MuiButton-outlinedSizeSmall {
  padding: 4px 9px;
  font-size: 0.6964285714285714rem;
}
.MuiButton-outlinedSizeLarge {
  padding: 11.5px 21px;
  font-size: 14px;
}
.MuiButton-containedSizeSmall {
  padding: 4px 9px;
  font-size: 0.6964285714285714rem;
}
.MuiButton-containedSizeLarge {
  padding: 13px 21px;
  font-size: 14px;
}
.MuiButton-fullWidth {
  width: 100%;
}
.MuiButton-startIcon {
  display: inherit;
  margin-left: -4px;
  margin-right: 8px;
}
.MuiButton-startIcon.MuiButton-iconSizeSmall {
  margin-left: -2px;
}
.MuiButton-endIcon {
  display: inherit;
  margin-left: 8px;
  margin-right: -4px;
}
.MuiButton-endIcon.MuiButton-iconSizeSmall {
  margin-right: -2px;
}
.MuiButton-iconSizeSmall > *:first-child {
  font-size: 18px;
}
.MuiButton-iconSizeMedium > *:first-child {
  font-size: 20px;
}
.MuiButton-iconSizeLarge > *:first-child {
  font-size: 22px;
}
.fetchDataTableRow > td {
  text-align: left;
  padding-left: 0;
}
.fetchDataTableRow:hover {
  background-color: rgb(235, 238, 250);
  transition: all 0.1s ease-in-out;
}
.fetchDataTable {
  margin: 0 15px;
  color: #747474;
  *border-collapse: collapse; /* IE7 and lower */
  border-spacing: 0;
}
.fetchDataTable > th, td {
  padding: 15px;
}
.fetchDataTable > th:first-child {
    border-radius: 6px 0 0 0;
}
.fetchDataTable > th:last-child {
    border-radius: 0 6px 0 0;
}
.fetchDataTable > th:only-child{
    border-radius: 6px 6px 0 0;
}
`
  document.head.appendChild(btnStyle)

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.innerHTML = `
async function fetchTasks (requestId) {
  const content = document.querySelector('[class^="RequestHistoryContainer_headerIcon"]')
  const originalClass = content.getAttribute('class')
  const originalInnerHtml = content.innerHTML
  content.setAttribute('class', originalClass + ' loader')
  content.setAttribute('style', 'background-color: rgba(0, 0, 0, 0)')
  content.innerHTML = ''
  const env = window.location.hostname.split('.')[0].includes('pprod') ? 'PREPROD' : window.location.hostname.split('.')[0].includes('test') ? 'TEST' : 'PROD'
  const settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://ah-fetchtasks-backend.wdc1a.ciocloud.nonprod.intranet.ibm.com/api/fetchTasks',
    'method': 'POST',
    'mode': 'no-cors',
    'headers': {
      'content-type': 'application/json'
    },
    'processData': false,
    'data': '{"requestId": ' + requestId + ',"environment": "' + env + '"}'
  }

  function printResponse (data) {
    if (!data) return
    const tableDiv = document.createElement('div')
    tableDiv.setAttribute('id', 'tableDiv')
    const table = document.createElement('table')
    table.setAttribute('class', 'fetchDataTable')
    const tableHeading = document.createElement('thead')
    const tableHeaderRow = document.createElement('tr')
    const tableHeaderTASKID = document.createElement('th')
    tableHeaderTASKID.innerText = 'Task ID'
    const tableHeaderTASKTYPE = document.createElement('th')
    tableHeaderTASKTYPE.innerText = 'Task Type'
    const tableHeaderSTATUS = document.createElement('th')
    tableHeaderSTATUS.innerText = 'Status'
    const tableHeaderCREATIONDATE = document.createElement('th')
    tableHeaderCREATIONDATE.innerText = 'Created On (Local)'
    const tableHeaderUPDATEDATE = document.createElement('th')
    tableHeaderUPDATEDATE.innerText = 'Updated On (Local)'
    const tableHeaderPROVISIONINGCOMMENTS = document.createElement('th')
    tableHeaderPROVISIONINGCOMMENTS.innerText = 'Provisioning Comments'
    tableHeaderRow.append(tableHeaderTASKID, tableHeaderTASKTYPE, tableHeaderSTATUS, tableHeaderCREATIONDATE, tableHeaderUPDATEDATE, tableHeaderPROVISIONINGCOMMENTS)
    tableHeading.append(tableHeaderRow)
    const btnParent = document.getElementById('panel1a-content').parentElement.parentElement.parentElement
    table.append(tableHeaderRow)
    const tableBody = document.createElement('tbody')
    data.forEach(rowData => {
      const row = document.createElement('tr')
      row.setAttribute('class', 'fetchDataTableRow')
      const rowElements = []
      Object.keys(rowData).forEach((key, index) => {
        if (key.toLowerCase() === 'provisioningcomments') {
          const td = document.createElement('td')
          const code = document.createElement('code')
          code.innerText = rowData[key]
          td.append(code)
          rowElements.push(td)
        } else {
          const td = document.createElement('td')
          let str = rowData[key]
          if (key.toLowerCase().endsWith('date')) {
            const dateString = rowData[key].replace(' ', 'T').concat('Z')
            const date = new Date(dateString)
            const offsetMs = date.getTimezoneOffset() * 60 * 1000
            const dateLocal = new Date(date.getTime() - offsetMs)
            str = dateLocal.toISOString().slice(0, 19).replace(/-/g, '/').replace('T', ' ')
          }
          td.innerText = str
          rowElements.push(td)
        }
      })
      row.append(...rowElements)
      tableBody.append(row)
    })
    table.append(tableBody)
    tableDiv.append(document.createElement('br'), table)

    const prevTable = document.getElementById('tableDiv')
    prevTable ? prevTable.remove() : undefined
    btnParent.append(tableDiv)
  }

  $.ajax(settings).done(function (response) {
    content.setAttribute('class', originalClass)
    content.removeAttribute('style')
    content.innerHTML = originalInnerHtml
    console.log('[response data]', response.data)
    printResponse(response.data)
  })
}
`
  document.body.appendChild(script)
  const content = document.querySelector('[class^="RequestHistoryContainer_headerIcon"]')
  if (content) {
    const requestId = window.location.href.split('requestHistory/')[1].split('/')[0]
    content.setAttribute('type', 'button')
    content.setAttribute('onclick', `fetchTasks('${requestId}')`)
  }

  function printResponse (data) {
    if (!data) return
    const tableDiv = document.createElement('div')
    tableDiv.setAttribute('id', 'tableDiv')
    const table = document.createElement('table')
    table.setAttribute('class', 'fetchDataTable')
    const tableHeading = document.createElement('thead')
    const tableHeaderRow = document.createElement('tr')
    const tableHeaderTASKID = document.createElement('th')
    tableHeaderTASKID.innerText = 'Task ID'
    const tableHeaderTASKTYPE = document.createElement('th')
    tableHeaderTASKTYPE.innerText = 'Task Type'
    const tableHeaderSTATUS = document.createElement('th')
    tableHeaderSTATUS.innerText = 'Status'
    const tableHeaderCREATIONDATE = document.createElement('th')
    tableHeaderCREATIONDATE.innerText = 'Created On (Local)'
    const tableHeaderUPDATEDATE = document.createElement('th')
    tableHeaderUPDATEDATE.innerText = 'Updated On (Local)'
    const tableHeaderPROVISIONINGCOMMENTS = document.createElement('th')
    tableHeaderPROVISIONINGCOMMENTS.innerText = 'Provisioning Comments'
    tableHeaderRow.append(tableHeaderTASKID, tableHeaderTASKTYPE, tableHeaderSTATUS, tableHeaderCREATIONDATE, tableHeaderUPDATEDATE, tableHeaderPROVISIONINGCOMMENTS)
    tableHeading.append(tableHeaderRow)
    const btnParent = document.getElementById('panel1a-content').parentElement.parentElement.parentElement
    table.append(tableHeaderRow)
    const tableBody = document.createElement('tbody')
    data.forEach(rowData => {
      const row = document.createElement('tr')
      row.setAttribute('class', 'fetchDataTableRow')
      const rowElements = []
      Object.keys(rowData).forEach((key, index) => {
        if (key.toLowerCase() === 'provisioningcomments') {
          const td = document.createElement('td')
          const code = document.createElement('code')
          code.innerText = rowData[key]
          td.append(code)
          rowElements.push(td)
        } else {
          const td = document.createElement('td')
          let str = rowData[key]
          if (key.toLowerCase().endsWith('date')) {
            const date = new Date(rowData[key].concat(' UTC'))
            const offsetMs = date.getTimezoneOffset() * 60 * 1000
            const dateLocal = new Date(date.getTime() - offsetMs)
            str = dateLocal.toISOString().slice(0, 19).replace(/-/g, '/').replace('T', ' ')
          }
          td.innerText = str
          rowElements.push(td)
        }
      })
      row.append(...rowElements)
      tableBody.append(row)
    })
    table.append(tableBody)
    tableDiv.append(document.createElement('br'), table)

    const prevTable = document.getElementById('tableDiv')
    prevTable ? prevTable.remove() : undefined
    btnParent.append(tableDiv)
  }

  printResponse()
}
