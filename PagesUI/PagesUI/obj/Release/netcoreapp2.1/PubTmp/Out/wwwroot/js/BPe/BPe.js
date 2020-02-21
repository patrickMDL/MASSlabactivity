var BPe = new function () {
    this.GetByDate = function (pUrl, pForm, pStartDate, pEndDate, pDayChunkSize) {
        //Limpar a Tabela antes
        $('#search-table').val('');
        $('#tableStatusBpe').DataTable().clear().draw();

        var listSplitDateRange = BPe.SplitDateRange(pStartDate, pEndDate, pDayChunkSize);
        var form = pForm.serializeArray();
        var listResult = [];
        var count = 0;

        //Guardar filtro usado
        $("#filterJson").val(JSON.stringify(form)); 

        listSplitDateRange.forEach(function (element, index, list) {

            form.forEach(function (item) {
                if (item.name === 'StartDate')
                    item.value = list[index].Initial;

                if (item.name === 'EndDate')
                    item.value = list[index].Final;
            });

            $.ajax({
                type: "GET",
                url: pUrl,
                data: form,
                content: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    verifySession(data);
                    if (data.ok) {                        
                        count++;

                        data.listMovFSBpeDetailed.forEach(function (item) {
                            listResult.push(item);
                        });

                        BPe.InitializeTable(listResult, index);
                        BPe.InitializeTableDetail();
                        $("#listData").val(JSON.stringify(listResult)); 

                        if (count === 1) {// Exibir a tabela com a primeira lista
                            $("#partialView").show();
                            $("#modalAjaxWait").modal('hide');
                            $("#divprogressbar").show();                            
                        } 

                        if (listSplitDateRange.length === count) {// Parar barra de progresso quando carregar a ultima lista                            
                            $("#divprogressbar").hide(); 
                            $("button[id='button-serch']").removeAttr("disabled").button('refresh');
                        }  
                    }
                }
            });
        });
    };

    // Initialize datatable showing export options
    this.InitializeTable = function (model, index) {
        var table = $('#tableStatusBpe');
        var settings = {
            data: model,
            "autoWidth": false,
            "sDom": "<t><'row'<p i>>",
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
                    "width": "20%", "data": function (data) {
                        var icons = "";

                        if (data["isBoarding"]) {
                            icons = '<span style="color:green; font-size: 14px">' + data["nomeLinha"] + '</span>';
                        }
                        else {
                            icons = '<span style="color:blue; font-size: 14px">' + data["nomeLinha"] + '</span>';
                        }                       

                        return icons;
                    }
                },
                { "width": "18%", "data": "nomeLocalidadeOrigem" },
                { "width": "18%", "data": "nomeLocalidadeDestino" },
                {
                    "width": "13%", "data": function (data) {
                        var icons = "";

                        if (data["idBpeStatus"] === 2 || data["idBpeStatus"] === 3) {
                            icons = '<p style="color:red; font-size: 14px">' + data["bpeStatusDescription"] +'</p>';
                        }
                        else {
                            icons = '<p font-size: 14px">' + data["bpeStatusDescription"] + '</p>';
                        }

                        return icons;
                    }
                },
                {
                    "width": "13%", "data": function (data) {

                        var _split = data["receiptAt"].split("T");
                        var _splitDate = _split[0].split("-");

                        return _splitDate[2] + "/" + _splitDate[1] + "/" + _splitDate[0] + " " + _split[1];
                    }
                },
                {
                    "width": "6%", "data": function (data) {
                        var icons = "";
                        var single_quotes = "'";

                        if (data["originalXml"]) {
                            icons = '<span title="Clique para fazer download do XML original" onclick="download(' + single_quotes + data["id"] + single_quotes + ', ' + single_quotes + 'O' + single_quotes + '); return false" class="fa fa-file-code-o" style="font-size: 20px;"></span>';
                        }
                        else {
                            icons = '<span title="Não existe arquivo para fazer download do XML original" class="fa fa-file-code-o" style="font-size: 20px;"></span>';
                        }

                        return icons;
                    }
                },
                {
                    "width": "6%", "data": function (data) {
                        var icons = "";
                        var single_quotes = "'";

                        if (data["resultedXml"]) {
                            icons = '<span title="Clique para fazer download do XML de resultado" onclick="download(' + single_quotes + data["id"] + single_quotes + ', ' + single_quotes + 'R' + single_quotes + '); return false" class="fa fa-file-code-o" style="font-size: 20px;"></span>';
                        }
                        else {
                            icons = '<span title="Não existe arquivo para fazer download do XML de resultado" class="fa fa-file-code-o" style="font-size: 20px;"></span>';
                        }                        

                        return icons;
                    }
                },
                {
                    "width": "6%", "data": function (data) {
                        var icons = "";
                        var single_quotes = "'";

                        if (data["idBpeStatus"] === 2 || data["idBpeStatus"] === 3) {
                            icons = '<span title="Clique para reprocessar" onclick="reprocess(' + single_quotes + data["id"] + single_quotes +', '+data["codMov"]+', '+(data["isBoarding"] === true)+'); return false" class="fa fa-refresh" style="font-size: 20px;"></span>';
                        } else {
                            icons = '<td class="v-align-middle"></td>';
                        }                       

                        return icons;
                    }
                }
            ],
            "order": [[0, "desc"]],
            "pageLength": 25,
            "lengthMenu": [[25, 50, 75, 100, -1], [25, 50, 75, 100, "Todos"]],
            "oClasses": {
                "sFilterInput": "form-control pull-right",
                "sFilter": "pull-right",
                "sLength": "register-number",
                "sLengthSelect": "cs-selected-register-number"
            },
            "fnCreatedRow": function (nRow, aData, iDataIndex) {
                $(nRow).attr('id', "trDetail1");
            },
            fnInitComplete: function () {
                $('.buttons-html5').removeClass("dt-button");
            }
        };

        if (index === 0) {
            $('#search-table').keyup(function () {
                table.fnFilter($(this).val());
            });
        }       

        table.dataTable(settings);
    };

    this.SplitDateRange = function (startDate, endDate, dayChunkSize) {
        var startDateSplit = startDate.split("/");
        var endDateSplit = endDate.split("/");

        var startOfThisPeriod = new Date(+startDateSplit[2], startDateSplit[1] - 1, +startDateSplit[0]);
        var _endDate = new Date(+endDateSplit[2], endDateSplit[1] - 1, +endDateSplit[0]);
        var _list = [];

        var qtdias = _endDate - startOfThisPeriod;
        var umdia = 1000 * 60 * 60 * 24;
        var intervalo = qtdias / umdia;

        for (var i = 0; i <= intervalo; i++) {
            var nextPeriod = startOfThisPeriod;
            var _obj = {};

            var _Initial = BPe.FormatDate(startOfThisPeriod);            
            var _Final = BPe.FormatDate(startOfThisPeriod);

            _obj = {
                Initial: _Initial,
                Final: _Final
            };

            _list.push(_obj);

            nextPeriod.setDate(startOfThisPeriod.getDate() + dayChunkSize);
            nextPeriod = nextPeriod < _endDate ? nextPeriod : _endDate;

            startOfThisPeriod = nextPeriod;
        }

        return _list;
    };

    this.InitializeTableDetail = function () {
        var table = $('#tableStatusBpe');
        var _format = function (d, index) {
            var data = JSON.parse($("#listData").val());

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

        $('#tableStatusBpe tbody tr').on('click', 'td:first', function (e) {
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
    this.FormatDate = function (startOfThisPeriod) {

        var dd = startOfThisPeriod.getDate();
        var mm = startOfThisPeriod.getMonth() + 1;
        var yyyy = startOfThisPeriod.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        } 

        return dd + '/' + mm + '/' + yyyy;
    };
};