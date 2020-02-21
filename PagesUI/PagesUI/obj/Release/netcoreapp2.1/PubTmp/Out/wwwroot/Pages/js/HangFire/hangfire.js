var Hangfire = new function () {
    this.ExportacaoMovimentoFiscalBGMPraxio = function (pCompany) {
        
        $.ajax({
            url: '/HangFireJobs/ExportacaoMovimentoFiscalBGMPraxio/',
            type: 'post',
            data: { pCompany: pCompany },
            content: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

            }
        });
    };
};
