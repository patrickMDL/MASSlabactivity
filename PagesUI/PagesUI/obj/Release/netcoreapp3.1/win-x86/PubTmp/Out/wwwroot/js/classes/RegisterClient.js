class RegisterClient {

    constructor(formId, tableId) {
        this.formId = formId;
        this.tableId = tableId;

        this.divIdCEP = 'divCep';
        this.labelIdCEP = 'Cep';

        this.labelId = 'DocumentId';
        this.divId = 'divDocumentId';

        this.register = new Register(this.formId, this.tableId);
    }

    init() {       

        $('#ActiveClient').change(function () {
            $('#ActiveClient').val(this.checked);
        });

        $('#DocumentId').change(function () {
            let document = $('#DocumentId').val();
            if (document != undefined && document.trim() != '') {
                validateDocument(document);
            }
                
        });

        this.register.init(this.register, 'Passageiro');
    }

    save() {
        this.register.save('/Register/SaveClient/', 'Passageiro', this.formId);
    }

    getList() {
        this.register.getList('/Register/GetListClients/', this.tableId);
    }

    clickClient(clientCod) {
        this.register.errorControler(this.divIdCEP, this.labelIdCEP, '');
        this.register.errorControler(this.divId, this.labelId, '');
        this.register.clickItem(this.formId, '/Register/GetClient/', { pClientCod: clientCod });
    }

    clickItem(formId, url, cod) {
        this.register.errorControler(this.divIdCEP, this.labelIdCEP, '');
        this.register.errorControler(this.divId, this.labelId, '');
        this.register.clickItem(formId, url, { pCod: cod });
    }

    clear() {
        this.register.clear();
    }

    validateDocument(pDocument) {
        let labelId = this.labelId;
        let divId = this.divId;

        let register = this.register;
        let formId = this.formId;

        $.get('/Common/ValidateDocument/', { pDocument: pDocument },
            function (data) {
                if (data.ok) {
                    register.errorControler(divId, labelId, '');
                    RegisterClient.clientExists(pDocument, formId);

                } else {
                    register.errorControler(divId, labelId, 'Documento Inválido');
                }
            });
    }

    getEndereco(pCep) {

        let divIdCEP = this.divIdCEP;
        let labelIdCEP = this.labelIdCEP;

        let register = this.register;

        if (pCep != undefined && pCep != '') {
            $.get('/Common/GetAddressByCep/', { pAddressCep: pCep },
                function (data) {

                    if (data.ok) {

                        if (data.cepListView != '') {
                            $('#divListCep').html(data.cepListView);
                            $('#modalCEP').modal('toggle');
                            RegisterClient.initDataTableCEP('tableListCEP', true);

                        } else {                            

                            register.errorControler(divIdCEP, labelIdCEP, '');

                            var item = JSON.parse(data.addressCep);         

                            $('#Estado').val(item[0]["NomeEstado"]);
                            $('#Cidade').val(item[0]["NomeCidade"]);
                            $('#Bairro').val(item[0]["NomeBairro"]);
                            $('#Endereco').val(item[0]["NomeEndereco"]);
                            $('#AddressCod').val(item[0]["CodEndereco"]);
                        }                        

                    } else {
                        register.errorControler(divIdCEP, labelIdCEP, 'CEP não encontrado');

                        $('#Estado').val('');
                        $('#Cidade').val('');
                        $('#Bairro').val('');
                        $('#Endereco').val('');
                        $('#AddressCod').val('');
                    }
                });
        }
    }

    closeFormCep() {
        $('#modalCEP').modal('toggle');
    }

    static initDataTableCEP(id, useSearch) {
        var table = $('#' + id);

        table.dataTable({
            "sDom": "<t><'row'<i>>",
            "scrollCollapse": true,
            "paging": false,
            "destroy": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Total de registros: _TOTAL_"
            }
        });

        if (useSearch) {
            $('#search-table-cep').keyup(function () {
                table.fnFilter($(this).val());
            });
        }

        $('#' + id + ' span').click(function () {            
            let tr = $($(this)).closest('tr');
            let row = $('#' + id).DataTable().row(tr);
            let data = row.data();

            $('#Estado').val(data[2]);
            $('#Cidade').val(data[3]);
            $('#Bairro').val(data[0]);
            $('#Endereco').val(data[4]);
            $('#AddressCod').val(data[5]);

            $('#modalCEP').modal('toggle');
        });
    }
        
    static loadForm(data, formId) {
        $($("#" + formId)[0].elements).each(function () {

            $(this).val(data[this.id]);

            switch (this.type) {
                case enumObjectType.checkbox:
                    var checked = (data[this.id] == 1 || data[this.id] == 'S');

                    if ($(this).parent().find(".switchery").length > 0 && $(this).prop('checked') !== checked) {
                        $(this).parent().find(".switchery").click();
                    }

                    $(this).val(checked);
                    $(this).prop('checked', checked).change();

                    break;
                case enumObjectType.select:
                    $(this).val(data[this.id]);
                    $(this).change();

                    break;
            }
        });
    }

    static clientExists(pDocumentId, formId) {
        clearFormAjax(formId);

        $.get('/Register/GetClientByDocumentId/', { pDocumentId: pDocumentId },
            function (data) {
                if (data.distributorExists) {

                    var options = new Object();

                    options.timeout = 4000;
                    options.position = "top-left";
                    options.style = "Bar";

                    options.message = "Passageiro já cadastrado.";
                    options.type = "info";

                    $('body').pgNotification(options).show();

                    RegisterClient.loadForm(JSON.parse(data.client), formId);

                } else if (data.clientExists) {

                    let item = JSON.parse(data.client);

                    RegisterClient.loadForm(item, formId);                    

                    $('#NamePassenger').val(item["NameClient"]);
                    $('#modalQuestion').modal('toggle');

                } else {
                    console.log('não existe nada');

                    $('#DocumentId').val(pDocumentId);
                    $('#ActiveClient').val(true);
                }

                if (pDocumentId.length > 11) {
                    $('#IEClient').attr('required', 'True');
                    $('#IMClient').attr('required', 'True');
                }
            });
    }    
}