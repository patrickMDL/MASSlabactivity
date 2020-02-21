///retorna dados de status de relatórios gerados
var GetDataStorageAsyncForUser = function () {
    $.get('/Common/DataStorageAsyncForUser/',
        function (data) {
            if (data) {
                var lista = data;
                var listHtml = "";
                var modelo = "<div class='unread clearfix __zebrado'><div class='d24 circular b-white m-r-5 b-a b-white m-t-10 m-r-10' onclick='carregaTela(this)'><p class='text-complete bold'>_Nome - __Porcento %</p><p class='text-complete fs-12 m-l-10'>_IdRelatorio</p><p>_IdSub</p></div></div><div class='progress w-100'><span class='progress-bar progress-bar-success' style='width:_StatePorcent%'></span></div>";
                for (var indice = 0; indice < lista.length; indice++) {
                    var dataAsyncCorrente = lista[indice];
                    var _StatePorcent = (100 / 16) * dataAsyncCorrente.state;
                    var _StatePorcentEmissao = 0;
                    if (dataAsyncCorrente.state >= 10 && dataAsyncCorrente.state !== 11 && dataAsyncCorrente.state !== 14) {
                        _StatePorcentEmissao = (100 / 16) * 16;
                    }
                    else {
                        _StatePorcentEmissao = (100 / 16) * dataAsyncCorrente.state;
                    }

                    if (dataAsyncCorrente.url !== "")
                        listHtml += modelo.replace("_IdSub", dataAsyncCorrente.url).replace("_StatePorcent", _StatePorcent).replace("__zebrado", indice % 2 === 1 ? "bg-master-lighter" : "").replace("_Nome", dataAsyncCorrente.nome.split(".")[dataAsyncCorrente.nome.split(".").length - 1]).replace("_IdRelatorio", dataAsyncCorrente.idRelatorio).replace("_State", dataAsyncCorrente.state).replace("__Porcento", _StatePorcentEmissao);
                }
                $("#dataAsyncRetorno").html(listHtml);
            }            
        });
};
///Carrega tela jornada de trabalho motorista fazer switch case para os demais relatórios
var carregaTela = function carregaTela(objeto) {
    //objeto
    //switch (objeto.) {
    //    default:
    //}
    window.location.href = window.location.origin + objeto.lastElementChild.innerText + '?IdRelatorioCorrente=' + objeto.getElementsByTagName('p')[1].innerText;
};

///Indica no canto esquerdo quando existe uma listagem async
setInterval(function () {
    $.get('/Common/DataStorageAsyncForUser/',
        function (data) {
            if (data) {
                var $imput = document.getElementById('ReturnDataAsync');
                if (data.length > 0) {

                    if (!$('#' + $imput.firstElementChild.id).hasClass('bubble')) {
                        $('#' + $imput.firstElementChild.id).addClass('bubble');
                    }

                }
                else {
                    if ($('#' + $imput.firstElementChild.id).hasClass('bubble')) {
                        $('#' + $imput.firstElementChild.id).removeClass('bubble');
                    }
                }
            }
        });
}, 20000);
