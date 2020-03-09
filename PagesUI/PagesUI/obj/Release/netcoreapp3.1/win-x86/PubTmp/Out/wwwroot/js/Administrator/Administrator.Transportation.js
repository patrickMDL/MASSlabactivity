function AdministratorTransportation() {
	this.GetTransportation = function (pUrl) {
		$.ajax({
			type: "GET",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.Success) {
					InitializeTableWithExportOptions(data.Model);
					$("#grid-search-transportation").removeAttr("style");
				}
			}
		});
	},
	this.GetTransportationById = function (pUrl, pTransportationId) {
		$.ajax({
			type: "GET",
			url: pUrl,
			data: {
				pTransportationId: pTransportationId
			},
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Edit_Callback(data);
			}
		});
	}
}

var AdministratorTransportation = new AdministratorTransportation();