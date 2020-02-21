function initAjaxGetDetail(url, formId, tableId, tableIdDetail, orientationPDF) {
    $('#button-serch').click(function () {

        if ($('#datepicker-required').hasClass('form-group required has-error')) {
            $('#datepicker-required').removeClass('has-error');
        }

        if (!$('#' + formId).valid())
            return;

        event.preventDefault();

        displayError(false);

        $.ajax({
            url: url,
            type: 'get',
            data: $('#' + formId).serialize(),
            success: function (data) {
                verifySession(data);

                $('#partialView').html(data.partialView);
                initDataTableDetail(tableId, false);

                if (tableIdDetail === '')
                    $.Pages.initSwitcheryPlugin();
                else                
                    configTableDetail1(tableId, tableIdDetail);

                if (data.listResultsDetail1 !== undefined && data.listResultsDetail1 !== "null") {
                    var lista = JSON.parse(data.listResultsDetail1);
                    if (lista.length > 0) {
                        localStorage.removeItem(`listResultsDetail1_${tableId}`);
                        localStorage.setItem(`listResultsDetail1_${tableId}`, data.listResultsDetail1);
                    } else {
                        displayError(true);
                    }
                }

                if (data.listResultsDetail2 !== undefined && data.listResultsDetail2 !== "null") {
                    var listaDetail = JSON.parse(data.listResultsDetail2);
                    if (listaDetail.length > 0) {
                        localStorage.removeItem(`listResultsDetail2_${tableId}`);
                        localStorage.setItem(`listResultsDetail2_${tableId}`, data.listResultsDetail2);
                    } else {
                        displayError(true);
                    }
                }                

                if (data.partialView.trim() === '') {
                    displayError(true);
                }

                if (data.listResults !== undefined && data.listResults !== "null") {
                    var listResults = JSON.parse(data.listResults);
                    if (listResults.length > 0) {
                        localStorage.removeItem(`listResults_${tableId}`);
                        localStorage.setItem(`listResults_${tableId}`, data.listResults);
                    }
                }
            },
            error: function (f1, f2, f3) {
                $('#errorId').html(f3);
            }
        });

    });
}

function initAjaxGetDetailReconciling(url, formId, tableId, tableIdDetail, orientationPDF) {
    $('#button-serch').click(function () {

        if ($('#datepicker-required').hasClass('form-group required has-error')) {
            $('#datepicker-required').removeClass('has-error');
        }

        if (!$('#' + formId).valid())
            return;

        event.preventDefault();

        displayError(false);

        $.ajax({
            url: url,
            type: 'get',
            data: $('#' + formId).serialize(),
            success: function (data) {
                verifySession(data);

                $('#partialView').html(data.partialView);
                initDataTableDetail(tableId, false);

                if (tableIdDetail === '')
                    $.Pages.initSwitcheryPlugin();
                else
                    configTableDetail1(tableId, tableIdDetail);

                if (data.partialView.trim() === '') {
                    displayError(true);
                }
            },
            error: function (f1, f2, f3) {
                $('#errorId').html(f3);
            }
        });

    });
}

