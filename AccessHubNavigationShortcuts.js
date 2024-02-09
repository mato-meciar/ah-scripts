// ==UserScript==
// @name         AccessHub Navigation Shortcuts
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2024, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0..1
// @description  Don't waste time searching for navigation items in the burger menu
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubNavigationShortcuts.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubNavigationShortcuts.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        https://*.idaccesshub.com/*
// @match        https://*.saviyntcloud.com/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==


const checkExist = function() {
    let navigationItems = document.getElementsByClassName('app_name')[0].children
    if (navigationItems.length > 0) {
        return true
    } else {
        return false
    }
}

let pageLoaded = setInterval(function() {
    if (checkExist()) {
        clearInterval(pageLoaded)
        setupNavigation()
    }
}, 2000)

const setupNavigation = function() {
    let style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.innerHTML = ".nav-item {color: #646464;}.nav-item a {color: #646464;}.nav-item :hover {background-color: #cccccc;}"
    document.body.prepend(style)

    let navigationItems = document.getElementsByClassName('app_name')[0].children

    let space = document.createElement('div')
    space.innerHTML = '<p>&nbsp;&nbsp;&nbsp;&nbsp;</p>'
    navigationItems[2].append(space)


    let divider = document.createElement('div')
    divider.setAttribute('class', 'divider')
    divider.text = ' '
    navigationItems[2].append(divider)


    let SODItem = document.createElement('div')
    SODItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    let link = document.createElement('a')
    link.setAttribute('href', '/ECM/soddetail/sodmapped')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'SOD'
    SODItem.append(link)
    navigationItems[2].append(SODItem)

    let revalidationItem = document.createElement('div')
    revalidationItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/campaign/list?status=5')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Revalidation'
    revalidationItem.append(link)
    navigationItems[2].append(revalidationItem)

    let analyticsItem = document.createElement('div')
    analyticsItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/analyticsHistoryES/analyticsSummary')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Analytics'
    analyticsItem.append(link)
    navigationItems[2].append(analyticsItem)

    let rolesItem = document.createElement('div')
    rolesItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/user_GroupDetail/roleworkbenchinit')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Roles'
    rolesItem.append(link)
    navigationItems[2].append(rolesItem)

    if (document.location.hostname.includes('test') || document.location.hostname.includes('pprod')) {
        let controlCenterItem = document.createElement('div')
        controlCenterItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
        link = document.createElement('a')
        link.setAttribute('href', '/ECM/controlCenter/home')
        // link.setAttribute('class', 'link')
        link.setAttribute('target', '_self')
        link.text = 'Control Center'
        controlCenterItem.append(link)
        navigationItems[2].append(controlCenterItem)
    }

    let monitoringItem = document.createElement('div')
    monitoringItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/dashboard/dashboardList?tab=4')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Monitoring Dashboard'
    monitoringItem.append(link)
    navigationItems[2].append(monitoringItem)

    let adminItem = document.createElement('div')
    adminItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/securitysystems/list')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Admin'
    adminItem.append(link)
    navigationItems[2].append(adminItem)

}
