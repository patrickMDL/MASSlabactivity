function AdministratorPrinters() {
    this.GetPrinters = function (pUrl) {
        $.ajax({
            type: "GET",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    AdministratorPrinters.InitializeTableWithExportOptions(data.Model);
                    $("#grid-search").removeAttr("style");
                }
            }
        });
    },
	this.GetPrinterByUId = function (pUrl, pPrinterUId) {
	    $.ajax({
	        type: "GET",
	        url: pUrl,
	        data: {
	            pPrinterUId: pPrinterUId
	        },
	        content: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (data) {
	            Edit_Callback(data);
	        }
	    });
	},
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
                { "width": "25%", "data": "Serial" },
                { "width": "30%", "data": "Branch" },
                { "width": "30%", "data": "Model" },
                {
                    "width": "15%", "sortable": false, "data": function (data) {
                        var icons = "";
                        icons = '<div class="btn-toolbar" role="toolbar"><div class="btn-group sm-m-t-10">';
                        icons += '<button id="btnEdit_' + data["UId"] + '" type="button" class="btn btn-default" data-type="edit" data-toggle="tooltip" data-original-title="Editar o cadastro"><i class="fa fa-pencil"></i></button>';

                        if (data["Active"] === 1) {
                            icons += '<button id="btnStatus_' + data["UId"] + '" type="button" class="btn btn-default" data-type="inactive" data-toggle="tooltip" data-original-title="Ativo. Clique para inativar"><i class="fa fa-check"></i></button>';
                        }
                        else {
                            icons += '<button id="btnStatus_' + data["UId"] + '" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Inativo. Clique para ativar"><i class="fa fa-remove"></i></button>';
                        }

                        icons += '<button id="btnCompanyAgency_' + data["UId"] + '" class="btn btn-default active" data-toggle="tooltip" data-original-title="Empresa: ' + data["SocialName"] + (data["AgencyName"] !== null ? '<p>Agência: ' + data["AgencyName"] + '</p>' : '') + (data["CityName"] !== null ? data["CityName"] + '/' + data["StateInitials"] : '') + '"><i class="fa fa-home"></i></button>';

                        icons += '</div></div>';
                        return icons;
                    }
                }
            ],
            "order": [[0, "asc"]],
            "createdRow": function (row, data, dataIndex) {
                $("#btnEdit_" + data["UId"], row).tooltip({ container: 'body' });
                $("#btnStatus_" + data["UId"], row).tooltip({ container: 'body' });
                $("#btnCompanyAgency_" + data["UId"], row).tooltip({ html: true, container: 'body' });

                $('[data-type="edit"]', row).click(function (event) {
                    Edit(data["UId"]);
                });

                $('[data-type="active"]', row).click(function (event) {
                    Core.ShowModalSlideRight("Confirmação", 'Confirma a <span class="semi-bold">Ativação</span> do dispositivo genérico?', 1, data["UId"], data["Name"]);
                });

                $('[data-type="inactive"]', row).click(function (event) {
                    Core.ShowModalSlideRight("Confirmação", 'Confirma a <span class="semi-bold">Inativação</span> do dispositivo genérico?', 0, data["UId"], data["Name"]);
                });
            },
            "aoColumnDefs": [{
                "aTargets": [0, 1, 2, 3],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if (oData["Active"] === 0) {
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
    }
}

var AdministratorPrinters = new AdministratorPrinters();