function initAjaxGetReportDetail(url, formId, tableId, tableIdDetail, orientationPDF, pReport, pFilter) {
    $('#button-serch').click(function () {

        //Usado para montar o cabeçalho do PDF
        var pByReport = '{ "param" : [' +
            '{ "value":"Report" , "text":"'+pReport+'" },' +
            '{ "value":"'+pFilter+'" , "text":"' + $('#StartDate').val() + '" },' +
            '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';


        if ($('#datepicker-required').hasClass('form-group required has-error')) {
            $('#datepicker-required').removeClass('has-error');
        }

        if (!$('#' + formId).valid())
            return;

        event.preventDefault();

        displayError(false);

        $.ajax({
            url: url,
            type: 'get',
            data: $('#' + formId).serialize(),
            success: function (data) {
                verifySession(data);

                if (data.partialView == "") {
                    $('#errorId').html("Não existem registros para o período.");
                }

                $('#partialView').html(data.partialView);
                initDataTableReports(tableId, orientationPDF, pByReport);
                configTableDetail1(tableId, tableIdDetail);

                if (data.listResultsDetail1 != undefined && data.listResultsDetail1 != "null") {
                    var lista = JSON.parse(data.listResultsDetail1);
                    if (lista.length > 0) {
                        localStorage.removeItem(`listResultsDetail1_${tableId}`);
                        localStorage.setItem(`listResultsDetail1_${tableId}`, data.listResultsDetail1);                                                
                    } else {
                        displayError(true);
                    }
                }

                if (data.listResultsDetail2 != undefined && data.listResultsDetail2 != "null") {
                    var listaDetail = JSON.parse(data.listResultsDetail2);
                    if (listaDetail.length > 0) {
                        localStorage.removeItem(`listResultsDetail2_${tableId}`);
                        localStorage.setItem(`listResultsDetail2_${tableId}`, data.listResultsDetail2);
                    } else {
                        displayError(true);
                    }
                }

                if (data.partialView.trim() == '') {
                    displayError(true);
                }

                if (data.listResults != undefined && data.listResults != "null") {
                    var listResults = JSON.parse(data.listResults);
                    if (listResults.length > 0) {
                        localStorage.removeItem(`listResults_${tableId}`);
                        localStorage.setItem(`listResults_${tableId}`, data.listResults);
                    }
                }
            },
            error: function (f1, f2, f3) {
                $('#errorId').html(f3);
            }
        });

    });
}

function initAjaxGet(url, formId, tableId, orientationPDF, pReport, pFilter) {
    $('#button-serch').click(function () {

        /*
        Utilzado para montar o cabeçalho do PDF
        */
        var pByReport = '{ "param" : [' +
            '{ "value":"Report" , "text":"' + pReport + '" },';

        switch (pReport) {
            case 'boarding':
                pByReport += '{ "value":"' + pFilter + '" , "text":"' + $('#ShippingTimeMov').val() + '" } ]}';
                break;
            case 'emtutransmissao':
                pByReport += '{ "value":"Enviado " , "text":"' + $('#Send option:selected').text() + '" },' +
                             '{ "value":"' + pFilter + '" , "text":"' + $('#StartDate').val() + '" },' +
                             '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';
                break;
            case 'expectedOperational':
                pByReport += '{ "value":"' + pFilter + '" , "text":"' + $('#StartDate').val() + '" },' +
                             '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';
                break;
            case 'location':
                pByReport += '{ "value":"Sistema " , "text":"' + $('#SystemType option:selected').text() + '" },' +
                             '{ "value":"' + pFilter + '" , "text":"' + $('#StartDate').val() + '" },' +
                             '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';
                break;
            case 'recipe':
                pByReport += '{ "value":"Mês" , "text":"' + $('#Mes option:selected').text() + '" },' +
                             '{ "value":"Ano" , "text":"' + $('#Ano option:selected').text() + '" } ]}';
                break;  
            case 'qiom':
                pByReport += '{ "value":"Linha " , "text":"' + $('#CodLine option:selected').text() + '" },' +
                             '{ "value":"' + pFilter + '" , "text":"' + $('#StartDate').val() + '" },' +
                             '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';
                break;
        }
        
        if ($('#datepicker-required').hasClass('form-group required has-error')){
            $('#datepicker-required').removeClass('has-error');
        }

        if (!$('#' + formId).valid())
            return;

        event.preventDefault();

        displayError(false);

        $.ajax({
            url: url,
            type: 'get',
            data: $('#' + formId).serialize(),
            success: function (data) {
                verifySession(data);

                $('#partialView').html(data.partialView);
                initDataTableReports(tableId, orientationPDF, pByReport);
                configInputTable(tableId);

                if (data.partialView.trim() === '') {
                    displayError(true);
                }
            },
            error: function (f1, f2, f3) {
                $('#errorId').html(f3);
                console.log("Erro " + f3);
            }
        });

    });
}

