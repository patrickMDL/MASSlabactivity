function AdministratorLines() {
	this.GetLines = function (pUrl) {
		$.ajax({
			type: "GET",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.Success) {
					InitializeTableWithExportOptions(data.Model);
					$("#grid-search-line").removeAttr("style");
				}
			}
		});
	},
	this.GetLineByUId = function (pUrl, pLineUId) {
		$.ajax({
			type: "GET",
			url: pUrl,
			data: {
				pLineUId: pLineUId
			},
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				Edit_Callback(data);
			}
		});
	}
}

var AdministratorLines = new AdministratorLines();