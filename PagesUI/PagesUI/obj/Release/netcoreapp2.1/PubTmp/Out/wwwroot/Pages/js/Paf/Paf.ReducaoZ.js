function ReducaoZ() {
    this.GetDetailAll = function (pUrl) {
        $.ajax({
            type: "POST",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    ReducaoZ.InitializeTableWithExportOptions(data.Model);
                    $("#grid-search").removeAttr("style");
                }
                else {
                    Notifications.Bar(null, "Ops! Algo deu errado, verifique a sua conexão com a internet e tente novamente.", true);
                }
            }
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
                { "width": "40%", "data": "Serial" },
                { "width": "30%", "data": "AllTransmitted" },
                { "width": "30%", "data": "AllNotTransmitted" },
            ],
            "order": [[2, "desc"]],
            "createdRow": function (row, data, dataIndex) {
            },

            "aoColumnDefs": [{
                "aTargets": [0, 1, 2],
                "fnCreatedCell": function (nTd, sData, data, iRow, iCol) {
                    if (data["AllNotTransmitted"] >= 10) {
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
};
var ReducaoZ = new ReducaoZ();