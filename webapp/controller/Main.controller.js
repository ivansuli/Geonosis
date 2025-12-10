sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Filter, FilterOperator, Fragment) {
    "use strict";

    return Controller.extend("geonosis.table.report.controller.Main", {

        onInit: function () {
            
        },

	
        onSearch: function (oEvent) {
            this._applyTableFilters();
        },
        
        /**
         * Recopila los valores de los filtros del modelo 'filters' 
         * y los aplica al binding de la tabla.
         */
        _applyTableFilters: function () {
            let aFilters = [];
            // Obtener el modelo de filtros
            let oFilterModel = this.getView().getModel("filters");
            let oFilterData = oFilterModel.getData();

            // Función auxiliar para agregar un filtro si el valor existe
            let fnAddFilter = function (sProperty, sValue) {
                if (sValue) {
                    // Se usa FilterOperator.Contains para una búsqueda flexible,
                    // puedes cambiarlo a FilterOperator.EQ (Equal) si necesitas coincidencia exacta
                    aFilters.push(new Filter(sProperty, FilterOperator.Contains, sValue));
                }
            };

            // 1. Filtrar por Estado (asumiendo que la propiedad en el modelo de datos se llama 'estado')
            fnAddFilter("estado", oFilterData.Estado);

            // 2. Filtrar por Producto (asumiendo que la propiedad en el modelo de datos se llama 'nombre')
            fnAddFilter("nombre", oFilterData.Producto);

            // 3. Filtrar por Categoría (asumiendo que la propiedad en el modelo de datos se llama 'categoria')
            fnAddFilter("categoria", oFilterData.Categoria);

            // Obtener la referencia a la tabla
            let oTable = this.byId("tblProducts");
            // Obtener el binding de items
            let oBinding = oTable.getBinding("items");

            // Aplicar todos los filtros al binding
            oBinding.filter(aFilters);
        },

		onValueHelpRequest: function () {
            let oView = this.getView();
            if (!this._oView) {
                Fragment.load({
                    id: oView.getId(),
                    name: "geonosis.table.report.view.fragment.ValueHelpProducts",
                    controller: this
                }).then(function (oDialog) {
                    this._oView = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));

            } else {
                this._oView.open();
            }
        },

        onBeforeRendering: function(){
            console.log("Ocurrio un problema");
        },



    });
});