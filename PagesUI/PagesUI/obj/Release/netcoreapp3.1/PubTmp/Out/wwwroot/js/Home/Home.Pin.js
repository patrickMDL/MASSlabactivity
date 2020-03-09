function HomePin() {
    this.GetPin = function (pUrl) {
        $.ajax({
            type: "GET",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    HomePin.InitializeTableWithExportOptions(data.Model);
                    $("#grid-search").removeAttr("style");
                }
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
                { "width": "25%", "data": "Name" },
                { "width": "20%", "data": "Serial" },
                {
                    "width": "15%", "data": function (data) {
                        if (data["Imei"] === "\u0013\u0012\u0012\u0013") {
                            return "";
                        }
                        else {
                            return data["Imei"];
                        }
                    }
                },
                { "width": "10%", "data": "Pin" },
                { "width": "20%", "data": "ProjectTypeName" },
                {
                    "width": "10%", "sortable": false, "data": function (data) {
                        var icons = "";
                        icons = '<div class="btn-toolbar" role="toolbar"><div class="btn-group sm-m-t-10">';
                        icons += '<button id="btnAdd_' + data["UId"] + '" type="button" class="btn btn-default" data-type="add" data-toggle="tooltip" data-original-title="Clique para adicionar o dispositivo móvel"><i class="fa fa-plus"></i></button>';

                        icons += '</div></div>';
                        return icons;
                    }
                }
            ],
            "order": [[0, "asc"]],
            "createdRow": function (row, data, dataIndex) {
                $("#btnAdd_" + data["UId"], row).tooltip({ container: 'body' });

                $('[data-type="add"]', row).click(function (event) {
                    Core.ShowModalSlideRight("Confirmação", 'Confirma a <span class="semi-bold">inclusão</span> do dispositivo móvel?', 1, data["UId"], data["Name"] + ' - Serial: ' + data["Serial"]);
                });
            },
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

var HomePin = new HomePin();