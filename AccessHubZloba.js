// ==UserScript==
// @name         AccessHub Zloba
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.4.4
// @description  Re-enables the Wizard functionality for creating/editing REST connections
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubZloba.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubZloba.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.idaccesshub.com/ECM/ecmConfig/addnewconnection*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

// prepare and inject the script into the page
$(document).ready(function () {
    if ($('#s2id_externalconnectiontype > a > span.select2-chosen')[0].innerText != 'REST') {
      return
    }
    const addWizzardButtons = function () {
      const connection = '<td style="width: 30%;"><span class="svicontext">ConnectionJSON</span><a href="javascript:;" class="btn svicon " onclick="restJsonFunction(\'ConnectionJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom" data-original-title="Populate ConnectionJSON"></i></a></td>'
      const connectionInfo = '<td style="width: 30%;"><a href="javascript:;" class="btn svicon " onclick="alert(connectionJsonString.replaceAll(\'<\', \'&amp;lt;\'))"><i class="icon-info svblue" data-container="body" data-placement="bottom" data-original-title="Populate ConnectionJSON"></i></a></td>'
      const importUser = '<td style="width: 30%;"><span class="svicontext">ImportUserJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'ImportUserJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom" data-original-title="Populate ImportUserJSON"></i></a></td>'
      const importAccEnt = '<td style="width: 30%;"><span class="svicontext">ImportAccountEntJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'ImportAccountEntJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom" data-original-title="Populate ImportAccountEntJSON"/></a></td>'
      const createAcc = '<td style="width: 30%;"><span class="svicontext">CreateAccountJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'CreateAccountJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom" data-original-title="Populate CreateAccountJSON"></i></a></td>'
      const updateAcc = '<td style="width: 30%;"><span class="svicontext">UpdateAccountJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'UpdateAccountJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom" data-original-title="Populate UpdateAccountJSON"></i></a></td>'
      const enableAcc = '<td style="width: 30%;"><span class="svicontext">EnableAccountJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'EnableAccountJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate EnableAccountJSON"></i></a></td>'
      const disableAcc = '<td style="width: 30%;"><span class="svicontext">DisableAccountJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'DisableAccountJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate DisableAccountJSON"></i></a></td>'
      const addAccess = '<td style="width: 30%;"><span class="svicontext">AddAccessJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'AddAccessJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate AddAccessJSON"></i></a></td>'
      const removeAccess = '<td style="width: 30%;"><span class="svicontext">RemoveAccessJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'RemoveAccessJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate RemoveAccessJSON"></i></a></td>'
      const updateUser = '<td style="width: 30%;"><span class="svicontext">UpdateUserJSON </span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'UpdateUserJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom" data-original-title="Populate UpdateUserJSON"></i></a></td>'
      const changePass = '<td style="width: 30%;"><span class="svicontext">ChangePassJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'ChangePassJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate ChangePassJSON"></i></a></td>'
      const removeAcc = '<td style="width: 30%;"><span class="svicontext">RemoveAccountJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'RemoveAccountJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate RemoveAccountJSON"></i></a></td>'
      const ticketStatus = '<td style="width: 30%;"><span class="svicontext">TicketStatusJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'TicketStatusJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate TicketStatusJSON"></i></a></td>'
      const createTicket = '<td style="width: 30%;"><span class="svicontext">CreateTicketJSON</span><a href="javascript:;" class="btn svicon disableBtn" onclick="restJsonFunction(\'CreateTicketJSON\')"><i class="iconSVPAM-help svblue tooltips" data-container="body" data-placement="bottom"data-original-title="Populate CreateTicketJSON"></i></a></td>'
  
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(1) > td:nth-child(1)")[0].innerHTML = connection + connectionInfo
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(2) > td:nth-child(1)")[0].innerHTML = importUser
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(3) > td:nth-child(1)")[0].innerHTML = importAccEnt
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(4) > td:nth-child(1)")[0].innerHTML = createAcc
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(5) > td:nth-child(1)")[0].innerHTML = updateAcc
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(6) > td:nth-child(1)")[0].innerHTML = enableAcc
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(7) > td:nth-child(1)")[0].innerHTML = disableAcc
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(8) > td:nth-child(1)")[0].innerHTML = addAccess
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(9) > td:nth-child(1)")[0].innerHTML = removeAccess
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(10) > td:nth-child(1)")[0].innerHTML = updateUser
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(11) > td:nth-child(1)")[0].innerHTML = changePass
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(12) > td:nth-child(1)")[0].innerHTML = removeAcc
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(13) > td:nth-child(1)")[0].innerHTML = ticketStatus
      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(14) > td:nth-child(1)")[0].innerHTML = createTicket
    };
  
    addWizzardButtons();
  
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = `
  var connectionJsonMap = new Object();
  var smheight
  jQuery(document).ready(function() {
  
      smheight=$(".aa_"+0).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+0).height(smheight)
  
  
      smheight=$(".aa_"+1).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+1).height(smheight)
  
  
      smheight=$(".aa_"+2).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+2).height(smheight)
  
  
      smheight=$(".aa_"+3).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+3).height(smheight)
  
  
      smheight=$(".aa_"+4).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+4).height(smheight)
  
  
      smheight=$(".aa_"+5).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+5).height(smheight)
  
  
      smheight=$(".aa_"+6).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+6).height(smheight)
  
  
      smheight=$(".aa_"+7).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+7).height(smheight)
  
  
      smheight=$(".aa_"+8).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+8).height(smheight)
  
  
      smheight=$(".aa_"+9).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+9).height(smheight)
  
  
      smheight=$(".aa_"+10).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+10).height(smheight)
  
  
      smheight=$(".aa_"+11).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+11).height(smheight)
  
  
      smheight=$(".aa_"+12).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+12).height(smheight)
  
  
      smheight=$(".aa_"+13).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+13).height(smheight)
  
  
      smheight=$(".aa_"+14).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+14).height(smheight)
  
  
      smheight=$(".aa_"+15).height();
      if(smheight <= 14){
          smheight = 49
      }
      $(".taheight_"+15).height(smheight)
  
  
  
      App.init();
  
      showAdvancedData('true') /*SD-5162*/
  
      if('REST' == 'REST' && true){
  
          clearSessionValue();
          setRestQuestionnaireSessionValue();
      }
  });
  
  function clearSessionValue()
  {
      sessionStorage.entNamePageActive = 0
      sessionStorage.accountJSONActive = 0;
      sessionStorage.entitlementJSONActive = 0;
      sessionStorage.accEntJSONActive = 0;
      sessionStorage.restImportTypeActiv = 0;
      sessionStorage.connectionNameList = '';
      sessionStorage.entitlementCount = '';
      sessionStorage.entitlementNameList = '';
      sessionStorage.accountJSON = '';
      sessionStorage.entitlementJSON = '';
      sessionStorage.accountEntJSON = '';
      sessionStorage.entitlementNameListMap = '';
  }
  
  function connectionJsonDisableActivity() {
    if(isNullOrEmpty($("#ConnectionJSON").val())) {
      $('#externalconnectionattributevaluediv> div> table > tbody > tr:not(":first")').each(function(){
          $(this).find("a").attr("disabled", true);
      });
    }else {
      $('#externalconnectionattributevaluediv> div> table > tbody > tr:not(":first")').each(function(){
          $(this).find("a").attr("disabled", false);
      });
    }
  }
  
  var connectionJsonString;
  
  function setRestQuestionnaireSessionValue(){
  
      if(!isNullOrEmpty($('#ConnectionJSON').val())){
          $.ajax({
              async:false,
              url:"/ECM/restQuestionnaire/getConnectionJSON?id="+$('#connid').val(),
              type:"POST",
              dataType: "html",
              data:{"jsonData":$('#ConnectionJSON').val()},
              success:function (returnData) {
                  connectionJsonString = returnData;
              },
              error:function (e) {
                  alert(e);
              }
          });
           if(!isNullOrEmpty(connectionJsonString)){
               var connectionJsonMap = new Object();
               connectionJsonMap = JSON.parse(connectionJsonString)
               var connectionNameList = [];
               var connectionCount = 0;
               $.each(connectionJsonMap['authentications'],function(key,value){
                   connectionNameList[connectionCount] = key;
                   connectionCount++;
               });
               sessionStorage.connectionNameList = connectionNameList;
               sessionStorage.connectionDetails = connectionJsonString;
           }
      }
  
      if(!isNullOrEmpty($('#ImportAccountEntJSON').val())){
          var ImportAccountEntJSONMap = new Object();
          ImportAccountEntJSONMap = JSON.parse($('#ImportAccountEntJSON').val())
          var entTypeMap = new Object();
          var entParamMap = ImportAccountEntJSONMap['entitlementParams']
          if(!isNullOrEmpty(entParamMap)){
              entTypeMap = entParamMap['entTypes']
          }
          var entNameList = [];
          var entNo = 0;
          $.each(entTypeMap,function(key,value){
              entNameList[entNo] = key;
              entNo++;
          });
          sessionStorage.entitlementCount = entNo;
          sessionStorage.entitlementNameList = entNameList;
      }
  
  }
  
  function ButtonEnableFunction()
  {
      $('.disableBtn').attr('disabled', false);
  }
  
  function isNullOrEmpty(obj) {
      var isNullStr = false;
      var objStr = obj;
      if (obj == null || objStr == '' ||objStr == '{}' || objStr == 'undefined') {
          isNullStr = true;
      }
      return isNullStr;
  }
  
  
  function restJsonFunction(fieldName)
  {
      var callActionName;
      var pageName;
      if(fieldName == 'ConnectionJSON'){
          pageName = 'restJSONBasicQuestionnaire';
          callActionName = 'connection';
      }else if(fieldName == 'ImportUserJSON'){
          pageName = 'createJSONForImportUser';
          callActionName = 'importUser';
      }else if(fieldName == 'ImportAccountEntJSON'){
          pageName = 'restJSONImportType';
          callActionName = 'importAccountEnt';
      }else if(fieldName == 'CreateAccountJSON'){
          pageName = 'createJSONForCreateAccount';
          callActionName = 'createAccount';
      }else if(fieldName == 'UpdateAccountJSON'){
          pageName = 'createJSONForUpdateAccount';
          callActionName = 'updateAccount';
      }else if(fieldName == 'EnableAccountJSON'){
          pageName = 'createJSONForEnableAccount';
          callActionName = 'enableAccount';
      }else if(fieldName == 'DisableAccountJSON'){
          pageName = 'createJSONForDisableAccount';
          callActionName = 'disableAccount';
      }else if(fieldName == 'AddAccessJSON'){
          pageName = 'createJSONForAddAccess';
          callActionName = 'addAccess';
      }else if(fieldName == 'RemoveAccessJSON'){
          pageName = 'createJSONForRemoveAccess';
          callActionName = 'removeAccess';
      }else if(fieldName == 'RemoveAccountJSON'){
          pageName = 'createJSONForRemoveAccount';
          callActionName = 'removeAccount';
      }else if(fieldName == 'UpdateUserJSON'){
          pageName = 'createJSONForUpdateUser';
          callActionName = 'updateUser';
      }else if(fieldName == 'ChangePassJSON'){
          pageName = 'createJSONForChangePassword';
          callActionName = 'changePass';
      }else if(fieldName == 'TicketStatusJSON'){
          pageName = 'createJSONForTicketStatus';
          callActionName = 'ticketStatus';
      }else if(fieldName == 'CreateTicketJSON'){
          pageName = 'createJSONForCreateTicket';
          callActionName = 'createTicket';
      }
  
      var pagePath = '';
      var importList = ["restJSONBasicQuestionnaire","createJSONForImportUser","restJSONEntitlementName","createJSONForCreateAccount"]
      var jsonDataStr = "";
      var validate = true;
      $.ajax({
          async:false,
          url:"/ECM/restQuestionnaire/checkRestJSON?fieldName="+fieldName+"&id="+$('#connid').val(),
          type:"POST",
          dataType:"html",
          data:{"jsonData":$("#" + fieldName).val()},
          success:function (returnData) {
              var spanMsgId = "blank"+fieldName;
              if (returnData == 'NO') {
                 if($('#'+spanMsgId).is(':visible')){
                     $("#"+spanMsgId).remove()
                 }
                  $("#" + fieldName).after("<span class='help-block' id="+spanMsgId+"></span>");
                  $("#" + fieldName).css("border", "1px solid red");
                  $("#"+spanMsgId).html('The json is not valid, Either enter a valid json or build it after removing the current text');
                  validate = false;
              }else{
                  $("#" + fieldName).css("border", "1px solid #e5e5e5");
                  if($('#'+spanMsgId).is(':visible')){
                      $("#"+spanMsgId).remove()
                      //$("#"+spanMsgId).html("");
                  }
              }
          },
          error:function (e) {
          }
      });
      if (validate) {
          if(!isNullOrEmpty($("#" + fieldName).val())){
              if($("#" + fieldName).val() != "##########"){
                  jsonDataStr = JSON.stringify(JSON.parse($("#" + fieldName).val()));
              }else {
                  jsonDataStr = $("#" + fieldName).val();
              }
          }
          if(importList.indexOf(pageName) == -1){
              pagePath = "/ECM/restQuestionnaire/restJSONQuestionnaire?pageName=createJSONForCreateAccount"+"&childPageName="+pageName+"&callActionName="+callActionName;
          }
          else {
              pagePath = "/ECM/restQuestionnaire/restJSONQuestionnaire?pageName="+pageName+"&callActionName="+callActionName;
          }
  
          completepath = pagePath,
          $('<div id="connJSON">').dialog({
              position: ['center', 70],
              open: function () {
                  $(this).load(completepath,{"jsonData": jsonDataStr},'');
                  $('.ui-widget-overlay').css('background', 'black');
              },
              close: function (event, ui) {
                  $(this).remove();
              },
              title: 'Connection JSON',
              width: 1100,
              height:480,
              modal: true,
              draggable: false,
              resizable: false,
              show: {effect: 'fade'},
              hide: {effect: 'fade'},
              dialogClass: 'ui-dialog-advSearch'
          });
      }
  }
  `;
    $("head").append(s);
  });
  
