// ==UserScript==
// @name         AccessHub Zloba
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2019, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.4.6
// @description  Re-enables the Wizard functionality for creating/editing REST connections
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubZloba.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubZloba.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        *.idaccesshub.com/ECM/ecmConfig/addnewconnection*
// @match        *.saviyntcloud.com/ECM/ecmConfig/addnewconnection*
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

      $("#showAdvanceConfigDiv > table > tbody > tr:nth-child(1) > td:nth-child(1)")[0].innerHTML = connection + connectionInfo
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
    console.log('--- Raw Connection JSON ---');
    console.log(sessionStorage.connectionDetails);
  });
