// ==UserScript==
// @name         AccessHub Connection Status Sort
// @namespace    https://openuserjs.org/users/mato-meciar
// @copyright    2024, mato-meciar (https://openuserjs.org/users/mato-meciar)
// @version      0.1.3
// @description  Enables sorting of connections by their status
// @author       Martin Meciar
// @license      MIT
// @homepageURL  https://github.com/mato-meciar/ah-scripts
// @updateURL    https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubConnectionStatusSort.js
// @downloadURL  https://raw.githubusercontent.com/mato-meciar/ah-scripts/master/AccessHubConnectionStatusSort.js
// @supportURL   https://github.com/mato-meciar/ah-scripts
// @match        https://*.idaccesshub.com/ECM/ecmConfig/externalconfig*
// @match        https://*.saviyntcloud.com/ECM/ecmConfig/externalconfig*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mato-meciar
// ==/OpenUserJS==

// remove the original script
document.querySelector("#tab_1-1 > div > div.portlet-body > script").remove();

// prepare and inject the script into the page
$(document).ready(function()
{
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = `
$(document).ready(function () {
    $('#externelconnecdata').dataTable({
        "bProcessing": true,
        "bDestroy": true,
        "bStateSave": false,
        "bServerSide": true,
        "bAutoWidth": false,
        "sAjaxSource": '/ECM/ecmConfig/externalconnectionlistjson',
        "aLengthMenu": [
            [
                5,
                15,
                20,
                25,
                50,
                100
            ],
            [
                5,
                15,
                20,
                25,
                50,
                100
            ]
        ],
        "iDisplayLength": 15,
        "sPaginationType": "bootstrap",
        "fnInitComplete": function () {
            jQuery('#externelconnecdata_wrapper tbody input').uniform();
            jQuery('.datatable-scroll').slimScrollH();
            jQuery('.alignedicon a[disabled]').prop("onclick",
                null);
            jQuery('.popovers').popover();
            jQuery(".tooltips").tooltip();
            jQuery(".tooltips").mouseleave(function () {
                jQuery(".tooltip").hide();
            })
            try {
                showDiv();
            } catch (e) { }
        },
        "fnDrawCallback": function () {
            jQuery('#externelconnecdata_wrapper tbody input').uniform();
            jQuery('.datatable-scroll').slimScrollH();
            jQuery('.alignedicon a[disabled]').prop("onclick",
                null);

            jQuery('.popovers').popover();
            jQuery(".tooltips").tooltip();
            jQuery(".tooltips").mouseleave(function () {
                jQuery(".tooltip").hide();
            })
            try {
                jQuery('.readonlyfield').prop('disabled', true);
                jQuery('.select2DataTable').select2();
            }
            catch (e) { }
        },
        "aoColumnDefs": [
            {
                "bVisible": false,
                "aTargets": []
            },
            {
                'sClass': 'center',
                'bSortable': false,
                'bAutoWidth': false,
                'aTargets': [
                    0,
                    6
                ]
            }
        ],
        "sAjaxDataProp": "results",
        "fnServerParams": function (aoData) {
            aoData.push({
                'name': 'controller', 'value': 'ecmConfig'
            }); aoData.push({
                'name': 'action', 'value': 'externalconfig'
            }); aoData.push({
                'name': 'jsontype', 'value': 'datatable'
            }); $('.externelconnecdata_search').each(function (i, obj) {

                if ($(obj).attr("placeholder") == $(obj).val()) { }
                else {
                    aoData.push({
                        'name': $(obj).attr("name"), 'value': $(obj).val()
                    });
                }
            });
        },
        "aoColumns": [
            {
                'mData': 'chkbx'
            },
            {
                'mData': 'connectionname'
            },
            {
                'mData': 'connectiontype'
            },
            {
                'mData': 'connectiondescription'
            },
            {
                'mData': 'statusForEnableDisable'
            },
            {
                'mData': 'status'
            },
            {
                'mData': 'action'
            }
        ]
    });



    jQuery('#externelconnecdata .group-checkable').change(function () {
        var set = jQuery(this).attr("data-set");
        var checked = jQuery(this).is(":checked");
        jQuery(set).each(function () {
            if (checked) {
                $(this).attr("checked", true);
            } else {
                $(this).attr("checked", false);
            }
        });
        jQuery.uniform.update(set);
    });

    jQuery('#externelconnecdata_wrapper .dataTables_filter input').addClass("form-control input-medium"); // modify table search input
    jQuery('#externelconnecdata_wrapper .dataTables_length select').addClass("form-control input-xsmall"); // modify table per page dropdown
    jQuery('#externelconnecdata_wrapper .dataTables_length select').select2(); // initialize select2 dropdown
});
`;
    $("head").append(s);
});