function configFormValidateReport(id) {
    $('#' + id).validate({
        errorPlacement: function (error, element) {
            var parent = $(element).closest('.form-group');

            if (parent.hasClass('form-group')) {
                parent.addClass('has-error');
                error.insertAfter(parent);
            } else {
                error.insertAfter(element);
            }
        },

        rules: {
            StartDate: "required",
            EndDate: "required"
        },
        messages: {
            StartDate: {
                required: 'Informe o período.'
            },
            EndDate: {
                required: ''
            }
        }
    });
}

function displayError(display) {
    $('#contentErrorId').css("display", display == true ? "block" : "none");
}

/**
 * /
 * @param {any} pId = Id da table
 * @param {any} pOrientation = orientação da impressão do pdf (landscape ou portait)
 */

function initDataTableReports(pId, pOrientation, pByReport, paging) {
    var table = $('#' + pId);
    table.dataTable({
        "autoWidth": false,
        "sDom": "<'form-group 'Blf><t><'row'<p i>>",
        "scrollCollapse": true,
        "paging": paging,
        "bFilter": paging,
        "destroy": true,
        "oLanguage": {
            "sLengthMenu": "_MENU_",
            "sInfo": "Mostrando de <b>_START_ até _END_</b> de _TOTAL_ registros".replace(',', '.'),
            "sInfoFiltered": "(filtro do total de _MAX_ registros)",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            "sSearchPlaceholder": "Pesquisar",
            "sSearch": ""
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
                extend: 'excelHtml5',
                className: 'btn btn-complete btn-cons btn-sm',
                footer: true,
                text: 'EXCEL',
                chartset: 'UTF-8',
                bom: true,
                exportOptions: {
                    columns: [':not(.noExport)'],
                    format: {
                        body: function (data, row, column, node) {
                            data = $('<p>' + data + '</p>').text();
                            return $.isNumeric(data.replace(',', '.')) ? data.replace(',', '.') : data;
                        }
                    }
                }
            },
            {
                extend: 'pdfHtml5',
                className: 'btn btn-complete btn-cons btn-sm',
                messageTop: pByReport,
                orientation: pOrientation,
                footer: true,
                pageSize: 'A4',
                customize: function (doc) {
                    doc.content[0].text = doc.content[0].text.trim();                    
                    /*
                    Utilzado para orientar o PDF em paisagem caso tenha mais de 8 colunas   
                    */
                    var tableNode;
                    for (i = 0; i < doc.content.length; ++i) {
                        if (doc.content[i].table !== undefined) {
                            tableNode = doc.content[i];
                            break;
                        }
                    }
                    var rowIndex = 0;
                    var tableColumnCount = tableNode.table.body[rowIndex].length;

                    if (tableColumnCount > 8) {
                        doc.pageOrientation = 'landscape';
                    }

                    /*
                    Utilzado para montar o relatório  
                    */
                    var parametersByReport = JSON.parse(doc.content[1].text);
                    var rowCount = doc.content[2].table.body.length;
                    var subRowCount = 0;
                    var colCount = new Array();

                    switch (parametersByReport.param[0].text) {
                        case 'boarding':

                            doc.content[0].text = "Relatório de Embarque";
                            doc.content[1].text = parametersByReport.param[1].value + ': ' + parametersByReport.param[1].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'center';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break;

                        case 'demandSection':
                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });

                                //remover colunas display none
                                colCount.splice(4, 1);

                                doc.content[2].table.widths = colCount;
                            }

                            doc.content[0].text = "Relatório Demanda Por Seção";
                            doc.content[1].text = parametersByReport.param[1].value + ': ' + parametersByReport.param[1].text + ' ' + parametersByReport.param[2].value + ' ' + parametersByReport.param[2].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'center';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break;

                        case 'emtutransmissao':
                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });

                                doc.content[2].table.widths = colCount;
                            }

                            doc.content[0].text = "Pesquisa de Transmissões EMTU " + parametersByReport.param[1].value + " (" + parametersByReport.param[1].text + ")";
                            doc.content[1].text = parametersByReport.param[2].value + ': ' + parametersByReport.param[2].text + ' ' + parametersByReport.param[3].value + ' ' + parametersByReport.param[3].text;

                            break;

                        case 'expectedOperational':
                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });

                                //remover colunas display none
                                colCount.splice(4, 1);

                                doc.content[2].table.widths = colCount;
                            }

                            doc.content[0].text = "Relatório Operacional";
                            doc.content[1].text = parametersByReport.param[1].value + ': ' + parametersByReport.param[1].text + ' ' + parametersByReport.param[2].value + ' ' + parametersByReport.param[2].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'center';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break;

                        case 'location':
                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });

                                //remover colunas display none
                                colCount.splice(4, 1);

                                doc.content[2].table.widths = colCount;
                            }

                            doc.content[0].text = "Relatório de Localização " + parametersByReport.param[1].value + parametersByReport.param[1].text;
                            doc.content[1].text = parametersByReport.param[2].value + ': ' + parametersByReport.param[2].text + ' ' + parametersByReport.param[3].value + ' ' + parametersByReport.param[3].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'center';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break;

                        case 'management':

                            doc.content[0].text = parametersByReport.param[1].text + '' + parametersByReport.param[2].text;
                            doc.content[1].text = parametersByReport.param[3].value + ': ' + parametersByReport.param[3].text + ' ' + parametersByReport.param[4].value + ' ' + parametersByReport.param[4].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'center';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break;
                        case 'openCollectors':

                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });
                                doc.content[2].table.widths = colCount;
                            }                           
                            
                            doc.content[0].text = parametersByReport.param[1].text;
                            doc.content[1].text = parametersByReport.param[2].value + ': ' + parametersByReport.param[2].text + ' ' + parametersByReport.param[3].value + ' ' + parametersByReport.param[3].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'left';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }                            
                            break;                        

                        case 'pass':
                            table.find('tbody tr:first-child td').each(function () {
                                if ($(this).attr('colspan')) {
                                    for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                        colCount.push('*');
                                    }
                                } else { colCount.push('*'); }
                            });

                            //remover colunas display none
                            colCount.splice(5, 1);
                            colCount.splice(6,1);

                            doc.content[2].table.widths = colCount;

                            doc.content[0].text = "Relatório de Passagens";
                            doc.content[1].text = parametersByReport.param[1].value + ': ' + parametersByReport.param[1].text + ' ' + parametersByReport.param[2].value + ' ' + parametersByReport.param[2].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'center';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break;

                        case 'recipe':

                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });
                                doc.content[2].table.widths = colCount;
                            }

                            doc.content[0].text = "Relatório Receita";
                            doc.content[1].text = parametersByReport.param[1].text + '/' + parametersByReport.param[2].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'left';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break; 

                        case 'rmf':

                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });
                                doc.content[2].table.widths = colCount;
                            }

                            doc.content[0].text = parametersByReport.param[1].text;
                            doc.content[1].text = parametersByReport.param[2].value + ': ' + parametersByReport.param[2].text + ' ' + parametersByReport.param[3].value + ' ' + parametersByReport.param[3].text;

                            for (y = 1; y < rowCount; y++) {
                                subRowCount = doc.content[2].table.body[y].length;
                                for (var x = 0; x < subRowCount; x++) {
                                    if (x == 0)
                                        doc.content[2].table.body[y][x].alignment = 'left';
                                    else
                                        doc.content[2].table.body[y][x].alignment = 'right';
                                }
                            }
                            break; 
                        case 'rmd':

                            table.find('tbody tr:first-child td').each(function (index) {
                                if (index <= 0) {
                                    colCount.push('30%');
                                }
                                else if ($(this).attr('colspan')) {
                                    for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                        colCount.push('*');
                                    }
                                } else {
                                    colCount.push('*');
                                }
                            });
                            doc.content[2].table.widths = colCount;

                            doc.content[0].text = parametersByReport.param[1].text;
                            doc.content[1].text = parametersByReport.param[2].value + ': ' + parametersByReport.param[2].text + parametersByReport.param[3].value + parametersByReport.param[3].text;

                            break; 
                        case 'qiom':
                            if (tableColumnCount < 6) {
                                table.find('tbody tr:first-child td').each(function () {
                                    if ($(this).attr('colspan')) {
                                        for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                                            colCount.push('*');
                                        }
                                    } else { colCount.push('*'); }
                                });

                                //remover colunas display none
                                colCount.splice(4, 1);

                                doc.content[2].table.widths = colCount;
                            }

                            doc.content[0].text = "Pesquisa de Quadro Informativo Operacional Mensal - QIOM " + parametersByReport.param[1].value + parametersByReport.param[1].text;
                            doc.content[1].text = parametersByReport.param[2].value + ': ' + parametersByReport.param[2].text + ' ' + parametersByReport.param[3].value + ' ' + parametersByReport.param[3].text;

                            break;
                    }                

                   /*
                   Utilzado para o rodapé da pádina   
                    */
                    doc['footer'] = (function (page, pages) {
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
                    }); 
                },
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        fnInfoCallback: function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
            //Evento durante a paginação            
        },
        fnInitComplete: function () {
            $('.buttons-html5').removeClass("dt-button");
            var tableInfo = $('#' + pId + '_info');
            tableInfo[0].innerText = tableInfo[0].innerText.replace(',', '.');
        }
    });

}

