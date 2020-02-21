

function AdministratorCompanies() {
	this.GetCompanies = function (pUrl) {
		$.ajax({
			type: "GET",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.Success) {
					InitializeTableWithExportOptions(data.Model);
					$("#grid-search-companies").removeAttr("style");
				}
			}
		});
	},
	this.GetCompanyById = function (pUrl, pCompanyId) {
		$.ajax({
			type: "GET",
			url: pUrl,
			data: {
				pCompanyId: pCompanyId
			},
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Edit_Callback(data);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			    data.Success = false;
			    Edit_Callback(data);
			}
		});
	},
    this.GetCompanyByNumber = function (e, pUrl, pNumber, pNumberType) {
        $.ajax({
            type: "GET",
            url: pUrl,
            data: {
                pNumber: pNumber
            },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success === false) {
                    if (pNumberType === "1") {
                        Notifications.Bar(e, 'Ops! O CNPJ "' + pNumber + '" já está cadastrado.', false);
                    }
                    if (pNumberType === "2") {
                        Notifications.Bar(e, 'Ops! O CPF "' + pNumber + '" já está cadastrado.', false);
                    }
                    else {
                        Notifications.Bar(e, 'Ops! O número Estrangeiro "' + pNumber + '" já está cadastrado.', false);
                    }
                    
                    e.val("");
                    e.focus();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Notifications.Bar($("#btnSave"), 'Ops! Algo deu errado, verifique o "E-mail" informado ou a sua conexão com a internet e tente novamente.', true);
            }
        });
    }
}
var AdministratorCompanies = new AdministratorCompanies();