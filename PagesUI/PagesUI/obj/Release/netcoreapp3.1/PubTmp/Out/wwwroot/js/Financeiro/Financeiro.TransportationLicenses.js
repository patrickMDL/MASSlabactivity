function FinanceiroTransportationLicenses() {

    console.log("Chegou no Controller");
    this.GetMobileTransportationLicenses = function (pUrl) {
        console.log("Chegou no GetMobileTransportationLicenses");
        $.ajax({
            type: "GET",
            url: pUrl,
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Success) {
                    InitializeCompanyDevicesTable(data.Model);
                    $("#grid-search-companies").removeAttr("style");
                }
            }
        });
    }
}

var FinanceiroTransportationLicenses = new FinanceiroTransportationLicenses();