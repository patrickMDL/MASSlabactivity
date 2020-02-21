var MonitriipJornadaTrabalhoMotorista = new function () {
    this.GetByDate = function (pUrl, pModel) {
        $.ajax({
            type: "POST",
            url: pUrl,
            async: true,
            data: {
                pJornadaTrabalhoMotoristaMirrorModel: pModel
            },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    if (data.Model.length > 0) {
                        MonitriipJornadaTrabalhoMotorista.InitializeTableWithExportOptions(data.Model);
                        display('table-jornadadetrabalho', true);
                        display('contentErrorId', false);
                        $("#grid-search").removeAttr("style");
                    }
                    else {
                        display('table-jornadadetrabalho', false);
                        display('contentErrorId', true);
                    } 
                }
                else {
                    Notifications.Bar($("#btnSave"), "Tempo de retorno de dados excedido, será apresentado posteriormente para acesso no canto superior esquerdo.", true);
                }
                Core.EnabledButtonSearch($("#btnSearch"));
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
                {
                    "width": "17%", "data": function (data) {
                        return moment(data["DataHoraEvento"]).format("DD/MM/YYYY HH:mm:ss");
                    }
                },
                {
                    "width": "17%", "data": function (data) {
                        if (data)
                            return Core.FormatCPF(data["CpfMotorista"]);
                        else return "";
                    }
                },
                { "width": "12%", "data": "PlacaVeiculo" },
                { "width": "17%", "data": "Serial" },
                {
                    "width": "17%", "data": function (data) {
                        return data["Latitude"] + ", " + data["Longitude"];
                    }
                },
                {
                    "width": "10%", "data": function (data) {
                        switch (data["TipoRegistroEvento"]) {
                            case 0:
                                return "Fim";
                            case 1:
                                return "Início";
                        }
                    }
                },
                {
                    "width": "10%", "data": function (data) {
                        return data["SocialName"];
                    }
                },
                {
                    "width": "10%", "data": function (data) {
                        return data["NomeMotorista"];
                    }
                },
                {
                    "width": "10%", "data": function (data) {
                        return data["listResultadoOperacao"];
                    }
                },
                {
                    "width": "10%", "sortable": false, "data": function (data) {
                        var icons = "";
                        icons = '<div class="btn-toolbar" role="toolbar"><div class="btn-group sm-m-t-10">';

                        if (data["EnvioAntt"] === 1) {
                            icons += '<button id="btnStatusEnvio_' + data["RowKey"] + '" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Enviado para a ANTT"><i class="fa fa-check"></i></button>';
                        }
                        else {
                            icons += '<button id="btnStatusEnvio_' + data["RowKey"] + '" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Não enviado para a ANTT"><i class="fa fa-close"></i></button>';
                        }

                        icons += '</div></div>';
                        return icons;
                    }
                }
            ],
            "order": [[0, "desc"]],
            "createdRow": function (row, data, dataIndex) {
                $("#btnStatusEnvio_" + data["RowKey"], row).tooltip({ container: 'body' });
            },
            "aoColumnDefs": [{
                "aTargets": [0, 1, 2, 3],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    if (oData["EnvioAntt"] === 0) {
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
};
