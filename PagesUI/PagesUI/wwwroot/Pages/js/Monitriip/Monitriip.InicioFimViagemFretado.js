var EMTUConsum = new function () {
    this.GetByDate = function (pUrl, pModel) {
        $.ajax({
            type: "POST",
            url: pUrl,
            data: {
                pEMTUTransmissaoFilter: pModel
            },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    if (data.Model.length > 0) {
                        MonitriipInicioFimViagemFretado.InitializeTableWithExportOptions(data.Model);
                        display('table-viagemfretado', true);
                        display('contentErrorId', false);
                        $("#grid-search").removeAttr("style");
                    }
                    else {
                        display('table-viagemfretado', false);
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
    // Initialize datatable showing export options
    this.InitializeTableWithExportOptions = function (model) {
        var pByReport = '{ "param" : [' +
            '{ "value":"Report" , "text":"' + model[0].PlacaVeiculo + '" } ]}';

        var table = $('#tableWithExportOptions');

        var settings = {
            data: model,
            "autoWidth": false,
            "fixedColumns": true,
            "sDom": "<'exportOptions'T><'table-responsive't><'form-group 'Blf><t><'row'<p i>>",
            "sPaginationType": "bootstrap",
            "scrollCollapse": true,
            "paging": true,
            "destroy": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_",
                "sInfo": "Exibindo <b>_START_ até _END_</b> de _TOTAL_ registros",
                "sInfoFiltered": "(Filtro realizado em <b>_MAX_</b> registros)",
                "sInfoEmpty": "Nenhum registro encontrado",
                "sSearchPlaceholder": "Pesquisar",
                "sSearch": "",
                "sZeroRecords": "Nenhum registro encontrado",
                "sEmptyTable": "Nenhum registro encontrado"
            },
            "iDisplayLength": 5,
            "columns": [
                {
                    "width": "20%", "data": function (data) {
                        return moment(data["DataHoraEvento"]).format("DD/MM/YYYY") + " " + moment(data["DataHoraEvento"]).format("LT");
                    }
                },
                {
                    "width": "20%", "data": function (data) {
                        return moment(data["DateTrip"]).format("DD/MM/YYYY") + " " + moment(data["DateTrip"]).format("LT");
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

                        icons += '</div></div>';
                        return icons;
                    }
                }
            ],
            "order": [[0, "desc"]],
            "createdRow": function (row, data, dataIndex) {
                $("#btnStatusEnvio_" + data["RowKey"], row).tooltip({ container: 'body' });

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
            "pageLength": 25,
            "lengthMenu": [[25, 50, 75, 100, -1], [25, 50, 75, 100, "Todos"]],
            "oClasses": {
                "sFilterInput": "form-control pull-right",
                "sFilter": "pull-right",
                "sLength": "register-number",
                "sLengthSelect": "cs-selected-register-number"
            },
            "buttons": [
                {
                    extend: 'csvHtml5',
                    className: 'btn btn-complete btn-cons btn-sm',
                    footer: true,
                    text: 'CSV',
                    chartset: 'UTF-8',
                    bom: true,
                    exportOptions: {
                        columns: [':not(.noExport)']
                    }
                },
                {
                    extend: 'pdfHtml5',
                    className: 'btn btn-complete btn-cons btn-sm',
                    messageTop: pByReport,
                    orientation: 'landscape', //portait
                    footer: true,
                    pageSize: 'A4',
                    customize: function (doc) {
                        /*
                        Utilzado para montar o relatório  
                        */
                        doc.content[0].text = "Relatório de Início e Fim de Viagem - Fretado";
                        doc.content[1].text = "Placa: " + model[0].PlacaVeiculo;

                        /*
                        Colocar tamanho em todas as colunas  
                        */
                        var colCount = new Array();
                        $(table).find('tbody tr:first-child td').each(function (index) {
                            if (index === 5) {//Esconde última coluna
                                colCount.push('0%');
                            }
                            else {
                                if ($(this).attr('colspan')) {
                                    for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                        colCount.push('*');
                                    }
                                    } else { colCount.push('*'); }
                            }
                        });
                        doc.content[2].table.widths = colCount;

                        /*
                        Utilzado para o rodapé da pádina   
                         */
                        doc['footer'] = function (page, pages) {
                            return {
                                columns: [
                                    'Copyright © 2019 MASS Labs',
                                    {
                                        // This is the right column
                                        alignment: 'right',
                                        text: ['página ', { text: page.toString() }, ' de ', { text: pages.toString() }]
                                    }
                                ],
                                margin: [10, 0]
                            };
                        };
                    },
                    exportOptions: {
                        columns: ':visible'
                    }
                }
            ],
            fnInitComplete: function () {
                $('.buttons-html5').removeClass("dt-button");
            }
        };

        table.dataTable(settings);
    };
};