function AdministratorEmployees() {
	this.GetEmployees = function (pUrl) {
		$.ajax({
			type: "GET",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.Success) {
					InitializeTableWithExportOptions(data.Model);
					$("#grid-search-employees").removeAttr("style");
				}
			}
		});
	},
	this.GetEmployeeById = function (pUrl, pEmployeeId) {
		$.ajax({
			type: "GET",
			url: pUrl,
			data: {
				pEmployeeId: pEmployeeId
			},
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Edit_Callback(data);
			}
		});
	},
    this.GetCompanyByNumberAndCompanyId = function (e, pUrl, pNumber, pNumberType) {
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
                    if (pNumberType === "2") {
                        Notifications.Bar(e, 'Ops! O CPF "' + pNumber + '" já está cadastrado para sua empresa.', false);
                    }
                    else {
                        Notifications.Bar(e, 'Ops! O número Estrangeiro "' + pNumber + '" já está cadastrado para sua empresa.', false);
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

var AdministratorEmployees = new AdministratorEmployees();