function AdministratorAgencies() {
	this.GetAgencies = function (pUrl) {
		$.ajax({
			type: "GET",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.Success) {
					InitializeTableWithExportOptions(data.Model);
					$("#grid-search-agencies").removeAttr("style");
				}
			}
		});
	},
	this.GetAgenciesDetailByCompanyId = function (pUrl, pCompanyId) {
		$.ajax({
			type: "GET",
			url: pUrl,
			data: {
				pCompanyId: pCompanyId
			},
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				InitializeAgenciesDetailByCompanyId(data);
			}
		});
	},
	this.GetAgencyById = function (pUrl, pAgencyId) {
		$.ajax({
			type: "GET",
			url: pUrl,
			data: {
				pAgencyId: pAgencyId
			},
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Edit_Callback(data);
			}
		});
	}
}

var AdministratorAgencies = new AdministratorAgencies();