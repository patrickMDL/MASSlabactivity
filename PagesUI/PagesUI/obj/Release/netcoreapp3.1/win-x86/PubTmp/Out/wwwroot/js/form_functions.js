defineAvatar();
var enumObjectType = Object.freeze({ "hidden": "hidden", "text": "text", "number": "number", "select": "select-one", "textarea": "textarea", "checkbox": "checkbox", "submit": "submit" });

function clearForm() {
    window.location = window.location.pathname;

    return false;
}

function verifySession(data) {
    if (data.length !== undefined) {
        window.location = "/Account/Logout";

        return false;
    }
}

function initProgressCircle() {
    $('.btn-active-circle').click(function () {
        $('#progress-circle').append('<div class="progress-circle-indeterminate" id="progressbar"></div>');
    });

    $(document).on({
        ajaxStop: function () {
            $('#progressbar').remove();
        }
    });
}

function initDataTableReportsLinks(pId, pUseSearch, pOrientation) {
    $('#tableExpected').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'columnsToggle'
        ]
    });
}

function initGetIdentityName(UserIdentityName) {
    $('#UserIdentityName').html(UserIdentityName);
}

function initDataTable(id, useSearch) {
    var table = $('#' + id);

    table.dataTable({
        "sDom": "<t><'row'<p i>>",
        "scrollCollapse": true,
        "paging": true,
        "destroy": true,
        "oLanguage": {
            "sLengthMenu": "_MENU_ ",
            "sInfo": "Mostrando de <b>_START_ até _END_</b> de _TOTAL_ registros",
            "sInfoFiltered": "(filtro do total de _MAX_ registros)",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            "sZeroRecords": "Não há registros a serem exibidos"
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            if (aData[3] === "Sem cartão" || aData[3] === "<p>Sem cartão</p>") {

                $(nRow).find('td[id=PassengerTypeName]').css('color', '#f90c00');
            }
        },
        "iDisplayLength": 10
    });

    if (useSearch) {
        $('#search-table').keyup(function () {
            table.fnFilter($(this).val());
        });
    }
}

function initDataTableConfiguration(id, useSearch) {
    var table = $('#' + id);

    table.dataTable({
        "sDom": "<t><'row'<p i>>",
        "scrollCollapse": true,
        "paging": false,
        "destroy": true,
        "oLanguage": {
            "sLengthMenu": "_MENU_ ",
            "sInfo": "Mostrando de <b>_START_ até _END_</b> de _TOTAL_ registros",
            "sInfoFiltered": "(filtro do total de _MAX_ registros)",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            "sZeroRecords": "Não há registros a serem exibidos"
        },
        "iDisplayLength": 2,
        "scrollY": "200px",
        "scrollX": true
    });

    if (useSearch) {
        $('#search-table').keyup(function () {
            table.fnFilter($(this).val());
        });
    }
}


function initDataTableModel(id, paging) {
    var table = $('#' + id);

    table.dataTable({
        "sDom": "<t><'row'<p i>>",
        "scrollCollapse": true,
        "paging": paging,
        "destroy": true,
        "oLanguage": {
            "sLengthMenu": "_MENU_ ",
            "sInfo": "Mostrando de <b>_START_ até _END_</b> de _TOTAL_ registros",
            "sInfoFiltered": "(filtro do total de _MAX_ registros)",
            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            "sZeroRecords": "Não há registros a serem exibidos"
        },
        "iDisplayLength": 5
    });

    $('#search-table-model').keyup(function () {
        table.fnFilter($(this).val());
    });
}

function configInputTable(id) {
    $('#' + id + ' tbody').on('change', 'input', function () {
        readInput($(this));
    });
}

function configDetailedTable(id) {
    $('#' + id + ' tbody').on('click', 'tr', function () {

        if ($(this).hasClass('shown') && $(this).next().hasClass('row-details')) {
            $(this).removeClass('shown');
            $(this).next().remove();
            return;
        }

        var tr = $(this).closest('tr');
        var row = $('#' + id).DataTable().row(tr);

        $(this).parents('tbody').find('.row-details').remove();

        var retorno = _format(row.data(), this._DT_RowIndex, id);

        if (retorno != undefined && retorno != '') {
            row.child(_format(row.data(), this._DT_RowIndex, id)).show();
            tr.addClass('shown');
            tr.next().addClass('row-details');
            $.Pages.initSwitcheryPlugin();
        }        
    });
}

