// ==UserScript==
// @name         AccessHub Request History Filter
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    20123, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      1.0.1
// @description  Provides a custom filter solution
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubRequestHistoryFilter.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubRequestHistoryFilter.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        https://*.idaccesshub.com/ECMv6/request/requestHistory*
// @match        https://*.saviyntcloud.com/ECMv6/request/requestHistory*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

var checkExist = setInterval(function () {
  if (document.getElementsByClassName('requestId').length > 0) {
    const searchBox = document.getElementsByClassName('grid-filterBlk')[0]
    if (searchBox) {
      const button = document.createElement('button')
      button.className = 'MuiButtonBase-root MuiButton-root MuiButton-outlined jss6 MuiButton-outlinedPrimary MuiButton-outlinedSizeSmall MuiButton-sizeSmall'
      button.innerHTML = 'Filter by Endpoint Name'
      button.style.marginLeft = '10px'
      button.onclick = () => {
        const inputElement =
          document.getElementsByClassName('MuiInputBase-input')[0]
        const inputValue = inputElement.value
        const rawSearchParam = {
          appliedFilters: { endpoints: [inputValue] },
          globalSearchText: '',
          reqBodyOptions: { max: 50, offset: 0, findby: '' },
        }
        const baseEncodedSearchParam = btoa(JSON.stringify(rawSearchParam))

        const filter = `?filter=${baseEncodedSearchParam}`
        window.open(`${window.location.pathname}${filter}`, '_self')
      }

      searchBox.appendChild(button)
    }

    clearInterval(checkExist)
  }
}, 1000)
