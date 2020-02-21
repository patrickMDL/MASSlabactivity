
var QIOM = new function () {
    this.GetByDate = function (pUrl, pForm) {
        //Limpar a Tabela antes
        $('#tableQIOM').DataTable().clear().draw();
        $("#infoTableQIOM").empty();

        $.ajax({
            url: pUrl,
            type: 'get',
            data: pForm,
            success: function (data) {
                verifySession(data);

                /*
                Utilzado para montar o cabeçalho do PDF
                */
                var pByReport = '{ "param" : [' +
                    '{ "value":"Report" , "text":"' + pReport + '" },';

                pByReport += '{ "value":"Linha " , "text":"' + $('#CodLine option:selected').text() + '" },' +
                    '{ "value":"' + pFilter + '" , "text":"' + $('#StartDate').val() + '" },' +
                    '{ "value":"até" , "text":"' + $('#EndDate').val() + '" } ]}';

                QIOM.InitializeTable(data.listSectionQIOM, 'portait', pByReport);
                QIOM.InitializeTableInfo(data.nameLine, data.totalPassengers, data.totalRevenue, data.totalCoeficienteMedioAproveitamento);
                $("#partialView").show();
            },
            error: function (f1, f2, f3) {
                $('#errorId').html(f3);
                console.log("Erro " + f3);
            }
        });
    };

    // Initialize datatable showing export options
    this.InitializeTable = function (model, pOrientation, pByReport) {
        var table = $('#tableQIOM');

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
                    "class": "v-align-middle", "width": "20%", "data": function (data) {
                        return data["origem"];
                    }
                },
                {
                    "class": "v-align-middle", "width": "20%", "data": function (data) {
                        return data["destino"];
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return QIOM.MaskValue(data["extensao"]);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return data["qtPassIda"];
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return data["qtPassVolta"];
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return data["qtPassTotal"];
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return data["qtGratisTotal"];
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return data["qtEscolarTotal"];
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return data["totalSecao"];
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return QIOM.MaskValue(Math.round(data["valorTotalIda"] * 100) / 100);
                    }
                },
                {
                    "class": "v-align-middle text-right", "width": "8%", "data": function (data) {
                        return QIOM.MaskValue(Math.round(data["valorTotalVolta"] * 100) / 100);
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
                pageTotalColumn8 = api
                    .column(8)
                    .data()
                    .reduce(function (a, b, ) {
                        return intVal(a) + intVal(b);
                    }, 0);

                pageTotalColumn9 = api
                    .column(9)
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

                // Update footer
                $(api.column(0).footer()).html(
                    'Totais'
                );

                $(api.column(8).footer()).html(
                    pageTotalColumn8
                );

                $(api.column(9).footer()).html(
                    QIOM.MaskValueFooter(pageTotalColumn9)
                );

                $(api.column(10).footer()).html(
                    QIOM.MaskValueFooter(pageTotalColumn10)
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
                        var colCount = new Array();                        

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
                        };                 },
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

    this.InitializeTableInfo = function (nameLine, totalPassengers, totalRevenue, totalCoeficienteMedioAproveitamento) {
        var div = $('#infoTableQIOM');

        var content = '<table width="100%">' +
                        '<tr>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">Linha:</td>' +
                            '<td colspan="3" bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">' +
                                '<b>' + nameLine + '</b>' +
                            '</td>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">DIRETA</td>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">&nbsp;</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">Passageiros Tranportados:</td>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">' +
                                '<b>' + totalPassengers + '</b>' +
                            '</td>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">Receita:</td>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">' +
                                '<b>' + totalRevenue + '</b>' +
                            '</td>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">Coef. Med. Aproveitamento:</td>' +
                            '<td bgcolor="#FFFFCC" style="padding: 10px; font-size: 13.5px; font-family: montserrat;">' +
                                '<b>' + totalCoeficienteMedioAproveitamento + '%</b>' +
                            '</td>' +
                        '</tr>' +
                       '</table>';

        div.prepend(content);

    };

    this.MaskValue = function (value) {
        var icons = "";

        zero = QIOM.CompletDecimal(value);
        vr = QIOM.FilterValue(value);

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

        vr = QIOM.FilterValue(value);

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