function configTableDetail1(idTable, idTableDetail) {
    $('#' + idTable + ' tbody').on('click', 'tr', function () {
        var tr = $(this).closest('tr');
        var row = $('#' + idTable).DataTable().row(tr);

        if (tr[0].id == 'trDetail1') {

            if ($(this).hasClass('shown shownd1') && $(this).next().hasClass('row-details row-detailsd1')) {
                $(this).removeClass('shown shownd1');
                $(this).next().remove();
            } else {
                $(this).parents('tbody').find('.shown.shownd1').removeClass('shown shownd1');
                $(this).parents('tbody').find('.row-details.row-detailsd1').remove();

                $(this).parents('tbody').find('.shown.shownd2').removeClass('shown shownd2');
                $(this).parents('tbody').find('.row-details.row-detailsd2').remove();

                let partialView = _format(row.data(), this._DT_RowIndex, idTable);

                if (partialView != '' && partialView != undefined) {
                    row.child(partialView).show();
                }
                tr.addClass('shown shownd1');
                tr.next().addClass('row-details row-detailsd1');

                configTableDetail2(idTableDetail);
                $('#' + idTableDetail).dataTable({ searching: false, paging: false, info: false, bSort: false });

                if (idTableDetail === "tableFeaturesDetail")
                    $.Pages.initSwitcheryPlugin();
            }
        }
    });    
}

function configTableDetail2(idTableDetail) {
    if (idTableDetail == '')
        return;

    $('#' + idTableDetail + ' tbody').on('click', 'tr', function () {
        var trD = $(this).closest('tr');
        var rowD = $('#' + idTableDetail).DataTable().row(trD);  

        if (trD[0].id == 'trDetail2') {   
            if ($(this).hasClass('shown shownd2') && $(this).next().hasClass('row-details row-detailsd2')) {
                $(this).removeClass('shown shownd2');
                $(this).next().remove();
                return;
            }                          

            $(this).parents('tbody').find('.shown.shownd2').removeClass('shown shownd2');
            $(this).parents('tbody').find('.row-details.row-detailsd2').remove();

            let partialView = _format(rowD.data(), this._DT_RowIndex, idTableDetail);
            
            if (partialView != '' && partialView != undefined) {
                rowD.child(partialView).show();
            }            

            trD.addClass('shown shownd2');
            trD.next().addClass('row-details row-detailsd2');
        }

    });
}

function clickItemGrid(formId, item) {
    var nameProperty;
    var checked;
    var value;

    $($("#" + formId)[0].elements).each(function () {
        if (this.id)
            nameProperty = this.id[0].toLowerCase() + this.id.substring(1, this.id.length);

        switch (this.type) {
            case enumObjectType.hidden:
            case enumObjectType.text:
            case enumObjectType.textarea:
            case enumObjectType.number:
                $(this).val(item[nameProperty]);
                break;
            case enumObjectType.select:
                value = item[nameProperty];
                if (typeof (value) == "string")
                    value = value.trim();

                $(this).val(value).change();
                break;
            case enumObjectType.checkbox:
                checked = (item[nameProperty] == 1 || item[nameProperty] == 'S');

                if ($(this).parent().find(".switchery").length > 0 && $(this).prop('checked') != checked) {
                    $(this).parent().find(".switchery").click();
                }

                $(this).prop('checked', checked).change();

                break;
        }
    });

    $("#" + formId).validate().resetForm();
    $(".form-group-default").removeClass("has-error");
}

function getTypeHourSunday(dayWeekHourType) {
    if (dayWeekHourType.substring(0, 1).toUpperCase() == "X")
        return true;

    return false;
}

function getTypeHourMonday(dayWeekHourType) {
    if (dayWeekHourType.substring(1, 2).toUpperCase() == "X")
        return true;

    return false;
}

function getTypeHourTueday(dayWeekHourType) {
    if (dayWeekHourType.substring(2, 3).toUpperCase() == "X")
        return true;

    return false;
}

function getTypeHourWednesday(dayWeekHourType) {
    if (dayWeekHourType.substring(3, 4).toUpperCase() == "X")
        return true;

    return false;
}

function getTypeHourThursday(dayWeekHourType) {
    if (dayWeekHourType.substring(4, 5).toUpperCase() == "X")
        return true;

    return false;
}

