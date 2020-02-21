function AdministratorCustom() {
        this.Active = function (pUrl, pId, pDescription) {
            $.ajax({
                type: "POST",
                url: pUrl,
                data: {
                    pId: pId
                },
                content: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    Active_Callback(data, pDescription);
                }
            });
        },
        this.Inactive = function (pUrl, pId, pDescription) {
            $.ajax({
                type: "POST",
                url: pUrl,
                data: {
                    pId: pId
                },
                content: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    Inactive_Callback(data, pDescription);
                }
            });
        },
        this.Do = function (pUrl, pId, pDescription) {
            Core.HideModalSlideRight();

            Pace.track(function () {
                $.ajax({
                    type: "POST",
                    url: pUrl,
                    data: {
                        pId: pId
                    },
                    content: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data.Success) {
                            Notifications.Bar(false, pDescription, false);
                            Get();
                        }
                        else {
                            Notifications.Bar(false, 'Ops! Algo deu errado, verifique a sua conexão com a internet e tente novamente.', true);
                        }
                    }
                });
            });
        },
        this.InitAddressesFromZipCode = function (data) {
            // Initialize a condensed table which will truncate the content
            // if they exceed the cell width

            var table = $("#AddressesFromZipCodeTable");

            var settings = {
                data: data,
                "autoWidth": false,
                "fixedColumns": true,
                "sDom": "<'table-responsive't><'row'<p i>>",
                "sPaginationType": "bootstrap",
                "destroy": true,
                "scrollCollapse": true,
                "oLanguage": {
                    "sLengthMenu": "_MENU_ ",
                    "sInfo": "Exibindo <b>_START_ to _END_</b> de _TOTAL_ registros",
                    "sInfoFiltered": "(Filtro realizado em <b>_MAX_</b> registros)",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sEmptyTable": "Nenhum registro encontrado"
                },
                "iDisplayLength": 5,
                "columns": [
                    { "width": "35%", "data": "Street" },
                    { "width": "25%", "data": "NeighborhoodName" },
                    {
                        "width": "25%", "sortable": false, "data": function (data) {
                            return data["CityName"] + " / " + data["StateInitials"];
                        }
                    },
                    {
                        "width": "15%", "sortable": false, "data": function (data) {
                            var Id = data["Id"];
                            var retorno = '<button class="btn btn-sm btn-rounded" OnClick="AdministratorCustom.SelectedAddress(' + Id + ', true);">Selecione</button>';
                            retorno += '<input type="hidden" value="' + data["Street"] + '" id="hidStreet' + Id + '" />';
                            retorno += '<input type="hidden" value="' + data["NeighborhoodName"] + '" id="hidNeighborhood' + Id + '" />';
                            retorno += '<input type="hidden" value="' + data["CityName"] + '" id="hidCity' + Id + '" />';
                            retorno += '<input type="hidden" value="' + data["StateInitials"] + '" id="hidState' + Id + '" />';
                            retorno += '<input type="hidden" value="' + data["CountryName"] + '" id="hidCountry' + Id + '" />';

                            return retorno;
                        }
                    },
                ],
                "order": [[0, "asc"]]
            };

            table.dataTable(settings);

            $("#search-table").keyup(function () {
                table.fnFilter($(this).val());
            });
        },
        this.SelectedAddress = function (AddressId) {
            var street = $("#hidStreet" + AddressId).val();
            var neighborhood = $("#hidNeighborhood" + AddressId).val();
            var city = $("#hidCity" + AddressId).val();
            var state = $("#hidState" + AddressId).val();
            var country = $("#hidCountry" + AddressId).val();

            var data = [{ Id: AddressId, CityName: city, StateInitials: state, CountryName: country, Street: street, NeighborhoodName: neighborhood }];

            this.SetUniqueAddress(data);
            Core.HideModal($('#_AddressesFromZipCode'));
        },
        this.SetUniqueAddress = function (data, showGrid) {
            $("#btnZipCodeSearch").removeClass("disabled");

            if (data.length === 0) {
                $("#divNoAddress").removeAttr("style");
            }
            else {
                if (data.length > 1) {
                    if (showGrid) {
                        AdministratorCustom.InitAddressesFromZipCode(data);
                        Core.ShowModal($('#_AddressesFromZipCode'));
                    }
                }
                else {
                    $("#divAddress").removeAttr("style");
                    var neighborhoodStreet = "";
                    if (data[0].street !== null)
                        neighborhoodStreet = data[0].Street;

                    if (data[0].NeighborhoodName !== null)
                        neighborhoodStreet += " - " + data[0].NeighborhoodName;

                    this.SetAddress(data[0].Id, data[0].CityName + " / " + data[0].StateInitials + " - " + data[0].CountryName, neighborhoodStreet);
                }
            }
        },
        this.SetAddress = function (pAddressId, pCity, pNeighborhoodStreet) {
            console.log(pAddressId);
            console.log(pCity);
            console.log(pNeighborhoodStreet);
            $("#spanCity").text(pCity);
            $("#spanNeighborhoodStreet").text(pNeighborhoodStreet);
            $("#AddressId").val(pAddressId);
            $("#AddressNumber").focus();
        }
}

var AdministratorCustom = new AdministratorCustom();