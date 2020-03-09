function AdministratorLocations() {
    this.GetLocations = function (pUrl) {
        $.ajax({
            type: "GET",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    InitializeTableWithExportOptions(data.Model);
                    $("#grid-search-location").removeAttr("style");
                }
            }
        });
    },
        this.GetLocationById = function (pUrl, pLocationId) {
            $.ajax({
                type: "GET",
                url: pUrl,
                data: {
                    pLocationId: pLocationId
                },
                content: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    Edit_Callback(data);
                }
            });
        }
}

var AdministratorLocations = new AdministratorLocations();