function initDataTableDetail(pId, paging) {
    var table = $('#' + pId);
    if (paging) {
        defineDataTablePaging(table);

        $('#search-table').keyup(function () {            
            table.fnFilter($(this).val());
        });
    }
    else {
        defineDataTable(table);
    }
}

function initDataTableSubDetail(pId, paging) {
    var table = $('#' + pId);
    if (paging) {
        defineDataTablePaging(table);

        $('#search-table').keyup(function () {
            table.fnFilter($(this).val());
            removeLineDetail(table);
        });
    }
    else {
        defineDataTable(table);
    }
}

function defineDataTablePaging(table) {
    table.dataTable({
        "sDom": "<t><'row'<p i>>",
        "scrollCollapse": true,
        "paging": true,
        "destroy": true,
        "oLanguage": {
            "sLengthMenu": "_MENU_ ",
            "sInfo": "Mostrando de <b>_START_ até _END_</b> de _TOTAL_ registros",
            "sInfoFiltered": "(filtro do total de _MAX_ registros)",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros"
        },
        "iDisplayLength": 10,
        fnInitComplete: function () {
            $('.buttons-html5').removeClass("dt-button");
        }
    });
}

function defineDataTable(table) {
    table.dataTable({
        "autoWidth": false,
        "sDom": "<'form-group 'f><t><'row'>",
        "scrollCollapse": true,
        "paging": false,
        "destroy": true,
        "oLanguage": {
            "sSearchPlaceholder": "Pesquisar",
            "sSearch": ""
        },
        fnInitComplete: function () {
            $('.buttons-html5').removeClass("dt-button");
        }
    });
}