function getTypeHourFriday(dayWeekHourType) {
    if (dayWeekHourType.substring(5, 6).toUpperCase() == "X")
        return true;

    return false;
}

function getTypeHourSaturday(dayWeekHourType) {
    if (dayWeekHourType.substring(6, 7).toUpperCase() == "X")
        return true;

    return false;
}

function getTypeHourHoliday(dayWeekHourType) {
    if (dayWeekHourType.substring(7, 8).toUpperCase() == "X")
        return true;

    return false;
}

function configFormValidate(id) {
    $('#' + id).validate({
        errorPlacement: function (error, element) {
            var parent = $(element).closest('.form-group');
            if (parent.hasClass('form-group-default')) {
                parent.addClass('has-error');
                error.insertAfter(parent);
            } else {
                error.insertAfter(element);
            }
        }
    });
}

function configTableValidate(id) {
    var table = $('#' + id);
    var validate = false;

    table.find('tr').each(function (indiceLign) {
        $(this).find('td').find('input').each(function (indice) {
            
            switch ($(this)[0].id) {
                case 'listTicketBlockViewModel_' + (indiceLign - 1) + '__TicketBlockSerie':
                    if ($(this)[0].value === '') {
                        $(this).parent().addClass('has-error');
                        validate = true;
                    }else
                        $(this).parent().attr('class','');

                    break;
                case 'listTicketBlockViewModel_' + (indiceLign - 1) + '__TicketBlockRangeStartAt':
                    if ($(this)[0].value === '') {
                        $(this).parent().addClass('has-error');
                        validate = true;
                    }else
                        $(this).parent().attr('class','');

                    break;
                case 'listTicketBlockViewModel_' + (indiceLign - 1) + '__TicketBlockRangeEndAt':
                    if ($(this)[0].value === '') {
                        $(this).parent().addClass('has-error');
                        validate = true;
                    }else
                        $(this).parent().attr('class','');

                    break;
            }
        });

        $(this).find('td').find('span').each(function (indice) {

            switch ($(this)[0].id) {
                case 'select2-listTicketBlockViewModel_' + (indiceLign - 1) + '__ProjectTypeId-container':
                    if ($(this)[0].title === 'Selecione o projeto') {
                        $(this).parents('td').addClass('has-error');
                        validate = true;
                    }else
                        $(this).parents('td').attr('class', '');

                    break;
                case 'select2-listTicketBlockViewModel_' + (indiceLign - 1) + '__TicketBlockInputId-container':
                    if ($(this)[0].title === 'Selecione o serial') {
                        $(this).parents('td').addClass('has-error');
                        validate = true;
                    }else
                        $(this).parents('td').attr('class', '');

                    break;
            }

        });        
    });

    return validate;
}

function printPartial(pidPrint, ptitle) {

    $.get("../css/style.css", function (cssContent) {

        var partialPrint = document.getElementById(pidPrint).innerHTML;
        var windowPrint = window.open();
        var html = '<html><head><title></title>';
        html += '<style>' + cssContent + '</style>';
        html += '</head><body><h4>' + ptitle + '</h4>' + partialPrint + '</body></html>';

        windowPrint.document.write(html);
        windowPrint.document.close();
        windowPrint.close();
        windowPrint.print();
    });
}

//Formata data
Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

function formatDate(d) {
    var data = new Date(d),
        dia = data.getDate().padLeft(),
        mes = (data.getMonth() + 1).padLeft(),
        ano = data.getFullYear().padLeft()
    return [dia, mes, ano].join('/');
}

function formatDateTime(d) {
    var data = new Date(d),
        dia = data.getDate().padLeft(),
        mes = (data.getMonth() + 1).padLeft(),
        ano = data.getFullYear().padLeft(),
        hora = data.getHours().padLeft(),
        minutos = data.getMinutes().padLeft(),
        segundos = data.getSeconds().padLeft();
    return [dia, mes, ano].join('/') + ' ' + [hora, minutos, segundos].join(':');
}

/**
 * /
 * @param {any} d : Valor
 * @param {any} currencyDisplay : se mostra ou não o cifrão
 */
function formatCurrency(value, currencyDisplay) {
    var valueCurrency = value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    if (!currencyDisplay)
        valueCurrency = valueCurrency.replace('R$', '').trim();

    return valueCurrency;
}

