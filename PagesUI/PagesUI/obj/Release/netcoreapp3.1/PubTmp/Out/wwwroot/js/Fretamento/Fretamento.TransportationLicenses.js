var FretamentoTransportationLicenses = new function () {
    this.GetTransportationLicenses = function (pUrl) {
        $.ajax({
            type: "GET",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    FretamentoTransportationLicenses.InitializeTableWithExportOptions(data.Model);
                    $("#grid-search").removeAttr("style");
                }
            }
        });
    };
    // Initialize datatable showing export options
    this.InitializeTableWithExportOptions = function (model) {

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
                { "width": "0%", "data": "TransportationLicenseStatusId" },
                { "width": "10%", "data": "Number" },
                { "width": "10%", "data": "ControlCode" },
                {
                    "width": "15%", "data": function (data) {
                        return moment(data["EmissionDate"]).format("L") + " " + moment(data["EmissionDate"]).format("LT");
                    }
                },
                {
                    "width": "15%", "data": function (data) {
                        return moment(data["InitialDateTrip"]).format("L") + " " + moment(data["InitialDateTrip"]).format("LT");
                    }
                },
                {
                    "width": "15%", "data": function (data) {
                        return moment(data["ArrivalDateTrip"]).format("L") + " " + moment(data["ArrivalDateTrip"]).format("LT");
                    }
                },
                { "width": "10%", "data": "Pin" },
                {
                    "width": "15%", "sortable": false, "data": function (data) {
                        var icons = "";
                        icons = '<div class="btn-toolbar" role="toolbar"><div class="btn-group sm-m-t-10">';
                        icons += '<button id="btnInfo_' + data["UId"] + '" type="button" class="btn btn-default" data-type="info" data-toggle="tooltip" data-original-title="Informações complementares do cadastro"><i class="fa fa-bars"></i></button>';

                        if (data["TransportationLicenseStatusId"] === 1) {
                            icons += '<button id="btnEdit_' + data["UId"] + '" type="button" class="btn btn-default" data-type="edit" data-toggle="tooltip" data-original-title="Editar o cadastro"><i class="fa fa-pencil"></i></button>';
                            icons += '<button id="btnStatus_' + data["UId"] + '" type="button" class="btn btn-default active" data-toggle="tooltip" data-original-title="Ativo"><i class="fa fa-check"></i></button>';
                        }
                        else if (data["TransportationLicenseStatusId"] === 2) {
                            icons += '<button id="btnStatus_' + data["UId"] + '" type="button" class="btn btn-default active" data-toggle="tooltip" data-original-title="Finalizado"><i class="fa fa-lock"></i></button>';
                        }

                        icons += '</div></div>';
                        return icons;
                    }
                },
            ],
            "order": [[0, "asc"], [4, "asc"]],
            "createdRow": function (row, data, dataIndex) {
                $("#btnInfo_" + data["UId"], row).tooltip({ container: 'body' });
                $("#btnEdit_" + data["UId"], row).tooltip({ container: 'body' });
                $("#btnStatus_" + data["UId"], row).tooltip({ container: 'body' });

                $('[data-type="info"]', row).click(function (event) {
                    FretamentoTransportationLicenses.GetDetailTransportationLicenses(data["UId"]);
                });

                $('[data-type="edit"]', row).click(function (event) {
                    Edit(data["UId"]);
                });
            },
            "aoColumnDefs": [{
                "visible": false,
                "aTargets": [0],
            },
            {
                "aTargets": [1, 2, 3, 4, 5, 6, 7],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if (oData["TransportationLicenseStatusId"] === 2) {
                        $(nTd).addClass("text-danger");
                    }
                }
            }],
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
            fnDrawCallback: function (oSettings) {
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

        $("#search-tableexport").keyup(function () {
            table.fnFilter($(this).val());
        });
    };
    this.GetTransportationLicensesByUId = function (pUrl, pUId) {
        $.ajax({
            type: "GET",
            url: pUrl,
            data: {
                pUId: pUId
            },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                Edit_Callback(data);
            }
        });
    };
    this.GetDetailTransportationLicenses = function (pUId) {
        $.ajax({
            type: "GET",
            url: "/LicencaMonitriip/GetDetail",
            data: {
                pUId: pUId
            },
            success: function (result) {
                $("#partialViewModal").html(result.partialView);

                FretamentoTransportationLicenses.InitializeTransportationLicenseDriverDetailTable(result.listTransportationLicenseDriverDetailViewModel);
                FretamentoTransportationLicenses.InitializeTransportationLicenseVehicleDetailTable(result.listTransportationLicenseVehicleDetailViewModel);
                
                Core.ShowModal($("#_TransportationLicensesDetail"));
            },
            error: function (request, error) {
                Notifications.Bar($("#btnSave"), 'Ops! Algo deu errado, verifique a sua conexão com a internet e tente novamente.', true);
            }
        });
    };
    this.InitializeTransportationLicenseDriverDetailTable = function (data) {
        var table = $("#TransportationLicenseDriverDetailTable");

        var settings = {
            data: data,
            "paging": false,
            "ordering": false,
            "info": false,
            "autoWidth": false,
            "fixedColumns": true,
            "sDom": "<'table-responsive't><'row'<p i>>",
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
                { "width": "40%", "data": "name" },
                {
                    "width": "30%", "data": function (data) {
                        return Core.FormatCPF(data["number"]);
                    }
                },
                { "width": "30%", "data": "employeeTypeName" }
            ],
            "order": [[0, "asc"]]
        };

        table.dataTable(settings);
        table.removeClass("no-footer");
    };
    this.InitializeTransportationLicenseVehicleDetailTable = function (data) {
        var table = $("#TransportationLicenseVehicleDetailTable");

        var settings = {
            data: data,
            "paging": false,
            "ordering": false,
            "info": false,
            "autoWidth": false,
            "fixedColumns": true,
            "sDom": "<'table-responsive't><'row'<p i>>",
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
                { "width": "40%", "data": "licensePlate" },
                { "width": "30%", "data": "number" },
                { "width": "30%", "data": "characteristicName" }
            ],
            "order": [[0, "asc"]]
        };

        table.dataTable(settings);
        table.removeClass("no-footer");
    };
};