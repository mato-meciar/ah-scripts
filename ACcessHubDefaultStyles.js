// ==UserScript==
// @name         AccessHub Default Styles
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.0.1
// @description  Default CSS, welcome back
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubDefaultStyles.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubDefaultStyles.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.idaccesshub.com/ECM/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

const links = document.getElementsByTagName('link')
for (let i = 0; i < links.length; i++) {
    let node = links[i]
    if (node.href.endsWith('customTemplateCSS.css')) {
        document.head.removeChild(node)
    }
}