function saveRegister(url, entitieName, formId) {

    clearValidationRegister(formId);

    var form = $('#' + formId);
    var options = new Object();

    options.timeout = 4000;
    options.position = "top-left";
    options.style = "Bar";

    $.post(url, form.serialize(),
        function (data) {
            verifySession(data);

            if (data.ok) {
                $('html, body').scrollTop(0);
                clear();
                options.message = "Registro salvo com sucesso.";
                options.type = "success";
                getList();
            }
            else {

                options.message = "Ocorreu um erro ao salvar o registro.";
                options.type = "error";
                
                if (data.error !== undefined && data.error.trim() !== '') {
                    options.message = "Ocorreu um erro ao salvar o registro: <br> " + data.error;
                }

                if (data.messageError !== undefined && data.messageError.trim() !== '') {
                    options.message = "Ocorreu um erro ao salvar o registro: <br> " + data.messageError;
                }
                
                if (data.field !== undefined && data.field.trim() !== '') {                    
                    let divId = 'div' + data.field;
                    let labelId = data.field;
                    errorControler(divId, labelId, data.messageLabel !== undefined ? data.messageLabel : data.messageError);
                }
            }

            $('body').pgNotification(options).show();
        });

}

function clearValidationRegister(formId) {

    for (let i = 0; i < $("#" + formId)[0].elements.length; i++) {
        var element = $("#" + formId)[0].elements[i];

        var parent = $('#' + element.id).closest('.form-group');
        if (parent.hasClass('has-error')) {

            parent.removeClass('has-error');

            if (parent.hasClass('focused')) {
                parent.removeClass('focused');
            }

            $('#' + element.id + '-error').remove();
        }

        if ($('#' + element.id).hasClass("error")) {
            $('#' + element.id).removeClass("error");
        }
    }
}

function errorControler(pDivId, pLabelId, pError) {

    if (pError != '') {
        if (!$('#' + pDivId).hasClass('has-error')) {
            $('#' + pDivId).addClass('has-error');
            $('#' + pDivId).after(`<label id='error-${pLabelId}' class='error'>${pError}</label>`)
        }
    } else {
        $('#' + pDivId).removeClass('has-error');
        $('#error-' + pLabelId).remove();
    }    
}

function clearFormAjax(formId) {
    clearValidationRegister(formId);

    $($("#" + formId)[0].elements).each(function () {
        $(this).val("");
        switch (this.type) {
            case enumObjectType.text:
                if ($(this).hasClass("isEditableWhenItIsNew")) {
                    var attr = $(this).attr('readonly');

                    if (typeof attr !== typeof undefined && attr !== false) {
                        $(this).removeAttr('readonly');
                    }
                }                
                break;
            case enumObjectType.select:
                $(this).change();
                break;
            case enumObjectType.checkbox:
                checke = true;

                if ($(this)[0].id === 'InsertNewDistrict')
                    checke = false;

                $(this).prop('checked', checke).change();

                
                if (!$(this)[0].parentNode.className.includes('checkbox') && checke) {
                    $(this)[0].nextElementSibling.style.cssText = 'background-color: rgb(109, 192, 249); border-color: rgb(109, 192, 249); box-shadow: rgb(109, 192, 249) 0px 0px 0px 11px inset; transition: border 0.4s ease 0s, box-shadow 0.4s ease 0s, background-color 1.2s ease 0s';
                    $(this)[0].nextElementSibling.lastChild.style.cssText = 'left: 13px; background-color: rgb(255, 255, 255); transition: left 0.2s ease 0s';    
                }
                break;
            case enumObjectType.number:
                $(this).val(0);
                break;
        }
    });
}

function startModalAjax() {
    $(document).ajaxStart(function (param) {
        $("#modalAjax").modal();
    });

    $(document).ajaxStop(function () {
        $("#modalAjax").modal('hide');
    });
}

