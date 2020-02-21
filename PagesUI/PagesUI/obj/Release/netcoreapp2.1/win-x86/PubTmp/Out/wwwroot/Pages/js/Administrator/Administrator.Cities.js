var executeReady = function () {
    AdministratorCities.ClickBtnZipCodeSearch();
    AdministratorCities.GetCities();
    OmniBusMenu.SetMenu("Administrator", "Cities");
};



function AdministratorCities() {
    this.FocusOutZipCode = function () {
        $("#ZipCode").focusout(function (event) {
            AdministratorCities.SearchZipCode(event);
        });
    },
    this.ClickBtnZipCodeSearch = function () {
        $("#btnZipCodeSearch").click(function (event) {
            AdministratorCities.SearchZipCode(event);
        });
    },
    this.SearchZipCode = function (event) {
        clearValidationRegister('form-companies');
        if (!$("#ZipCode").valid()) {
            event.stopPropagation();
            $("#ZipCode").focus();

            Core.FieldScroll($("#ZipCode"));
            AdministratorCities.HideSearchElements();
        }
        else {
            Core.DisabledButton($(this));

            AdministratorCities.ShowSearchElements();
            AdministratorCities.GetAddressesByZipCode();
        }
    },
    this.HideSearchElements = function () {
        $("#divWaitLabel").attr("style", "display:none;");
        $("#divWait").attr("style", "display:none;");
        $("#divNoAddress").attr("style", "display:none;");
    },
    this.ShowSearchElements = function () {
        $("#divWaitLabel").removeAttr("style");
        $("#divWait").removeAttr("style");
    },
    this.GetAddressesByZipCode = function () {
        $.ajax({
            type: "GET",
            url: urlGetAddressesByZipCode,
            data: {
                pZipCode: $("#ZipCode").val()
            },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    AdministratorCities.HideSearchElements();
                    AdministratorCustom.SetUniqueAddress(data.Model);
                    $("#divNoAddressSave").attr("style", "display:none;");
                    Notifications.Bar(null, 'O endereço/cidade do Cep informado estava cadastrado ou foi cadastrado automaticamente pelo sistema.', false);
                    AdministratorCities.GetCities();
                }
                else {
                    AdministratorCities.HideSearchElements();
                    $("#divAddress").attr("style", "display:none;");
                    $("#divNoAddressSave").attr("style", "display:none;");
                    Notifications.Bar($("#btnSave"), 'Ops! Algo deu errado, verifique o "CEP" informado ou a sua conexão com a internet e tente novamente.', true);
                }
            }
        });
    },
    this.GetCities = function () {
            $.ajax({
                type: "GET",
                url: urlGetCities,
                content: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.Success) {
                        AdministratorCities.InitializeTableWithExportOptions(data.Model);
                        $("#grid-search-companies").removeAttr("style");
                    }
                }
            });
    },
    this.InitializeTableWithExportOptions = function(model) {
        var table = $('#tableWithExportOptions');

        var settings = {
            data: model,
            "autoWidth": false,
            "fixedColumns": true,
            "sDom": "<'exportOptions'T><'table-responsive't><'row'<p i>>",
            "sPaginationType": "bootstrap",
            "destroy": true,
            "scrollCollapse": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Exibindo <b>_START_ até _END_</b> de _TOTAL_ registros",
                "sInfoEmpty": "Nenhum registro encontrado",
                "sInfoFiltered": "(Filtro realizado em <b>_MAX_</b> registros)",
                "sZeroRecords": "Nenhum registro encontrado",
                "sEmptyTable": "Nenhum registro encontrado"
            },
            "iDisplayLength": 5,
            "columns": [
                { "width": "10%", "data": "ZipCode" },
                { "width": "25%", "data": "Street" },
                { "width": "25%", "data": "NeighborhoodName" },
                { "width": "15%", "data": "CityName" },
                { "width": "15%", "data": "StateName" },
                { "width": "10%", "data": "CountryName" }
            ],
            "order": [[1, "asc"]],
            "createdRow": function(row, data, dataIndex) {
            },
            "aoColumnDefs": [ {
                "aTargets": [0,1,2,3],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if (oData["Active"] === 0) {
                        $(nTd).addClass("text-danger");
                    }
                }
            } ],
            "oTableTools": {
                "sSwfPath": "/lib/jquery-datatable/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "xls",
                    "sButtonText": "<i class='fa fa-file-excel-o'></i>",
                }, {
                    "sExtends": "pdf",
                    "sButtonText": "<i class='fa fa-file-pdf-o'></i>",
                }, {
                    "sExtends": "copy",
                    "sButtonText": "<i class='fa fa-copy'></i>",
                }]
            },
            "fnDrawCallback" : function(oSettings) {
                $('.export-options-container').append($('.exportOptions'));

                $('#ToolTables_tableWithExportOptions_0').tooltip({
                    title: 'Exportar para Excel',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_1').tooltip({
                    title: 'Exportar para PDF',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_2').tooltip({
                    title: 'Copiar dados da tabela',
                    container: 'body'
                });
            }
        };

        table.dataTable(settings);

        $("#search-tableexport").keyup(function() {
            table.fnFilter($(this).val());
        });
    }
};

var AdministratorCities = new AdministratorCities();
executeReady();