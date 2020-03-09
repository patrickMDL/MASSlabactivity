var Management = new function () {
    this.GetByDate = function (pUrl, pForm) {
        //Limpar a Tabela antes
        $('#tableManagement').DataTable().clear().draw();

        $.ajax({
            url: pUrl,
            type: 'get',
            data: pForm,
            success: function (data) {
                verifySession(data);
                $("#filterJson").val(data.filterJson);

                var descType = data.type === 1 ? 'Relatório Resumo Gestor Sintético (BALCÃO) por ' : 'Relatório Resumo Gestor Sintético (EMBARCADO) por ';

                var pByReport = '{ "param" : [' +
                    '{ "value":"Report" , "text":"management" },' +
                    '{ "value":"Title" , "text":"' + descType + '" },' +
                    '{ "value":"Agrupar" , "text":"' + $('#Group option:selected').text() + '" },' +
                    '{ "value":"Período" , "text":"' + $('#StartDate').val() + '" },' +
                    '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';

                Management.InitializeTable(data.listManagementStatic, data.group, 'portait', pByReport);
                $("#partialView").show();
            },
            error: function (f1, f2, f3) {
                $('#errorId').html(f3);
                console.log("Erro " + f3);
            }
        });
    };

    this.GetByDateDetail = function (pGroup, pFilter, pPrefixo, pComplementoFrase1, pComplementoFrase2) {

        //Limpar a Tabela antes
        $('#tableManagementAnalytic').DataTable().clear().draw();

        var json = { "Group": pGroup, "Filter": pFilter, "ManagementFilterJson": $("#filterJson").val() };

        $.ajax({
            type: "POST",
            url: '/Report/ManagementAnalyticPartial',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            success: function (data) {
                verifySession(data);

                $('#TitleModal').html('Resumo Analítico ' + pPrefixo + ' ' + pComplementoFrase1 + ' ' + '<b>' + pFilter + pComplementoFrase2 + '</b>');
                var descType = data.type === 1 ? 'Relatório Resumo Gestor Analítico (BALCÃO) ' : 'Relatório Resumo Gestor Analítico (EMBARCADO) ';

                var pByReport = '{ "param" : [' +
                    '{ "value":"Report" , "text":"management" },' +
                    '{ "value":"Title" , "text":"' + descType + pPrefixo + ' " },' +
                    '{ "value":"Agrupar" , "text":"' + $('#Group option:selected').text() + ' ' + pFilter + pComplementoFrase2 + '" },' +
                    '{ "value":"Período" , "text":"' + $('#StartDate').val() + '" },' +
                    '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';

                $("#partialView").hide();

                Management.InitializeTableDetail(data.listManagementAnalytic, data.group, 'portait', pByReport);
                Management.InitializeTableSubDetail();
                $("#listData").val(JSON.stringify(data.listManagementAnalyticTicket)); 
                $("#partialViewDetail").show();
                
            },
            error: function (f1, f2, f3) {
                console.log("Erro " + f3);
            }
        });
    };

    // Initialize datatable showing export options
    this.InitializeTable = function (model, group, pOrientation, pByReport) {
        var table = $('#tableManagement');

        var settings = {
            data: model,
            "autoWidth": false,
            "sDom": "<'form-group 'Blf><t><'row'<p i>>",
            "scrollCollapse": true,
            "paging": true,
            "bFilter": true,
            "destroy": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Mostrando de <b>_START_ até _END_</b> de _TOTAL_ registros",
                "sInfoFiltered": "(filtro do total de _MAX_ registros)",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                "sSearchPlaceholder": "Pesquisar",
                "sSearch": "",
                "sZeroRecords": "Nenhum registro encontrado",
                "sEmptyTable": "Nenhum registro encontrado"
            },
            "iDisplayLength": 10,
            "columns": [
                {
                    "title": Management.Title(group), "width": "10%", "data": function (data) {
                        var icons = "";
                        var single_quotes = "'";

                        switch (group) {
                            case 1:
                                icons = '<span' + (data["isDivisionByZero"] ? ' style="color:red !important"' : '') + ' onclick="openAnalytic(1,' + single_quotes + data["employeeNumber"] + single_quotes + ', ' + single_quotes + "do" + single_quotes + ', ' + single_quotes + "Colaborador " + single_quotes + ', ' + single_quotes + data["funcionarioNome"] + single_quotes + '); return false" class="btn btn-tag">' + data["employeeNumber"] + '</span>';
                                break;
                            case 2:
                                icons = '<span' + (data["isDivisionByZero"] ? ' style="color:red !important"' : '') + ' onclick="openAnalytic(2,' + single_quotes + data["sequencialEcf"] + single_quotes + ', ' + single_quotes + "do" + single_quotes + ', ' + single_quotes + "Equipamento " + single_quotes + ', ' + single_quotes + single_quotes + '); return false" class="btn btn-tag">' + data["sequencialEcf"] + '</span>';
                                break;
                            case 3:
                                icons = '<span' + (data["isDivisionByZero"] ? ' style="color:red !important"' : '') + ' onclick="openAnalytic(3,' + single_quotes + data["numeroLinha"] + single_quotes + ', ' + single_quotes + "da" + single_quotes + ', ' + single_quotes + "Linha " + single_quotes + ', ' + single_quotes + single_quotes + '); return false" class="btn btn-tag">' + data["numeroLinha"] + '</span>';
                                break;
                            case 4:
                                icons = '<span' + (data["isDivisionByZero"] ? ' style="color:red !important"' : '') + ' onclick="openAnalytic(4,' + single_quotes + data["numeroLocalidade"] + single_quotes + ', ' + single_quotes + "da" + single_quotes + ', ' + single_quotes + "Localidade " + single_quotes + ', ' + single_quotes + data["nomeLocalidade"] + single_quotes + '); return false" class="btn btn-tag">' + data["numeroLocalidade"] + '</span>';
                                break;
                            case 5:
                                icons = '<span' + (data["isDivisionByZero"] ? ' style="color:red !important"' : '') + ' onclick="openAnalytic(5,' + single_quotes + data["codigoIbgeMunicipio"] + single_quotes + ', ' + single_quotes + "do" + single_quotes + ', ' + single_quotes + "Município " + single_quotes + ', ' + single_quotes + data["nomeMunicipio"] + single_quotes + '); return false" class="btn btn-tag">' + data["codigoIbgeMunicipio"] + '</span>';
                                break;
                        }

                        return icons;
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalFareWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["fullPercent"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalInsuranceWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalTollWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalBoardingTaxWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["manager"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["managerPercent"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["icms"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["icmsPercent"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalTicket"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["passes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["request"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalLiquid"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["gratuities"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["losses"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["lossesPercent"] * 100) / 100);
                    }
                }
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();

                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$.\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };
                
                // Total over this page
                //total = api
                //    .column(4, { page: 'current' })
                //    .data()
                //    .reduce(function (a, b) {
                //        return intVal(a) + intVal(b);
                //    }, 0);

                // Total over all pages
                pageTotalColumn1 = api
                    .column(1)
                    .data()
                    .reduce(function (a, b,) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn3 = api
                    .column(3)
                    .data()
                    .reduce(function (a, b) { 
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn4 = api
                    .column(4)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn5 = api
                    .column(5)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn6 = api
                    .column(6)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn8 = api
                    .column(8)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn10 = api
                    .column(10)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn11 = api
                    .column(11)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn12 = api
                    .column(12)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn13 = api
                    .column(13)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn14 = api
                    .column(14)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn15 = api
                    .column(15)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);


                // Update footer
                $(api.column(0).footer()).html(
                    'Totais'
                );

                $(api.column(1).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn1)
                );

                $(api.column(2).footer()).html(
                    ''
                );

                $(api.column(3).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn3)
                );

                $(api.column(4).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn4)
                );

                $(api.column(5).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn5)
                );

                $(api.column(6).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn6)
                );

                $(api.column(7).footer()).html(
                    ''
                );

                $(api.column(8).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn8)
                );

                $(api.column(9).footer()).html(
                    ''
                );

                $(api.column(10).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn10)
                );

                $(api.column(11).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn11)
                );

                $(api.column(12).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn12)
                );

                $(api.column(13).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn13)
                );

                $(api.column(14).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn14)
                );

                $(api.column(15).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn15)
                );

                $(api.column(16).footer()).html(
                    ''
                );
            },
            "order": [[0, "desc"]],
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

                        doc.content[0].text = parametersByReport.param[1].text + '' + parametersByReport.param[2].text;
                        doc.content[1].text = parametersByReport.param[3].value + ': ' + parametersByReport.param[3].text + ' ' + parametersByReport.param[4].value + ' ' + parametersByReport.param[4].text;

                        for (y = 1; y < rowCount; y++) {
                            subRowCount = doc.content[2].table.body[y].length;
                            for (var x = 0; x < subRowCount; x++) {
                                if (x === 0)
                                    doc.content[2].table.body[y][x].alignment = 'center';
                                else
                                    doc.content[2].table.body[y][x].alignment = 'right';
                            }
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
            fnInitComplete: function () {
                $('.buttons-html5').removeClass("dt-button");
            }
        };

        table.dataTable(settings);
    };

    this.InitializeTableDetail = function (model, group, pOrientation, pByReport) {
        var table = $('#tableManagementAnalytic');
        var settings = {
            data: model,
            "autoWidth": false,
            "sDom": "<'form-group 'Blf><t><'row'<p i>>",
            "scrollCollapse": true,
            "paging": false,
            "bFilter": true,
            "destroy": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Mostrando de <b>_START_ até _END_</b> de _TOTAL_ registros",
                "sInfoFiltered": "(filtro do total de _MAX_ registros)",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                "sSearchPlaceholder": "Pesquisar",
                "sSearch": "",
                "sZeroRecords": "Nenhum registro encontrado",
                "sEmptyTable": "Nenhum registro encontrado"
            },
            "iDisplayLength": 10,
            "columns": [
                {
                    "width": "10%", "data": function (data) {
                        var icons = "";
                        
                        icons = '<span' + (data["isDivisionByZero"] ? ' style="color:red !important" ' : '') + '>' + Management.MaskDate(data["horarioPartidaMov"]) + '</span>';

                        return icons;
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalFareWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["fullPercent"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalInsuranceWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalTollWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalBoardingTaxWithoutTaxes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["manager"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["managerPercent"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["icms"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["icmsPercent"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalTicket"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["passes"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["request"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["totalLiquid"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["gratuities"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["losses"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return Management.MaskValue(Math.round(data["lossesPercent"] * 100) / 100);
                    }
                }
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api();

                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$.\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Total over this page
                //total = api
                //    .column(4, { page: 'current' })
                //    .data()
                //    .reduce(function (a, b) {
                //        return intVal(a) + intVal(b);
                //    }, 0);

                // Total over all pages
                pageTotalColumn1 = api
                    .column(1)
                    .data()
                    .reduce(function (a, b, ) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn3 = api
                    .column(3)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn4 = api
                    .column(4)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn5 = api
                    .column(5)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn6 = api
                    .column(6)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn8 = api
                    .column(8)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn10 = api
                    .column(10)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn11 = api
                    .column(11)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn12 = api
                    .column(12)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn13 = api
                    .column(13)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn14 = api
                    .column(14)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn15 = api
                    .column(15)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);


                // Update footer
                $(api.column(0).footer()).html(
                    'Totais'
                );

                $(api.column(1).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn1)
                );

                $(api.column(2).footer()).html(
                    ''
                );

                $(api.column(3).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn3)
                );

                $(api.column(4).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn4)
                );

                $(api.column(5).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn5)
                );

                $(api.column(6).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn6)
                );

                $(api.column(7).footer()).html(
                    ''
                );

                $(api.column(8).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn8)
                );

                $(api.column(9).footer()).html(
                    ''
                );

                $(api.column(10).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn10)
                );

                $(api.column(11).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn11)
                );

                $(api.column(12).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn12)
                );

                $(api.column(13).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn13)
                );

                $(api.column(14).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn14)
                );

                $(api.column(15).footer()).html(
                    Management.MaskValueFooter(pageTotalColumn15)
                );

                $(api.column(16).footer()).html(
                    ''
                );
            },
            "order": [[0, "desc"]],
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
                    className: 'btn btn-warning btn-cons btn-sm',
                    footer: true,
                    text: 'VOLTAR',
                    action: function (e, dt, node, config) {                        
                        $("#partialViewDetail").hide();
                        $("#partialView").show();
                    }
                },
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

                        doc.content[0].text = parametersByReport.param[1].text + '' + parametersByReport.param[2].text;
                        doc.content[1].text = parametersByReport.param[3].value + ': ' + parametersByReport.param[3].text + ' ' + parametersByReport.param[4].value + ' ' + parametersByReport.param[4].text;

                        for (y = 1; y < rowCount; y++) {
                            subRowCount = doc.content[2].table.body[y].length;
                            for (var x = 0; x < subRowCount; x++) {
                                if (x === 0)
                                    doc.content[2].table.body[y][x].alignment = 'center';
                                else
                                    doc.content[2].table.body[y][x].alignment = 'right';
                            }
                        }

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
            "fnCreatedRow": function (nRow, aData, iDataIndex) {
                $(nRow).attr('id', "trDetail1");                
            },
            fnInitComplete: function () {
                $('.buttons-html5').removeClass("dt-button");
            }
        };

        table.dataTable(settings);
    };

    this.InitializeTableSubDetail = function () {
        var table = $('#tableManagementAnalytic');
        var _format = function (d, index) {
            var listResults = $('#listData').val();
            listResults = JSON.parse(listResults);

            var content = '<table class="table table-inline">';

            var _horarioPartidaMov = d.horarioPartidaMov.substr(0, 10);

            if (listResults.length > 0) {
                $.each(listResults, function (indice) {
                    
                    horarioPartidaMovLocal = listResults[indice].horarioPartidaMov.substr(0, 10);

                    if (_horarioPartidaMov === horarioPartidaMovLocal) {

                        _tr = '<tr><td><table class="table table-detail-detail">';

                        _tr += '<thead>' + '<tr>' +
                            '<th class="v-align-middle" colspan="5">Nº Bilhete: <span style="color:black;"><b>' + listResults[indice].sequencialBilheteMov + '</b></span></th>' +                            
                            '</tr>' + '<tr>' +
                            '<th class="v-align-middle" colspan="2">Tipo: <span style="color:black;"><b>' + listResults[indice].passengerTypeName + '</b></span></th>' +
                            '<th class="v-align-middle" colspan="3">Hora Embarque: <span style="color:black;"><b>' + Management.MaskDate(listResults[indice].horarioEmbarqueMov) + ' ' + listResults[indice].horarioEmbarqueMov.substr(11, 19) + '</b></span></th>' +
                            '</tr>' + '</thead>';

                        _tr += '<tbody>' + '<tr>' +
                            '<td class="v-align-middle text-right"> Tarifa <p>' + Management.MaskValue(Math.round(listResults[indice].totalFareWithoutTaxes * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> % <p>' + Management.MaskValue(Math.round(listResults[indice].fullPercent * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Seguro <p>' + Management.MaskValue(Math.round(listResults[indice].totalInsuranceWithoutTaxes * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Pedagio <p>' + Management.MaskValue(Math.round(listResults[indice].totalTollWithoutTaxes * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Tx. Embarque <p>' + Management.MaskValue(Math.round(listResults[indice].totalBoardingTaxWithoutTaxes * 100) / 100) + '</p></td>' +
                            '</tr>' + '<tr>' +
                            '<td class="v-align-middle text-right"> Gestor <p>' + Management.MaskValue(Math.round(listResults[indice].manager * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> % <p>' + Management.MaskValue(Math.round(listResults[indice].managerPercent * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Icms <p>' + Management.MaskValue(Math.round(listResults[indice].icms * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> % <p>' + Management.MaskValue(Math.round(listResults[indice].icmsPercent * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Total Bilhete <p>' + Management.MaskValue(Math.round(listResults[indice].totalTicket * 100) / 100) + '</p></td>' +
                            '</tr>' + '<tr>' +
                            '<td class="v-align-middle text-right"> Passes <p>' + Management.MaskValue(Math.round(listResults[indice].passes * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Requisição <p>' + Management.MaskValue(Math.round(listResults[indice].request * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Gratuidade <p>' + Management.MaskValue(Math.round(listResults[indice].gratuities * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> Perdas <p>' + Management.MaskValue(Math.round(listResults[indice].losses * 100) / 100) + '</p></td>' +
                            '<td class="v-align-middle text-right"> % <p>' + Management.MaskValue(Math.round(listResults[indice].lossesPercent * 100) / 100) + '</p></td>' +
                            '</tr>' + '<tr>' +
                            '<td class="v-align-middle text-right"> Total Liquido <p>' + Management.MaskValue(Math.round(listResults[indice].totalLiquid * 100) / 100) + '</p></td>' +                            
                            '</tr>' + '</tbody>';

                        _tr += '</table></td></tr>';

                        content += _tr;
                    }
                });
            }
            content += '</table>';

            return content;
        };

        $('#tableManagementAnalytic tbody tr').on('click', 'td:first', function (e) {
            if (e.delegateTarget.id === 'trDetail1') {
                if ($(this).parents('tr').hasClass('shown') && $(this).parents('tr').next().hasClass('row-details')) {
                    $(this).parents('tr').removeClass('shown');
                    $(this).parents('tr').next().remove();
                    return;
                }

                var tr = $(this).parents('tr').closest('tr');
                var row = table.DataTable().row(tr);

                $(this).parents('tr').parents('tbody').find('.shown').removeClass('shown');
                $(this).parents('tr').parents('tbody').find('.row-details').remove();

                row.child(_format(row.data(), $(this).parents('tr')[0]._DT_RowIndex)).show();
                tr.addClass('shown');
                tr.next().addClass('row-details');
            }
        });
    };

    this.Title = function (group) {
        var title = "";

        switch (group) {
            case 1:
                title = "Colab.";
                break;
            case 2:
                title = "Equip.";
                break;
            case 3:
                title = "Linha";
                break;
            case 4:
                title = "Local.";
                break;
            case 5:
                title = "Muni.";
                break;
        }

        return title;
    };

    this.MaskValue = function (value) {
        var icons = "";

        zero = Management.CompletDecimal(value); 
        vr = Management.FilterValue(value);

        if (vr.length > 0) {
            vr = vr.toString() + zero;

            tam = vr.length;
            if (tam === 1)
                icons = "0,0" + vr;
            if (tam === 2)
                icons = "0," + vr;
            if (tam > 2 && tam <= 5) {
                icons = vr.substr(0, tam - 2) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 6 && tam <= 8) {
                icons = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 9 && tam <= 11) {
                icons = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 12 && tam <= 14) {
                icons = vr.substr(0, tam - 11) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 15 && tam <= 18) {
                icons = vr.substr(0, tam - 14) + '.' + vr.substr(tam - 14, 3) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
        }

        return icons;
    };
    this.MaskValueFooter = function (value) {
        var icons = "";

        vr = Management.FilterValue(value);

        if (vr.length > 0) {
            vr = vr.toString();

            tam = vr.length;
            if (tam === 1)
                icons = "0,0" + vr;
            if (tam === 2)
                icons = "0," + vr;
            if (tam > 2 && tam <= 5) {
                icons = vr.substr(0, tam - 2) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 6 && tam <= 8) {
                icons = vr.substr(0, tam - 5) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 9 && tam <= 11) {
                icons = vr.substr(0, tam - 8) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 12 && tam <= 14) {
                icons = vr.substr(0, tam - 11) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
            if (tam >= 15 && tam <= 18) {
                icons = vr.substr(0, tam - 14) + '.' + vr.substr(tam - 14, 3) + '.' + vr.substr(tam - 11, 3) + '.' + vr.substr(tam - 8, 3) + '.' + vr.substr(tam - 5, 3) + ',' + vr.substr(tam - 2, tam);
            }
        }

        return icons;
    };

    this.MaskDate = function (value) {
        var _date = new Date(value);       

        var dd = _date.getDate();
        var mm = _date.getMonth() + 1;
        var yyyy = _date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        return dd + '/' + mm + '/' + yyyy;
    };

    this.FilterValue = function (value) {
        var s = "";
        vr = value.toString();
        tam = vr.length;
        for (i = 0; i < tam; i++) {
            if (vr.substring(i, i + 1) === "0" ||
                vr.substring(i, i + 1) === "1" ||
                vr.substring(i, i + 1) === "2" ||
                vr.substring(i, i + 1) === "3" ||
                vr.substring(i, i + 1) === "4" ||
                vr.substring(i, i + 1) === "5" ||
                vr.substring(i, i + 1) === "6" ||
                vr.substring(i, i + 1) === "7" ||
                vr.substring(i, i + 1) === "8" ||
                vr.substring(i, i + 1) === "9") {
                s = s + vr.substring(i, i + 1);
            }
        }
        return s;
    };

    this.CompletDecimal = function (value) {
        var _split = value.toString().split(".");

        if (_split.length > 1) {
            dec = _split[1];

            if (dec.length === 1)
                return "0";

            return "";
        } else {
            return "00";                
        }
        
    };
};