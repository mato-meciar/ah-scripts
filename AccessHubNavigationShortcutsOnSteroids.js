// ==UserScript==
// @name         AccessHub Navigation Shortcuts (on Steroids)
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2024, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.10.1
// @description  Don't waste time searching for navigation items in the burger menu
// @author       Martin Meciar (with help from P.K.)
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubNavigationShortcutsOnSteroids.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubNavigationShortcutsOnSteroids.js
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
    style.innerHTML = `.nav-item {color: #646464;} .nav-item a {color: ${location.hostname.includes('ibm.idaccesshub.com') ? 'red' : '#646464;'}} .nav-item :hover {background-color: #cccccc;}`
    document.body.prepend(style)
    let navigationItems = document.getElementsByClassName('app_name')[0].children
    let space = document.createElement('div')
    space.innerHTML = '<p>&nbsp;&nbsp;&nbsp;&nbsp;</p>'
    navigationItems[2].append(space)
    let divider = document.createElement('div')
    divider.setAttribute('class', 'divider')
    divider.text = ' '
    navigationItems[2].append(divider)
    let link = document.createElement('a')
    // let SODItem = document.createElement('div')
    // SODItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    // link.setAttribute('href', '/ECM/soddetail/sodmapped')
    // // link.setAttribute('class', 'link')
    // link.setAttribute('target', '_self')
    // link.text = 'SOD'
    // SODItem.append(link)
    // navigationItems[2].append(SODItem)
    // let revalidationItem = document.createElement('div')
    // revalidationItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    // link = document.createElement('a')
    // link.setAttribute('href', '/ECM/campaign/list?status=5')
    // // link.setAttribute('class', 'link')
    // link.setAttribute('target', '_self')
    // link.text = 'Revalidation'
    // revalidationItem.append(link)
    // navigationItems[2].append(revalidationItem)
    let analyticsItem = document.createElement('div')
    analyticsItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    //const textSize = '10px'
    //analyticsItem.setAttribute('style', `font-size: ${textSize};`)
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/analyticsHistoryES/analyticsSummary')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Analytics'
    analyticsItem.append(link)
    navigationItems[2].append(analyticsItem)
    // let rolesItem = document.createElement('div')
    // rolesItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    // link = document.createElement('a')
    // link.setAttribute('href', '/ECM/user_GroupDetail/roleworkbenchinit')
    // // link.setAttribute('class', 'link')
    // link.setAttribute('target', '_self')
    // link.text = 'Roles'
    // rolesItem.append(link)
    // navigationItems[2].append(rolesItem)
    // if (document.location.hostname.includes('test') || document.location.hostname.includes('pprod')) {
    //     let controlCenterItem = document.createElement('div')
    //     controlCenterItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    //     link = document.createElement('a')
    //     link.setAttribute('href', '/ECM/controlCenter/home')
    //     // link.setAttribute('class', 'link')
    //     link.setAttribute('target', '_self')
    //     link.text = 'Control Center'
    //     controlCenterItem.append(link)
    //     navigationItems[2].append(controlCenterItem)
    // }
    // let monitoringItem = document.createElement('div')
    // monitoringItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    // link = document.createElement('a')
    // link.setAttribute('href', '/ECM/dashboard/dashboardList?tab=4')
    // // link.setAttribute('class', 'link')
    // link.setAttribute('target', '_self')
    // link.text = 'Monitoring Dashboard'
    // monitoringItem.append(link)
    // navigationItems[2].append(monitoringItem)
    // let adminItem = document.createElement('div')
    // adminItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    // link = document.createElement('a')
    // link.setAttribute('href', '/ECM/securitysystems/list')
    // // link.setAttribute('class', 'link')
    // link.setAttribute('target', '_self')
    // link.text = 'Admin'
    // adminItem.append(link)
    // navigationItems[2].append(adminItem)
    let requestotherItem = document.createElement('div')
    requestotherItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECMv6/request/applicationRequest/manageRequestTeam')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Request For Other'
    requestotherItem.append(link)
    navigationItems[2].append(requestotherItem)
    let requestItem = document.createElement('div')
    requestItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECMv6/request/requestHistory?name=undefined&filter=eyJhcHBsaWVkRmlsdGVycyI6e30sImdsb2JhbFNlYXJjaFRleHQiOiIiLCJyZXFCb2R5T3B0aW9ucyI6eyJtYXgiOjI1LCJvZmZzZXQiOjAsImZpbmRieSI6IiJ9fQ==&findby=undefined')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Request History'
    requestItem.append(link)
    navigationItems[2].append(requestItem)
    let pendingapprovalsItem = document.createElement('div')
    pendingapprovalsItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECMv6/review/requestApproval?name=undefined&filter=eyJhcHBsaWVkRmlsdGVycyI6e30sImdsb2JhbFNlYXJjaFRleHQiOiIiLCJyZXFCb2R5T3B0aW9ucyI6eyJtYXgiOjI1LCJvZmZzZXQiOjAsImZpbmRieSI6IiIsInNvcnRjb2x1bW4iOiJyZXFJZCIsInNvcnRvcmRlciI6ImRlc2MifX0=&findby=undefined')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Pending Approvals'
    pendingapprovalsItem.append(link)
    navigationItems[2].append(pendingapprovalsItem)
    let pendingtasksItem = document.createElement('div')
    pendingtasksItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/workflowmanagement/pendingtasklist')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Pending Tasks'
    pendingtasksItem.append(link)
    navigationItems[2].append(pendingtasksItem)
    let completedItem = document.createElement('div')
    completedItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/workflowmanagement/completetasklist')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Completed Tasks '
    completedItem.append(link)
    navigationItems[2].append(completedItem)
    let analyticscontItem = document.createElement('div')
    analyticscontItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/analyticsConfigES/list')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Analytics Configurations'
    analyticscontItem.append(link)
    navigationItems[2].append(analyticscontItem)
    let usersItem = document.createElement('div')
    usersItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/users/list')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Users'
    usersItem.append(link)
    navigationItems[2].append(usersItem)
    let accountsItem = document.createElement('div')
    accountsItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/accounts/list')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Accounts'
    accountsItem.append(link)
    navigationItems[2].append(accountsItem)
    let entitlementsItem = document.createElement('div')
    entitlementsItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/entitlement_values/list')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Entitlements'
    entitlementsItem.append(link)
    navigationItems[2].append(entitlementsItem)
    let usergroupItem = document.createElement('div')
    usergroupItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/user_GroupDetail/list')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'User Group'
    usergroupItem.append(link)
    navigationItems[2].append(usergroupItem)
    let appservItem = document.createElement('div')
    appservItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/securitysystems/list')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Application / Server'
    appservItem.append(link)
    navigationItems[2].append(appservItem)
    let connectionsItem = document.createElement('div')
    connectionsItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/ecmConfig/externalconfig')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Connections'
    connectionsItem.append(link)
    navigationItems[2].append(connectionsItem)
    // let emailItem = document.createElement('div')
    // emailItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    // link = document.createElement('a')
    // link.setAttribute('href', '/ECM/ecmEmailTemplate/list')
    // // link.setAttribute('class', 'link')
    // link.setAttribute('target', '_self')
    // link.text = 'Email Templates'
    // emailItem.append(link)
    // navigationItems[2].append(emailItem)
    // let workflowItem = document.createElement('div')
    // workflowItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    // link = document.createElement('a')
    // link.setAttribute('href', '/ECM/jbpmworkflowmanagement/list')
    // // link.setAttribute('class', 'link')
    // link.setAttribute('target', '_self')
    // link.text = 'Workflow List '
    // workflowItem.append(link)
    // navigationItems[2].append(workflowItem)
    let jobItem = document.createElement('div')
    jobItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/flatViewJobcontrol/flatViewJobList')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Job'
    jobItem.append(link)
    navigationItems[2].append(jobItem)
    let dataanalyzerItem = document.createElement('div')
    dataanalyzerItem.setAttribute('class', 'page-sequence displayName displayNameAlign nav-item')
    link = document.createElement('a')
    link.setAttribute('href', '/ECM/dataAnalyzer/index')
    // link.setAttribute('class', 'link')
    link.setAttribute('target', '_self')
    link.text = 'Data Analyzer '
    dataanalyzerItem.append(link)
    navigationItems[2].append(dataanalyzerItem)
}
