function AdministratorSections() {
    this.GetSections = function (pUrl) {
        $.ajax({
            type: "GET",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    InitializeTableWithExportOptions(data.Model);
                    $("#grid-search-section").removeAttr("style");
                }
            }
        });
    },
	this.GetSectionByUId = function (pUrl, pSectionUId) {
	    $.ajax({
	        type: "GET",
	        url: pUrl,
	        data: {
	            pSectionUId: pSectionUId
	        },
	        content: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (data) {
	            Edit_Callback(data);
	        }
	    });
	},
    this.GetRotesByLineId = function (pUrl, pLineId) {
        $.ajax({
            type: "GET",
            url: pUrl,
            data: {
                pLineId: pLineId
            },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                
            }
        });
    }
}

var AdministratorSections = new AdministratorSections();