function removeLineDetail(table) {    

    table.find('tbody tr').each(function (indice) {        

        if ($(this).attr('id') == 'trDetail1') {
            if ($(this).hasClass('shown')) {
                $(this).removeClass('shown');
                $(this).next().remove();
            }            
        }
        else {
            $(this).remove();
        }
    });
}

function initDataSubTableDetail(pId, data) { 
    var table = $('#' + pId);
    var _format = function (d, index) {
        var content = '';

        if (index === undefined) {
            return content;
        }

        content = '<table class="table table-inline">';

        if (data[index].accessKey)
            content += '<tr><td colspan=2>Chave de Acesso: ' + data[index].accessKey + '</td></tr>';

        content += '<tr>' +
            '<td>Serial: ' + data[index].serialMov + '</td>' +
            '<td>Sequencial Bilhete: ' + data[index].sequencialBilheteMov + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Tarifa: R$ ' + data[index].tarifaMov.toFixed(2) + '</td>' +
            '<td>Seguro: R$ ' + data[index].seguroMov.toFixed(2) + '</td>' +
            '</tr>';

        if (data[index].errorMessage)
            content += "<tr><td colspan=2><textarea disabled rows='10' cols='190' class='label label-important' style='overflow-y: scroll; resize: none'>" + data[index].errorMessage + "</textarea></td></tr>";

        content += '</table>';

        return content;
    };

    $('#' + pId + ' tbody').on('click', 'tr', function (e) {

        if (e.currentTarget.id == 'trDetail1') {
            if ($(this).hasClass('shown') && $(this).next().hasClass('row-details')) {
                $(this).removeClass('shown');
                $(this).next().remove();
                return;
            }

            var tr = $(this).closest('tr');
            var row = table.DataTable().row(tr);

            $(this).parents('tbody').find('.shown').removeClass('shown');
            $(this).parents('tbody').find('.row-details').remove();

            row.child(_format(row.data(), this._DT_RowIndex)).show();
            tr.addClass('shown');
            tr.next().addClass('row-details');
        }
       
    });
}  

