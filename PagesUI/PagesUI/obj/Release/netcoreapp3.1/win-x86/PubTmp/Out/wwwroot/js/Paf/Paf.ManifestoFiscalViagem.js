function ManifestoFiscalViagem() {
    var _urlStorageBlob;

    this.SetUrlStorageBlob = function (pUrl) {
        _urlStorageBlob = pUrl;
    },
    this.GetListDavs = function (pUrl, pNumber) {
        Pace.track(function () {
            $.ajax({
                type: "POST",
                url: pUrl,
                content: "application/json; charset=utf-8",
                dataType: "json",
                data: {
                    pNumber: pNumber
                },
                success: function (data) {
                    if (data.Success) {
                        ManifestoFiscalViagem.InitializeTableWithExportOptions(data.Model);
                        $("#grid-search").removeAttr("style");
                    }
                    else {
                        Notifications.Bar(null, "Ops! Algo deu errado, verifique a sua conexão com a internet e tente novamente.", true);
                    }
                }
            });
        });
    },

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
            "iDisplayLength": 10,
            "columns": [
                { "width": "15%", "data": "FullNumber" },
                { "width": "15%", "data": "OpenedSerialEcf" },
                {
                    "width": "15%", "data": function (data) {
                        return data["OpenedCooAt"] != null ? moment(data["OpenedCooAt"]).format("L") + " " + moment(data["OpenedCooAt"]).format("LT") : "";
                    }
                },
                { "width": "15%", "data": "DavStatus" },
                { "width": "15%", "data": "ClosedSerialEcf" },
                {
                    "width": "15%", "data": function (data) {
                        return data["ClosedCooAt"] != null ? moment(data["ClosedCooAt"]).format("L") + " " + moment(data["ClosedCooAt"]).format("LT") : "";
                    }
                },
                {
                    "width": "10%", "data": function (data) {

                        var icons = "";
                        icons = '<div class="btn-toolbar" role="toolbar"><div class="btn-group sm-m-t-10">';
                        if (data["DavStatusId"] === 8) {
                            icons += '<button id="btnSoliticitation_' + data["Id"] + '" type="button" class="btn btn-default" data-type="solicitation" data-toggle="tooltip" data-original-title="Clique para solicitar o espelho MFD"><i class="fa fa-reply-all"></i></button>';
                            if (data["StorageCloudFilePath"] != null)
                                icons += '<button id="btnDownload_' + data["Id"] + '" type="button" class="btn btn-default" data-type="download" data-toggle="tooltip" data-original-title="Clique para baixar o arquivo"><i class="fa fa-cloud-download"></i></button>';
                        }
                        else {
                            icons += '<div style="width:44px;height:35px;"></div>'
                        }

                        icons += '</div></div>';
                        return icons;
                    }
                }
            ],
            "order": [[0, "desc"]],
            "createdRow": function (row, data, dataIndex) {
                $("#btnSoliticitation_" + data["Id"], row).tooltip({ container: 'body' });

                $('[data-type="solicitation"]', row).click(function (event) {
                    Core.ShowModalSlideRight("Confirmação", 'Confirma a <span class="semi-bold">Solicitação</span> do espelho MFD?', data["ClosedCoo"], data["ClosedSerialEcf"], null);
                });

                $('[data-type="download"]', row).click(function (event) {
                    window.open(_urlStorageBlob + data["StorageCloudFilePath"], '_blank');
                });
            },

            "aoColumnDefs": [{
                "aTargets": [0, 1, 2, 3],
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
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
    },
    this.SaveEspelhoMfd = function (pUrl, pModel) {
        $.ajax({
            type: "POST",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: {
                pArquivoEspelhoMfdMirrorModel: pModel
            },
            success: function (data) {
                Core.HideModalSlideRight();
                if (data.Success) {
                    Notifications.Bar(null, data.Message, false);
                }
                else {
                    Notifications.Bar(null, data.Message, true);
                }
            }
        });
    }
};

var ManifestoFiscalViagem = new ManifestoFiscalViagem();
