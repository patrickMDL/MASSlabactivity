class Register {
    constructor(formId, tableId) {
        this.formId = formId;
        this.tableId = tableId;
    }    

    init(objectName, entityName) {
        
        configFormValidate(this.formId);

        $(document).ajaxStart(function (param) {
            $("#modalAjax").modal();
        });

        $(document).ajaxStop(function () {
            $("#modalAjax").modal('hide');
        });

        $('#' + this.formId).submit(function (event) {
            objectName.clearValidation();

            if (!$("#" + this.id).valid())
                return;

            event.preventDefault();

            save();
        });
        
        getList();
    }

    getList(url, tableId) {
        $("#divPartialView").empty();
        $.get(url,
            function (data) {                

                $("#divPartialView").html(data.partialView);
                
                initDataTable(tableId, true);
            });
    }

    clickItem(formId, url, params) {
        this.clearValidation();
        $.get(url, params,
            function (data) {
                verifySession(data);

                if (data.ok) {
                    var item = JSON.parse(data.viewModel);

                    $($("#" + formId)[0].elements).each(function () {
                        $(this).val(item[this.id]);
                        switch (this.type) {
                            case enumObjectType.checkbox:                                
                                var checked = (item[this.id] == 1 || item[this.id] == 'S');

                                if ($(this).parent().find(".switchery").length > 0 && $(this).prop('checked') !== checked) {
                                    $(this).parent().find(".switchery").click();
                                }

                                $(this).val(checked);
                                $(this).prop('checked', checked).change();

                                break;
                            case enumObjectType.select:
                                $(this).val(item[this.id]);
                                $(this).change();

                                break;
                        }
                    });
                    $('.money').mask("#.##0,00", { reverse: true, maxlength: false });
                }

                $('html, body').scrollTop(0);
            });
    }

    clear() {
        clearFormAjax(this.formId);
    }

    save(url, entityName, formId) {        
        saveRegister(url, entityName, formId);
    }

    clearValidation() {
        clearValidationRegister(this.formId);
    }

    errorControler(pDivId, pLabelId, pError) {
        errorControler(pDivId, pLabelId, pError);
    }
}
