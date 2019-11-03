/*global location history */
sap.ui.define([
	"do/late/change/ZF_DO_LATE_CHG/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"do/late/change/ZF_DO_LATE_CHG/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, History, formatter, Filter, FilterOperator, MessageBox) {
	"use strict";

	return BaseController.extend("do.late.change.ZF_DO_LATE_CHG.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			// var oViewModel,
			// 	iOriginalBusyDelay;
			var oViewModel = new JSONModel();
			this.setModel(oViewModel, "worklistView");
			this.getOwnerComponent().getModel().setSizeLimit('9999');

			this.getRouter().getRoute("worklist").attachPatternMatched(this._onBackMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */

		onBranchSelectionChange: function(oEvent) {
			var sSelectedKey = oEvent.getSource().getSelectedKey();
			var oRouteUser = new Filter("WERKS", FilterOperator.EQ, sSelectedKey);
			var aFilters = [oRouteUser];

			// Filter for Sales Rep.
			var oSalesRepList = this.getView().byId("sale");
			var oSaleBinding = oSalesRepList.getBinding("items");
			oSaleBinding.filter(aFilters);

			// Filter for Route
			var oList = this.getView().byId("routeUser");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters);
		},

		onSearch: function(oEvent) {
			this._queryData();
		},

		onToDetail: function(oEvent) {
			this._showObject(oEvent.getSource());
			this.getOwnerComponent()._selectedPath = oEvent.getSource().getBindingContext("worklistView").getPath();
			this.getOwnerComponent()._selectedItem = oEvent.getSource();
		},
		// /* =========================================================== */
		// /* internal methods                                            */
		// /* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function(oItem) {
			var sDetail = {
				"VISIT_DATE": oItem.getBindingContext("worklistView").getProperty("VISIT_DATE")
			};
			this.getOwnerComponent().setModel(sDetail, "Detail");
			this.getRouter().navTo("object", {
				visit_cat: oItem.getBindingContext("worklistView").getProperty("VISIT_CAT"),
				visitdate: oItem.getBindingContext("worklistView").getProperty("VISIT_DATE"),
				routeuser: oItem.getBindingContext("worklistView").getProperty("ROUTE_USER"),
				branch_cd: oItem.getBindingContext("worklistView").getProperty("BRANCH_CD"),
				sales_man: oItem.getBindingContext("worklistView").getProperty("SALES_MAN")
			});
		},

		_onBackMatched: function(oEvent) {
			// var aList = this.getView().byId("table").getItems();
			// var sDelPath = this.getOwnerComponent()._selectedPath;
			if (this.getOwnerComponent()._actionSuccess) {
				if (this.getOwnerComponent()._actionSuccess === true) {
					var sIndex = this.getView().byId("table").indexOfItem(this.getOwnerComponent()._selectedItem);
					var sData = this.getView().getModel("worklistView").getProperty("/visitList");
					sData.splice(sIndex, 1);
					this.getView().getModel("worklistView").setProperty("/visitList", sData);
					this.getOwnerComponent()._actionSuccess = false;
				}
			}

		},

		_queryData: function() {
			// Check Branch Is Empty.
			if (this.getView().byId("branchCD").getSelectedKey() === '') {
				MessageBox.error('Please enter Branch CD value');
				this.getView().byId("branchCD").setValueState("Error");
				return;
			} else {
				this.getView().byId("branchCD").setValueState("None");
			}

			// Check Execution Data is empty
			if (this.getView().byId("excuteDate").getDateValue() === null) {
				MessageBox.error('Please enter Excution Date');
				this.getView().byId("excuteDate").setValueState("Error");
				return;
			} else {
				this.getView().byId("excuteDate").setValueState("None");
			}
			
			if (this.getView().byId("visitcat").getValue() === '') {
				MessageBox.error('Please enter Visit Cat');
				this.getView().byId("visitcat").setValueState("Error");
				return;
			} else {
				this.getView().byId("visitcat").setValueState("None");
			}

			// var sVisitDate = this.getView().byId("excuteDate").getDateValue();
			// if (sVisitDate === null) {
			// 	sVisitDate = '';
			// } else {
			// 	var sYear = sVisitDate.getFullYear();
			// 	var sMonth = sVisitDate.getMonth() + 1;
			// 	sMonth = sMonth.toString();
			// 	if (sMonth.length === 1) {
			// 		sMonth = '0' + sMonth;
			// 	}
			// 	var sDate = sVisitDate.getDate();
			// 	sDate = sDate.toString();
			// 	if(sDate.length === 1){
			// 		sDate = '0' + sDate;
			// 	}
			// 	sVisitDate = sYear.toString() + sMonth.toString() + sDate.toString();
			// }

			var sFrom = this.getView().byId("excuteDate").getFrom();
			var sFromDate;
			if (sFrom === null) {
				sFromDate = '';
			} else {
				var sFromYear = sFrom.getFullYear();

				var sFromMonth = sFrom.getMonth() + 1;
				sFromMonth = sFromMonth.toString();
				if (sFromMonth.length === 1) {
					sFromMonth = '0' + sFromMonth;
				}

				var sFromDay = sFrom.getDate();
				sFromDay = sFromDay.toString();
				if (sFromDay.length === 1) {
					sFromDay = '0' + sFromDay;
				}
				sFromDate = sFromYear.toString() + sFromMonth.toString() + sFromDay.toString();

			}

			var sTo = this.getView().byId("excuteDate").getTo();
			var sToDate;
			if (sTo === null) {
				sToDate = '';
			} else {
				var sToYear = sTo.getFullYear();

				var sToMonth = sTo.getMonth() + 1;
				sToMonth = sToMonth.toString();
				if (sToMonth.length === 1) {
					sToMonth = '0' + sToMonth;
				}

				var sToDate = sTo.getDate();
				sToDate = sToDate.toString();
				if (sToDate.length === 1) {
					sToDate = '0' + sToDate;
				}
				sToDate = sToYear.toString() + sToMonth.toString() + sToDate.toString();

			}

			var oVisitDate = new Filter("VISIT_DATE", FilterOperator.BT, sFromDate, sToDate);

			var sRouteUser = this.getView().byId("routeUser").getSelectedKey();
			var oRouteUser = new Filter("ROUTE_USER", FilterOperator.EQ, sRouteUser);

			var sBranchCD = this.getView().byId("branchCD").getSelectedKey();
			var oBranchCD = new Filter("BRANCH_CD", FilterOperator.EQ, sBranchCD);

			var sSaleMan = this.getView().byId("sale").getSelectedKey();
			var oSaleMan = new Filter("SALES_MAN", FilterOperator.EQ, sSaleMan);
			
			var sVisitCat = this.getView().byId("visitcat").getSelectedKey();
			var oVisitCat = new Filter("VISIT_CAT", FilterOperator.EQ, sVisitCat);

			var aFilters = [oVisitDate, oRouteUser, oBranchCD, oSaleMan, oVisitCat];
			var sPath = "/VISITLISTSet";
			this.showBusy();
			this.getModel().read(sPath, {
				filters: aFilters,
				success: function(oData) {
					this.getModel('worklistView').setProperty("/visitList", oData.results);
					this.hideBusy();
				}.bind(this),
				error: function(oError) {
					// MessageBox.error("No Data Found");
					this.hideBusy();
				}.bind(this)
			});
		}

	});
});