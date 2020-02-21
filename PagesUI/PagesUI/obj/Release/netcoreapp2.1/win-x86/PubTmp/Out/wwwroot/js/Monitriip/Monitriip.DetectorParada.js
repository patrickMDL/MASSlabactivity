var MonitriipDetectorParada = new function() {
    this.GetByDate = function (pUrl, pModel) {
        $.ajax({
            type: "POST",
            url: pUrl,
            data: {
                pDetectorParadaMirrorModel: pModel
            },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    if (data.Model.length > 0) {
                        MonitriipDetectorParada.InitializeTableWithExportOptions(data.Model);
                        display('table-detectordeparada', true);
                        display('contentErrorId', false);
                        $("#grid-search").removeAttr("style");
                    } else {
                        display('table-jornadadetrabalho', false);
                        display('contentErrorId', true);
                    } 
                }
                else {
                    Notifications.Bar($("#btnSave"), "Ops! Algo deu errado, verifique a sua conexão com a internet e tente novamente.", true);                    
                }
                Core.EnabledButtonSearch($("#btnSearch"));
            }
        });
    };

    this.GenerateButtonParada = function (codMotivoParada) {

        switch (codMotivoParada) {
            case 0:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Programada"><i class="fa fa-clock-o"></i></button>';
            case 1:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Passageiro"><i class="fa fa-group"></i></button>';
            case 2:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Motorista"><i class="fa fa-id-card-o"></i></button>';
            case 3:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Externa"><i class="fa fa-external-link"></i></button>';
            case 4:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Agente"><i class="fa fa-male"></i></button>';
            case 5:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Acidente da via"><i class="fa fa-medkit"></i></button>';
            case 6:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Acidente com o veículo"><i class="fa fa-stethoscope"></i></button>';
            case 7:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Acidente com o passageiro"><i class="fa fa-ambulance"></i></button>';
            case 8:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Defeito no veículo"><i class="fa fa-wrench"></i></button>';
            case 9:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Troca"><i class="fa fa-random"></i></button>';
            case 10:
                return '<button id="btnMotivoParada" type="button" class="btn btn-default" data-type="active" data-toggle="tooltip" data-original-title="Outro"><i class="fa fa-ellipsis-h"></i></button>';
        }
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
                    "width": "20%", "data": function (data) {
                        return moment(data["DataHoraEvento"]).format("L") + " " + moment(data["DataHoraEvento"]).format("LT");
                    }
                },
                {
                    "width": "20%", "data": function (data) {
                        return moment(data["DateTrip"]).format("L") + " " + moment(data["DateTrip"]).format("LT");
                    }
                },
                { "width": "17%", "data": "PlacaVeiculo" },
                { "width": "18%", "data": "Serial" },
                {
                    "width": "15%", "data": function (data) {
                        return data["Latitude"] + ", " + data["Longitude"];
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

                        icons += MonitriipDetectorParada.GenerateButtonParada(data["CodigoMotivoParada"]);

                        icons += '</div></div>';
                        return icons;
                    }
                }
            ],
            "order": [[0, "desc"]],
            "createdRow": function (row, data, dataIndex) {
                $("#btnMotivoParada", row).tooltip({ container: 'body' });

                //$('[data-type="active"]', row).click(function (event) {
                //    Core.ShowModalSlideRight("Confirmação", 'Confirma a <span class="semi-bold">Ativação</span> do usuário?', 1, data["RowKey"], data["Name"]);
                //});

                //$('[data-type="inactive"]', row).click(function (event) {
                //    Core.ShowModalSlideRight("Confirmação", 'Confirma a <span class="semi-bold">Inativação</span> do usuário?', 0, data["RowKey"], data["Name"]);
                //});
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