function initDataTableDetailWithAllCheckBox(pId) {
    var table = $('#' + pId);
    table.dataTable({
        "autoWidth": false,
        "sDom": "<'form-group 'f><t><'row'>",
        "scrollCollapse": true,
        "paging": false,
        "destroy": true,
        "columnDefs": [
            { "orderable": false, "targets": 7 }
        ],
        "oLanguage": {
            "sSearchPlaceholder": "Pesquisar",
            "sSearch": ""
        },
        fnInitComplete: function () {
            $('.buttons-html5').removeClass("dt-button");
        }
    });

    table.find('tr').each(function (indice) {
        $(this).find('th').each(function (indice) {
            var idImputTd = $(this).parent().find('input[type=checkbox]').attr('id');

            $('#' + idImputTd).val(false);
            $('#' + idImputTd).parent().find(".switchery").click();
            $('#' + idImputTd).prop('checked', false).change();
        });
        $(this).find('td').each(function (indice) {
            var idImputTd = $(this).parent().find('input[type=checkbox]').attr('id');

            $('#' + idImputTd).val(false);
            $('#' + idImputTd).parent().find(".switchery").click();
            $('#' + idImputTd).prop('checked', false).change();
        });
    });

    $('#checkAll').on('click', function () {
        var checkHeadId = $(this).closest('table').find('thead :checkbox').attr('id');
        var checkNewVal = $('#' + checkHeadId).val() === 'false' ? true : false;

        if ($('#' + checkHeadId).val() === 'false' && $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox]').length !== $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox][value=false]').length) {
            checkBodyLine(checkNewVal);           
        }
        else if ($('#' + checkHeadId).val() === 'true' && $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox]').length === $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox][value=true]').length) {
            checkBodyLine(checkNewVal); 
        }

        $('#' + checkHeadId).val(checkNewVal);

        if ($('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox]').length === $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox][value=false]').length) {
            checkBodyLine(checkNewVal); 
        }

        $("#button-cancela").prop('disabled', $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox][value=true]').length > 0 ? false : true);
    });   
   
    $('#lineBody tr:has(td)').children('#CheckLine').on('click', function () {
        var checkBodyId = $(this).find('input[type=checkbox]').attr('id');
        var checkHeadId = $(this).closest('table').find('thead :checkbox').attr('id');
        var checkNewVal = $('#' + checkBodyId).val() === 'false' ? true : false;
        var checkHeadVal = $('#' + checkHeadId).val();

        $('#' + checkBodyId).val(checkNewVal);

        if (checkHeadVal === 'true' && checkNewVal === false) {
            checkHeadLine(checkNewVal);
        }

        if ($('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox]').length === $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox][value=true]').length) {            
            if (checkHeadVal === 'false') {
                checkHeadLine(checkNewVal);
            }
        }

        $("#button-cancela").prop('disabled', $('#lineBody tr:has(td)').children('#CheckLine').find('input[type=checkbox][value=true]').length > 0 ? false : true);
    });

    function checkHeadLine(checkNewVal) {
        table.find('tr').each(function (indice) {
            $(this).find('td').each(function (indice) {
                var checkHeadId = $(this).closest('table').find('thead :checkbox').attr('id');

                if ($('#' + checkHeadId).parent().find(".switchery").length > 0 && $('#' + checkHeadId).prop('checked') !== checkNewVal) {
                    $('#' + checkHeadId).parent().find(".switchery").click();
                }

                $('#' + checkHeadId).val(checkNewVal);
                $('#' + checkHeadId).prop('checked', checkNewVal).change();
            });
        });
    }
    function checkBodyLine(checkNewVal) {
        table.find('tr').each(function (indice) {
            $(this).find('td').each(function (indice) {
                var checkBodyId = $(this).find('input[type=checkbox]').attr('id');

                if ($('#' + checkBodyId).parent().find(".switchery").length > 0 && $('#' + checkBodyId).prop('checked') !== checkNewVal) {
                    $('#' + checkBodyId).parent().find(".switchery").click();
                }

                $('#' + checkBodyId).val(checkNewVal);
                $('#' + checkBodyId).prop('checked', checkNewVal).change();
            });
        });
    }
}

