// ==UserScript==
// @name         FreshDesk New Ticket Shortcut
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.1
// @description  Replace the Edit profile button with New ticket
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/FreshDeskNewTicketShortcut.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/FreshDeskNewTicketShortcut.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.freshdesk.com/support/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==


$(document).ready(function() {
    let button = document.getElementsByClassName('btn-topbar')[0]
    button.href = '/support/tickets/new'
    button.innerHTML = 'New Ticket'
})