function initDataSubTableReprocessDetail(pId, data) {
    var table = $('#' + pId);
    var _format = function (d, index) {
        var content = '';

        if (index == undefined) {
            return content;
        }
        
        content = '<table class="table table-inline">';

        if (data[index].accessKey)
            content += '<tr><td colspan=2>Chave de Acesso: ' + data[index].accessKey + '</td></tr>';

        content += '<tr>' +
            '<td>Serial: ' + data[index].serialMovFS + '</td>' +
            '<td>Sentido: ' + data[index].sentidoMovFs + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td colspan=2>Linha: ' + data[index].codLinha + ' - ' + data[index].nomeLinha + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Origem: ' + data[index].nomeLocalidadeOrigem + '</td>' +
            '<td>Destino: ' + data[index].nomeLocalidadeDestino + '</td>' +
            '</tr>';

        content += '</table>';

        return content;
    };

    $('#' + pId + ' tbody').on('click', 'tr', function () {
        if ($(this).hasClass('shown') && $(this).next().hasClass('row-details')) {
            $(this).removeClass('shown');
            $(this).next().remove();
            return;
        }

        var tr = $(this).closest('tr');
        var row = table.DataTable().row(tr);

        $(this).parents('tbody').find('.shown').removeClass('shown');
        $(this).parents('tbody').find('.row-details').remove();

        row.child(_format(row.data(), this._DT_RowIndex)).show();
        tr.addClass('shown');
        tr.next().addClass('row-details');
    });
}  

function initDataTableDetailWithDropDownList(pId, order) {
    var table = $('#' + pId);

    table.dataTable({
        "sDom": "<t><'row'<p i>>",
        "scrollCollapse": true,
        "paging": false,
        "destroy": true,        
        "ordering": order
    });

    $('#search-table').keyup(function () {

        //Valor colocado no campo search
        var valueSearch = $(this).val();

        //Contador usado para verificar quantas TDs das TR possui o valueSearch informado
        var contFound;

        table.find('tr').each(function (indice) {

            // Começar após o cabeçalho
            if (indice > 0) {

                contFound = 0;

                $(this).find('td').each(function (indice) {

                    // Pegando o valor do imput visível na TD
                    var imputElement = $(this).is(':visible') ? $(this).find('input[type=text]').val() : '';
                    var strImputElement = $.trim(imputElement);//Converter em String

                    // Pegando o valor que está sendo selecionado na dropownlist da TD
                    var dropDownElement = $(this).find('select').find('option:selected');

                    //Verificando se a TD possue o valueSearch
                    if (dropDownElement.text().toUpperCase().indexOf(valueSearch.toUpperCase()) !== -1 ||
                        strImputElement.toUpperCase().indexOf(valueSearch.toUpperCase()) !== -1) {

                        contFound++;
                    }
                });

                //Verificando se a TR possui alguma TD com o valueSearch
                if (contFound === 0) {
                    $(this).hide();//Esconde TR
                }
                else {
                    $(this).show();//Exibe TR
                }
            }
        });
    });
}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function doTruncarStr(str, size) {
    if (str == undefined || str == 'undefined' || str == '' || size == undefined || size == 'undefined' || size == '') {
        return str;
    }

    var shortText = str;
    if (str.length >= size + 3) {
        shortText = str.substring(0, size).concat('...');
    }
    return shortText;
}   