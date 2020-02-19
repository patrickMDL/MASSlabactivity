var Core = new function () {
    this.DisabledButton = function (e) {
        e.removeClass("btn-animated");
        e.removeClass("from-left");
        e.removeClass("fa-save");
        e.addClass("disabled");
    };
    this.EnabledButton = function (e) {
        e.addClass("btn-animated");
        e.addClass("from-left");
        e.addClass("fa-save");
        e.removeClass("disabled");
    };
    this.DisabledButtonSearch = function (e) {
        e.removeClass("btn-animated");
        e.removeClass("from-left");
        e.removeClass("fa-search");
        e.addClass("disabled");
    };
    this.EnabledButtonSearch = function (e) {
        e.addClass("btn-animated");
        e.addClass("from-left");
        e.addClass("fa-search");
        e.removeClass("disabled");
    };
    this.DisabledAttribute = function (e) {
        e.attr("disabled", true);
    };
    this.EnabledAttribute = function (e) {
        e.attr("disabled", false);
    };
    this.FormatCNPJ = function (value) {
        return value ? value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5") : "";
    };
    this.FormatCPF = function (value) {
        return value ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4") : "";
    };
    this.FormatBluetooth = function (value) {
        return value.replace(/(^[a-zA-Z0-9]+$)(^[a-zA-Z0-9]+$)(^[a-zA-Z0-9]+$)(^[a-zA-Z0-9]+$)(^[a-zA-Z0-9]+$)(^[a-zA-Z0-9]+$)/, "$1:$2:$3:$4:$5:$6");
    };
    this.FormatOnlyNumber = function (value) {
        return value.replace(/(\.|\/|\-|\_)/g, "");
    };
    this.FormatPhone = function (value) {
        if (value === undefined)
            return "";

        if (value.length > 10) {
            return value.replace(/(\d\d)(\d\d\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
        }
        return value.replace(/(\d\d)(\d\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
    };
    this.FormatStringToFloat = function (pElement) {
        var sign = pElement.attr("data-a-sign"); // Example: R$, $
        var cost = pElement.val().replace(sign, "");

        if (cost.length > 0) {
            var sep = pElement.attr("data-a-sep");
            var dec = pElement.attr("data-a-dec"); // . ou , - separador de decimal

            if (dec === ".") {
                return cost.replace(/[^0-9\.]+/g, "").toString();
            }
            else {
                return cost.replace(/[^0-9\,]+/g, "").toString();
            }
        }
    };
    this.FormatFloatToString = function (pElement, pFloatValue) {
        var sign = pElement.attr("data-a-sign");

        if (pFloatValue > 0) {
            var sep = pElement.attr("data-a-sep");
            var dec = pElement.attr("data-a-dec");

            var stringValue = pFloatValue.toString();
            if (sep === ".") {
                stringValue = stringValue.replace(/[^0-9\.]+/g, "").replace(sep, dec);
            }
            else {
                stringValue = stringValue.replace(/[^0-9\,]+/g, "").replace(sep, dec);
            }

            return sign + stringValue;
        }

        return sign + "0";
    };
    this.FormatDate = function (pValue) {
        var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
        var dt = new Date(pValue.replace(pattern, '$3/$2/$1'));
        return moment(new Date(dt)).format("L");
    };
    this.FormatRound = function (pValue) {
        return Math.round(pValue);
    };
    this.FieldScroll = function (pElement) {
        $("html, body").animate({
            scrollTop: pElement.offset().top
        }, 1000);
    };
    this.ShowModal = function (pElement) {
        pElement.modal('toggle');
    };
    this.HideModal = function (pElement) {
        pElement.modal('hide');
    };
    this.ShowModalSlideRight = function (pTitle, pMessage, pCodeType, pCode, pDescription, pTextButtonConfirm, pTextButtonCancel) {

        if (pTextButtonConfirm === null || pTextButtonConfirm === undefined)
            pTextButtonConfirm = "Confirmar";

        if (pTextButtonCancel === null || pTextButtonCancel === undefined)
            pTextButtonCancel = "Cancelar";

        $("#_ModalSlideRight-Title").val(pTitle);
        $("#_ModalSlideRight-Code").val(pCode);
        $("#_ModalSlideRight-CodeType").val(pCodeType);
        $("#_ModalSlideRight-Description").val(pDescription);
        $("#_ModalSlideRight-Action-Label").html(pMessage);
        $("#_ModalSlideRight-Button-Confirm").text(pTextButtonConfirm);
        $("#_ModalSlideRight-Button-Cancel").text(pTextButtonCancel);
        this.ShowModal($("#_ModalSlideRight"));
    };
    this.HideModalSlideRight = function () {
        this.HideModal($("#_ModalSlideRight"));
    };
    this.InitializeCNPJ = function (pElement) {
        pElement.val().replace(/[^\d]+/g, "");

        var rule = {
            required: true,
            cnpj: true
        };

        pElement.rules("remove");
        pElement.rules("add", rule);
        pElement.mask("99.999.999/9999-99");
        $("#" + pElement.attr("id") + "-error").attr("style", "display:none;");
    };
    this.InitializeCPF = function (pElement) {
        pElement.val().replace(/[^\d]+/g, "");

        var rule = {
            required: true,
            cpf: true
        };

        pElement.rules("remove");
        pElement.rules("add", rule);
        pElement.mask("999.999.999-99");
        $("#" + pElement.attr("id") + "-error").attr("style", "display:none;");
    };
    this.InitializeNumber = function (pElement) {
        pElement.val().replace(/[^\d]+/g, "");

        pElement.unmask();
        pElement.rules("remove");
        pElement.rules("add", { required: true });
        $("#" + pElement.attr("id") + "-error").attr("style", "display:none;");
    };
    this.InitializePhone = function (pElement) {
        pElement.mask("(99) 99999-9999");

        //$('#Phone').keypress(function () {
        //	var phone, element;
        //	element = $(this);
        //	element.unmask();
        //	phone = element.val().replace(/\D/g, '');
        //	if (phone.length > 10) {
        //		element.mask("(99) 99999-999?9");
        //	} else {
        //		element.mask("(99) 9999-9999?9");
        //	}
        //});
    };
    this.InitializeBluetooth = function (pElement) {
        pElement.mask("**:**:**:**:**:**");
    };
    this.GetURLParameter = function (pParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === pParam) {
                return sParameterName[1];
            }
        }
    };
    this.InitializeDate = function (pElement) {
        pElement.datepicker({
            format: 'dd/mm/yyyy',
            language: "pt-BR"
        });
    };
    this.InitializeDateRange = function (pElement, hasTimePicker) {
        var timePicker = (hasTimePicker === null || hasTimePicker === undefined) ? true : hasTimePicker;
        pElement.daterangepicker({
            timePicker: timePicker,
            timePickerIncrement: 1,
            timePicker24Hour: true,
            format: 'DD/MM/YYYY H:mm',
            locale: {
                cancelLabel: "Cancelar",
                applyLabel: "Ok",
                fromLabel: "De",
                toLabel: "Até",
                daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
            }
        });
    };
};