function Confirm(title, msg, $true, $false) {     
        var $content = "<div class='dialog-ovelay'>" +
                "<div class='dialog'><header>" +
                " <h3> " + title + " </h3> " +
                "<i class='fa fa-close'></i>" +
                "</header>" +
                "<div class='dialog-msg'>" +
                " <p> " + msg + " </p> " +
                "</div>" +
                "<footer>" +
                "<div class='controls'>" +
                " <button class='button button-danger doAction'>" + $true + "</button> " +
                " <button class='button button-default cancelAction'>" + $false + "</button> " +
                "</div>" +
                "</footer>" +
                "</div>" +
                "</div>";
            $('body').prepend($content);
            $('.doAction').click(function () {                
                $(this).parents('.dialog-ovelay').fadeOut(500, function () {
                    $(this).remove();
                });
                confirmAction();
            });
            $('.cancelAction, .fa-close').click(function () {
                $(this).parents('.dialog-ovelay').fadeOut(500, function () {
                    $(this).remove();
                });
            });

}

function defineAvatar() {
    $.ajax({
        url: '/Common/DefineUrlAvatar/',
        type: 'get',
        data: { pUrl: window.location.href},
        success: function (data) {
            if (data.ok) {
                var newChild = $("<img src='" + data.url + "' width='32' height='32'>");
                $("#imgAvatar").append( newChild );
            }
        },
        error: function (f1, f2, f3) {
        }
    });
}

function CheckDisabled(id, checked) {
    var _id = '#' + id;

    if (checked) {
        $(_id)[0].nextElementSibling.style.cssText = 'background-color: rgb(109, 192, 249); border-color: rgb(109, 192, 249); box-shadow: rgb(109, 192, 249) 0px 0px 0px 11px inset; transition: border 0.4s ease 0s, box-shadow 0.4s ease 0s, background-color 1.2s ease 0s; opacity: 0.5';
        $(_id)[0].nextElementSibling.lastChild.style.cssText = 'left: 13px; background-color: rgb(255, 255, 255); transition: left 0.2s ease 0s';  
    }
    else {        
        $(_id)[0].nextElementSibling.style.cssText = 'box-shadow: rgb(223, 223, 223) 0px 0px 0px 0px inset; border-color: rgb(223, 223, 223); background-color: rgb(255, 255, 255); transition: border 0.4s ease 0s, box-shadow 0.4s ease 0s; opacity: 0.5';
        $(_id)[0].nextElementSibling.lastChild.style.cssText = 'left: 0px; background-color: rgb(255, 255, 255); transition: left 0.2s ease 0s';
    }
}

// Remove espaço no início da string
function configTableRemoveEmptySpace(id) {
    $('#' + id).find('tr').each(function (indice) {
        $(this).find('td').each(function (indice) {
            if ($(this)[0].children[0].className.includes("remove-empty")) {
                var $imput = document.getElementById($(this)[0].children[0].id);

                $imput.addEventListener('paste', function (event) {
                    setTimeout(function () {
                        this.value = this.value.replace(/\s+/g, '');
                    }.bind(this), 0);
                });

                $imput.addEventListener('keypress', function (event) {
                    setTimeout(function () {
                        this.value = this.value.replace(/\s+/g, '');
                    }.bind(this), 0);
                });
            }            
        });
    });
}

// Remove "ponto" e "asterisco" no início da string
function configFormRemoveEmptySpace(id) {
    $('#' + id + ' input').each(function () {
        if ($(this)[0].className.includes("remove-empty")) {
            var $imput = document.getElementById($(this)[0].id);

            $imput.addEventListener('paste', function (event) {
                setTimeout(function () {
                    this.value = this.value.trimStart().toUpperCase().replace(/^\.+|^\*+/, '');
                }.bind(this), 0);
            });

            $imput.addEventListener('keypress', function (event) {
                setTimeout(function () {
                    this.value = this.value.trimStart().toUpperCase().replace(/^\.+|^\*+/, '');
                }.bind(this), 0);
            });
        }
    });
}

// Remove "ponto" e "asterisco" da string
function configFormRemoveAllEmptySpace(id) {
    $('#' + id + ' input').each(function () {
        if ($(this)[0].className.includes("remove-empty")) {
            var $imput = document.getElementById($(this)[0].id);

            $imput.addEventListener('paste', function (event) {
                setTimeout(function () {
                    this.value = this.value.trimStart().toUpperCase().replace(/^\.+|^\*+/, '');
                }.bind(this), 0);
            });

            $imput.addEventListener('keypress', function (event) {
                setTimeout(function () {
                    this.value = this.value.trimStart().toUpperCase().replace(/\.+|\*+|\/+|\,+|\;+|\:+|\\+|\"+|\'+/g, '');
                }.bind(this), 0);
            });
        }
    });
}

function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0   
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}