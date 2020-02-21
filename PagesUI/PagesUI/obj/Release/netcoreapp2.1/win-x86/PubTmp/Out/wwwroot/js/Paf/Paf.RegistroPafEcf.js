function RegistroPafEcf() {
    var _urlStorageBlob;

    this.SetUrlStorageBlob = function (pUrl) {
        _urlStorageBlob = pUrl;
    },

	this.SaveRegistroPafEcf = function (pUrl, pModel) {
		$.ajax({
			type: "POST",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			async: false,
			data: {
				pRegistroPafEcfMirrorModel: pModel
			},
			success: function (data) {
				if (data.Success) {
					Notifications.Bar(null, data.Message, false);
				}
				else {
					Notifications.Bar(null, data.Message, true);
				}
				Core.EnabledButton($("#btnSave"));
			}
		});
	},

	this.GetCompanyAgencyDetailByPrinterId = function (pUrl, pPrintId) {
		$.ajax({
			type: "GET",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			data: {
				pPrinterId: pPrintId
			},
			success: function (data) {
				if (data.Success) {
					$("#divCompanyDetail").css("display", "block");

					var numberCompany = data.CompanyModel.Number;
					if (data.CompanyModel.NumberType === 1) {
						numberCompany = Core.FormatCNPJ(data.CompanyModel.Number);
					}
					else if (data.CompanyModel.NumberType === 2) {
						numberCompany = Core.FormatCPF(data.CompanyModel.Number);
					}
					$("#spanCompanyName").html("<strong>" + data.CompanyModel.SocialName + "</strong> (" + numberCompany + ")");
					$("#spanCompanyAddress").text(data.CompanyModel.AddressStreet + ", " + data.CompanyModel.CompanyAddressNumber + (data.CompanyModel.CompanyAddressComplement !== null ? " - " + data.CompanyModel.CompanyAddressComplement : "") + " - " + data.CompanyModel.NeighborhoodName);
					$("#spanCompanyAddressCity").text(data.CompanyModel.CityName + "/" + data.CompanyModel.StateInitials);

					if (data.CompanyModel.Number === data.AgencyModel.Number) {
						$("#spanAgencyName").removeAttr("style");
						$("#spanAgencyAddress").removeAttr("style");
						$("#spanAgencyAddressCity").removeAttr("style");
						$("#iFaBus").removeAttr("style");

						var numberAgency = data.AgencyModel.Number;
						if (data.AgencyModel.NumberType === 1) {
							numberAgency = Core.FormatCNPJ(data.AgencyModel.Number);
						}
						else if (data.AgencyModel.NumberType === 2) {
							numberAgency = Core.FormatCPF(data.AgencyModel.Number);
						}
						$("#spanAgencyName").html("<strong>" + data.AgencyModel.Name + "</strong> (" + numberAgency + ")");
						$("#spanAgencyAddress").text(data.AgencyModel.AddressStreet + ", " + data.AgencyModel.AgencyAddressNumber + (data.AgencyModel.AgencyAddressComplement !== null ? " - " + data.AgencyModel.AgencyAddressComplement : "") + " - " + data.AgencyModel.NeighborhoodName);
						$("#spanAgencyAddressCity").text(data.AgencyModel.CityName + "/" + data.AgencyModel.StateInitials);
					}
					else {
						$("#spanAgencyName").attr("style", "display:none;");
						$("#spanAgencyAddress").attr("style", "display:none;");
						$("#spanAgencyAddressCity").attr("style", "display:none;");
						$("#iFaBus").attr("style", "display:none;");
					}
				}
				else {
					$("#divCompanyDetail").css("display", "none");
				}
			}
		});
	},

	this.GetListRegistroPafEcf = function (pUrl) {
		$.ajax({
			type: "POST",
			url: pUrl,
			content: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (data.Success) {
					RegistroPafEcf.InitializeTableWithExportOptions(data.Model);
					$("#grid-search").removeAttr("style");
				}
				else {
					Notifications.Bar(null, "Ops! Algo deu errado, verifique a sua conexão com a internet e tente novamente.", true);
				}
			}
		});
	},

	this.InitializeTableWithExportOptions = function (model) {
    	var table = $('#tableWithExportOptions');

    	var settings = {
    		data: model,
    		"autoWidth": false,
    		"fixedColumns": true,
    		"sDom": "<'exportOptions'T><'table-responsive't><'row'<p i>>",
    		"sPaginationType": "bootstrap",
    		"destroy": true,
    		"scrollCollapse": true,
    		"oLanguage": {
    			"sLengthMenu": "_MENU_ ",
    			"sInfo": "Exibindo <b>_START_ até _END_</b> de _TOTAL_ registros",
    			"sInfoEmpty": "Nenhum registro encontrado",
    			"sInfoFiltered": "(Filtro realizado em <b>_MAX_</b> registros)",
    			"sZeroRecords": "Nenhum registro encontrado",
    			"sEmptyTable": "Nenhum registro encontrado"
    		},
    		"iDisplayLength": 10,
    		"columns": [
                {
                	"width": "10%", "data": function (data) {
                		return moment(data["CreatedAt"]).format("L") + " " + moment(data["CreatedAt"]).format("LT");
                	}
                },
                { "width": "20%", "data": "CommandType" },
                { "width": "15%", "data": "CommandStatus" },
                { "width": "15%", "data": "Serial" },
                {
                	"width": "10%", "data": function (data) {
                		return data["GetDate"] != null ? moment(data["GetDate"]).format("L") + " " + moment(data["GetDate"]).format("LT") : "";
                	}
                },
                {
                	"width": "10%", "data": function (data) {
                		return data["ReturnDate"] != null ? moment(data["ReturnDate"]).format("L") + " " + moment(data["ReturnDate"]).format("LT") : "";
                	}
                },
                {
                	"width": "10%", "data": function (data) {
                		var icons = "";
                		icons = '<div class="btn-toolbar" role="toolbar"><div class="btn-group sm-m-t-10">';

                		icons += '<button id="btnDetail_' + data["Id"] + '" type="button" class="btn btn-default" data-type="info" data-toggle="tooltip" data-original-title="Clique para ver os detalhes"><i class="fa fa-bars"></i></button>';

                		if (data["StorageCloudFilePath"] != null)
                		    icons += '<button id="btnDownload_' + data["Id"] + '" type="button" class="btn btn-default" data-type="download" data-toggle="tooltip" data-original-title="Clique para baixar o arquivo"><i class="fa fa-cloud-download"></i></button>';

                		icons += '</div></div>';
                		return icons;
                	}
                },
    		],
    		"order": [[0, "desc"]],
    		"createdRow": function (row, data, dataIndex) {
    			$("#btnUser_" + data["Id"], row).tooltip({ html: true, container: 'body' });
    			$("#btnDetail_" + data["Id"], row).tooltip({ html: true, container: 'body' });

    			$('[data-type="info"]', row).click(function (event) {
    				RegistroPafEcf.GetDetailRegistroPafEcf(data["Id"]);
    			});

    			$('[data-type="download"]', row).click(function (event) {
    			    window.open(_urlStorageBlob + data["StorageCloudFilePath"], '_blank');
    			});
    		},

    		"aoColumnDefs": [{
    			"aTargets": [0, 1, 2, 3],
    			"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
    			}
    		}],
    		"oTableTools": {
    			"sSwfPath": "/lib/jquery-datatable/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
    			"aButtons": [{
    				"sExtends": "xls",
    				"sButtonText": "<i class='fa fa-file-excel-o'></i>",
    			}, {
    				"sExtends": "pdf",
    				"sButtonText": "<i class='fa fa-file-pdf-o'></i>",
    			}, {
    				"sExtends": "copy",
    				"sButtonText": "<i class='fa fa-copy'></i>",
    			}]
    		},
    		fnDrawCallback: function (oSettings) {
    			$('.export-options-container').append($('.exportOptions'));

    			$('#ToolTables_tableWithExportOptions_0').tooltip({
    				title: 'Exportar para Excel',
    				container: 'body'
    			});

    			$('#ToolTables_tableWithExportOptions_1').tooltip({
    				title: 'Exportar para PDF',
    				container: 'body'
    			});

    			$('#ToolTables_tableWithExportOptions_2').tooltip({
    				title: 'Copiar dados da tabela',
    				container: 'body'
    			});
    		}
    	};

    	table.dataTable(settings);

    	$("#search-tableexport").keyup(function () {
    		table.fnFilter($(this).val());
    	});
	},

	this.GetDetailRegistroPafEcf = function (pId) {
		$.ajax({
			type: "GET",
			url: "/Paf/GetDetailRegistroPafEcf",
			data: {
				pId: pId
			},
			success: function (result) {
				$("#_RegistroPafEcfDetail").html(result);
				Core.ShowModal($("#_RegistroPafEcfDetail"));
			},
			error: function (request, error) {
				Notifications.Bar(null, 'Ops! Algo deu errado, verifique a sua conexão com a internet e tente novamente.', true);
			}
		});
	}
};

var RegistroPafEcf = new RegistroPafEcf();