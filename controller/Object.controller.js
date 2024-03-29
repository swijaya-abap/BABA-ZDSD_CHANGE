/*global location*/
sap.ui.define([
	"do/late/change/ZF_DO_LATE_CHG/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"do/late/change/ZF_DO_LATE_CHG/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox"
], function (
	BaseController,
	JSONModel,
	History,
	formatter,
	Filter,
	FilterOperator,
	MessageBox
) {
	"use strict";

	return BaseController.extend("do.late.change.ZF_DO_LATE_CHG.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0
				});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			// iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			// this.setModel(oViewModel, "objectView");
			// this.getOwnerComponent().getModel().metadataLoaded().then(function () {
			// 		// Restore original busy indicator delay for the object view
			// 		oViewModel.setProperty("/delay", iOriginalBusyDelay);
			// 	}
			// );
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onSuggestStart: function (oEvent) {
			var sSelectedKey = this.getView().byId("branch").getText();
			var oRouteUser = new Filter("WERKS", FilterOperator.EQ, sSelectedKey);
			var aFilters = [oRouteUser];

			var oList = this.getView().byId("saleMan");
			var oBinding = oList.getBinding("suggestionItems");
			oBinding.filter(aFilters);
		},

		onSaleManSelected: function (oEvent) {
			var oSelectedObj = oEvent.getParameters().selectedItem.getBindingContext().getObject();
			this.getView().byId("saleMan").setValue(oSelectedObj.PARTNER);
			this.getView().byId("salemanname").setValue(oSelectedObj.NAME_LAST);
		},

		onHandleSaleManHelp: function (oEvent) {
			var sSelectedKey = this.getView().byId("branch").getText();
			var oRouteUser = new Filter("WERKS", FilterOperator.EQ, sSelectedKey);
			var aFilters = [oRouteUser];
			var oItemTemplate = new sap.m.StandardListItem({
				title: "{PARTNER}",
				description: "{NAME_LAST}"
			});

			if (!this._valueHelpDialogLp) {
				this._valueHelpDialogLp = sap.ui.xmlfragment(
					"do.late.change.ZF_DO_LATE_CHG.fragment.SalesMan",
					this
				);
				var oList = this._valueHelpDialogLp.getAggregation("_dialog").getAggregation("content")[1];
				oList.bindAggregation("items", {
					path: '/SALESREPSet',
					template: oItemTemplate,
					filters: aFilters
				});
				this.getView().addDependent(this._valueHelpDialogLp);
			}
			this._valueHelpDialogLp.open();
		},

		onVhSuggestStart: function (oEvent) {
			var sSelectedKey = this.getView().byId("branch").getText();
			var oRouteUser = new Filter("WERKS", FilterOperator.EQ, sSelectedKey);
			var aFilters = [oRouteUser];

			var oList = this.getView().byId("newvihicle");
			var oBinding = oList.getBinding("suggestionItems");
			oBinding.filter(aFilters);
		},

		onVehicleSelected: function (oEvent) {
			var oSelectedObj = oEvent.getParameters().selectedItem.getBindingContext().getObject();
			this.getView().byId("newvihicle").setValue(oSelectedObj.EQUNR);
		},

		onHandleVehicleHelp: function (oEvent) {
			var sSelectedKey = this.getView().byId("branch").getText();
			var oRouteUser = new Filter("WERKS", FilterOperator.EQ, sSelectedKey);
			var aFilters = [oRouteUser];
			var oItemTemplate = new sap.m.StandardListItem({
				title: "{EQUNR}",
				description: "{EQKTX}"
			});

			if (!this._valueHelpDialogLpH) {
				this._valueHelpDialogLpH = sap.ui.xmlfragment(
					"do.late.change.ZF_DO_LATE_CHG.fragment.Vehicle",
					this
				);
				var oList = this._valueHelpDialogLpH.getAggregation("_dialog").getAggregation("content")[1];
				oList.bindAggregation("items", {
					path: '/VEHICLESet',
					template: oItemTemplate,
					filters: aFilters
				});
				this.getView().addDependent(this._valueHelpDialogLpH);
			}
			this._valueHelpDialogLpH.open();
		},

		onDrSuggestStart: function (oEvent) {
			var sSelectedKey = this.getView().byId("branch").getText();
			var oRouteUser = new Filter("WERKS", FilterOperator.EQ, sSelectedKey);
			var aFilters = [oRouteUser];

			var oList = this.getView().byId("newdriver");
			var oBinding = oList.getBinding("suggestionItems");
			oBinding.filter(aFilters);
		},

		onDriverSelected: function (oEvent) {
			var oSelectedObj = oEvent.getParameters().selectedItem.getBindingContext().getObject();
			this.getView().byId("newdriver").setValue(oSelectedObj.PARTNER);
			this.getView().byId("driverName").setValue(oSelectedObj.NAME_LAST);
		},

		onHandleDriverHelp: function (oEvent) {
			var sSelectedKey = this.getView().byId("branch").getText();
			var oRouteUser = new Filter("WERKS", FilterOperator.EQ, sSelectedKey);
			var aFilters = [oRouteUser];
			var oItemTemplate = new sap.m.StandardListItem({
				title: "{PARTNER}",
				description: "{NAME_LAST}"
			});

			if (!this._valueHelpDialogDr) {
				this._valueHelpDialogDr = sap.ui.xmlfragment(
					"do.late.change.ZF_DO_LATE_CHG.fragment.Driver",
					this
				);
				var oList = this._valueHelpDialogDr.getAggregation("_dialog").getAggregation("content")[1];
				oList.bindAggregation("items", {
					path: '/DRIVERSet',
					template: oItemTemplate,
					filters: aFilters
				});
				this.getView().addDependent(this._valueHelpDialogDr);
			}
			this._valueHelpDialogDr.open();
		},

		onSalemanChange: function (oEvent) {
			var sDateInput = oEvent.getSource().getDateValue();
			var sValid = this._checkValidDate(sDateInput);
			if (sValid === true) {
				oEvent.getSource().setValueState("None");
			} else {
				oEvent.getSource().setValueState("Error");
				MessageBox.error("Valid Until date cannot be less than current date");
			}
		},

		onDriverChange: function (oEvent) {
			var sDateInput = oEvent.getSource().getDateValue();
			var sValid = this._checkValidDate(sDateInput);
			if (sValid === true) {
				oEvent.getSource().setValueState("None");
			} else {
				oEvent.getSource().setValueState("Error");
				MessageBox.error("Valid Until date cannot be less than current date");
			}
		},

		onVehicleChange: function (oEvent) {
			var sDateInput = oEvent.getSource().getDateValue();
			var sValid = this._checkValidDate(sDateInput);
			if (sValid === true) {
				oEvent.getSource().setValueState("None");
			} else {
				oEvent.getSource().setValueState("Error");
				MessageBox.error("Valid Until date cannot be less than current date");
			}
		},

		onSavePress: function (oEvent) {
			if (this.getView().byId("validuntil").getValueState() === "Error") {
				MessageBox.error("Please complete validation check");
				return;
			}

			if (this.getView().byId("validuntildriver").getValueState() === "Error") {
				MessageBox.error("Please complete validation check");
				return;
			}

			if (this.getView().byId("vehiclevaliduntil").getValueState() === "Error") {
				MessageBox.error("Please complete validation check");
				return;
			}

			// if(this.getView().byId("visitcat").getSelectedKey() ===''){
			// 	this.getView().byId("visitcat").setValueState("Error");
			// 	MessageBox.error("Visit Cat is blank, please check again");
			// 	return;
			// }else{
			// 	this.getView().byId("visitcat").setValueState("None");
			// }

			var globalData = this.getOwnerComponent().getModel("Detail");

			var oItem = [{
				'TOUR_ID': this.getView().byId("tourid").getText(),
				'VISIT_CAT': this.getView().byId("visitcat").getSelectedKey(),
				'VISIT_ID': this.getView().byId("visitid").getText(),
				'ROUTE_USER': this.getView().byId("routeuser").getText(),
				'BRANCH_CD': this.getView().byId("branch").getText(),
				'SALES_MAN': this.getView().byId("saleMan").getValue(),
				'SLSREP_ENDDT': this.getView().byId("validuntil").getValue(),
				'COMMTYPE1': this.getView().byId("commissionType").getSelectedKey(),
				'DRIVER': this.getView().byId("newdriver").getValue(),
				'DRIVER_ENDDT': this.getView().byId("validuntildriver").getValue(),
				'COMMTYPE2': this.getView().byId("commissiontypedriver").getSelectedKey(),
				'VEHICLE': this.getView().byId("newvihicle").getValue(),
				'VEHICLE_ENDDT': this.getView().byId("vehiclevaliduntil").getValue(),
				'ACT_SLSMAN': this.byId("or_sales_man").getText(),
				'ACT_ASSTNC': this.byId("or_driver").getText(),
				'ACT_TRUCK': this.byId("or_vehicle").getText(),
				'VISIT_DATE': globalData.VISIT_DATE,
				'VPTYP': this.getView().getBindingContext().getObject().VPTYP,
				'DATA_STAT': this.getView().getBindingContext().getObject().DATA_STAT,
				'MESSAGE': this.getView().getBindingContext().getObject().MESSAGE
			}];
			var oHeader = {
				'TOUR_ID': this.getView().byId("tourid").getText(),
				'VISIT_ID': this.getView().byId("visitid").getText(),
				'ROUTE_USER': this.getView().byId("routeuser").getText(),
				'MESSAGE': '',
				'HEADITEMNAV': oItem
			};

			var that = this;

			var sPath = "/CHECKSet(ROUTE_USER='" + oItem[0].ROUTE_USER +
				"',BRANCH_CD='" + oItem[0].BRANCH_CD +
				"',VISIT_DATE='" + oItem[0].VISIT_DATE +
				"',SLSREP_ENDDT='" + oItem[0].SLSREP_ENDDT +
				"',DRIVER_ENDDT='" + oItem[0].DRIVER_ENDDT +
				"',VEHICLE_ENDDT='" + oItem[0].VEHICLE_ENDDT + "')";

			this.showBusy();
			this.getModel().read(sPath, {
				success: function (oReturn) {
					this.hideBusy();
					if (oReturn.MESSAGE !== "") {
						MessageBox.show(
							"More than 1 visit lists will be updated. Do you want to continue?", {
								icon: MessageBox.Icon.WARNING,
								title: "Confirmation",
								actions: [MessageBox.Action.YES, MessageBox.Action.NO],
								onClose: function (oAction) {
									if (oAction === "YES") {
										that._saveData(oHeader);
									}
								}.bind(this)
							}
						);
					} else {
						this._saveData(oHeader);
					}
				}.bind(this),
				error: function (oError) {
					this.hideBusy();
				}.bind(this)
			});

		},

		onDetailPress: function (oEvent) {

			var sPath = "/DETAILSet(VISIT_ID='" + this.getView().byId("visitid").getText() +
				"',ROUTE_USER='" + this.getView().byId("routeuser").getText() +
				"',SALES_MAN='" + this.getView().byId("saleMan").getValue() +
				"',SLSREP_ENDDT='" + this.getView().byId("validuntil").getValue() +
				"',DRIVER='" + this.getView().byId("validuntil").getValue() +
				"',DRIVER_ENDDT='" + this.getView().byId("validuntildriver").getValue() +
				"',VEHICLE='" + this.getView().byId("newvihicle").getValue() +
				"',VEHICLE_ENDDT='" + this.getView().byId("vehiclevaliduntil").getValue() + "')";

			// var data = {
			// 	pages: [{
			// 		pageId: "additionalDetailsId",
			// 		header: "Additional Details",
			// 		title: "",
			// 		titleUrl: "",
			// 		icon: "",
			// 		description: "",
			// 		groups: [{
			// 			heading: "CURRENT SALESMAN",
			// 			elements: [{
			// 				label: "Salesman ID",
			// 				value: "TEST 123",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}, {
			// 				label: "Salesman Name",
			// 				value: "TEST 123",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}, {
			// 				label: "Valid Unit",
			// 				value: "01/12/2019",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}]
			// 		}, {
			// 			heading: "CURRENT DRIVER",
			// 			elements: [{
			// 				label: "Driver ID",
			// 				value: "TEST 123",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}, {
			// 				label: "Driver Name",
			// 				value: "TEST 123",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}, {
			// 				label: "Valid Unit",
			// 				value: "01/12/2019",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}]
			// 		}, {
			// 			heading: "CURRENT VEHICLE",
			// 			elements: [{
			// 				label: "Vehicle ID",
			// 				value: "TEST 123",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}, {
			// 				label: "Valid Unit",
			// 				value: "01/12/2019",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}]
			// 		}, {
			// 			heading: "Additional Details",
			// 			elements: [{
			// 				label: "Source",
			// 				value: "Visit List (or ZDSDT_NEW_SLSREP)",
			// 				elementType: sap.m.QuickViewGroupElementType.text
			// 			}]
			// 		}]
			// 	}]
			// };
			// oModel.setData(data);
			
			var oButton = oEvent.getSource();

			this.showBusy();
			// this._openQuickView(oEvent, oModel);
			// this.hideBusy();

			this.getModel().read(sPath, {
				success: function (oReturn) {

					var data = {
						pages: [{
							pageId: "additionalDetailsId",
							header: "Additional Details",
							title: "",
							titleUrl: "",
							icon: "",
							description: "",
							groups: [{
								heading: "CURRENT SALESMAN",
								elements: [{
									label: "Salesman ID",
									value: oReturn.SALES_MAN,
									elementType: sap.m.QuickViewGroupElementType.text
								}, {
									label: "Salesman Name",
									value: oReturn.SALES_NM,
									elementType: sap.m.QuickViewGroupElementType.text
								}, {
									label: "Valid Unit",
									value: oReturn.SLSREP_ENDDT,
									elementType: sap.m.QuickViewGroupElementType.text
								}]
							}, {
								heading: "CURRENT DRIVER",
								elements: [{
									label: "Driver ID",
									value: oReturn.DRIVER,
									elementType: sap.m.QuickViewGroupElementType.text
								}, {
									label: "Driver Name",
									value: oReturn.DRIVER_NM,
									elementType: sap.m.QuickViewGroupElementType.text
								}, {
									label: "Valid Unit",
									value: oReturn.DRIVER_ENDDT,
									elementType: sap.m.QuickViewGroupElementType.text
								}]
							}, {
								heading: "CURRENT VEHICLE",
								elements: [{
									label: "Vehicle ID",
									value:  oReturn.VEHICLE,
									elementType: sap.m.QuickViewGroupElementType.text
								}, {
									label: "Valid Unit",
									value:  oReturn.VEHICLE_ENDDT,
									elementType: sap.m.QuickViewGroupElementType.text
								}]
							}, {
								heading: "Additional Details",
								elements: [{
									label: "Source",
									value: oReturn.SOURCE,
									elementType: sap.m.QuickViewGroupElementType.text
								}]
							}]
						}]
					};

					var oModel = new JSONModel();
					oModel.setData(data);

					this._openQuickView(oButton, oModel);

					this.hideBusy();
				}.bind(this),
				error: function (oError) {
					this.hideBusy();
				}.bind(this)
			});

		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function (oEvent) {
			this.getView().getModel().refresh(true);
			var sVisitCat = oEvent.getParameter("arguments").visit_cat;
			var sVisitDate = oEvent.getParameter("arguments").visitdate;
			var sRouteUser = oEvent.getParameter("arguments").routeuser;
			var sBranchCd = oEvent.getParameter("arguments").branch_cd;
			var sSalesMan = oEvent.getParameter("arguments").sales_man;
			this.getModel().metadataLoaded().then(function () {
				var sObjectPath = this.getModel().createKey("VISITLISTSet", {
					VISIT_CAT: sVisitCat,
					VISIT_DATE: sVisitDate,
					ROUTE_USER: sRouteUser,
					BRANCH_CD: sBranchCd,
					SALES_MAN: sSalesMan
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
			if (sVisitCat === "Y1") {
				var vehicleEditable = false;
			} else {
				vehicleEditable = true;
			}
			this.byId("newvihicle").setEditable(vehicleEditable);
			this.byId("vehiclevaliduntil").setEditable(vehicleEditable);

			// var oModel = new JSONModel();
			// oModel.setData({
			// 	vehicleEditable: vehicleEditable
			// });
			// this.getView().setModel(oModel, "modelData");
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function (sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_saveData: function (oHeader) {
			var sPath = '/HEADERSet';
			var that = this;
			this.showBusy();
			this.getModel().create(sPath, oHeader, {
				success: function (oReturn) {
					// MessageBox.information("Data update successully");
					MessageBox.show(
						"Data update successully", {
							icon: MessageBox.Icon.INFORMATION,
							title: "",
							actions: [MessageBox.Action.OK],
							onClose: function (oAction) {
								that._navBack();
							}
						}
					);
					this.getOwnerComponent()._actionSuccess = true;
					this.hideBusy();
				}.bind(this),
				error: function (oError) {
					this.hideBusy();
				}.bind(this)
			});
		},

		_createPopover: function () {
			if (!this._oQuickView) {
				this._oQuickView = sap.ui.xmlfragment("do.late.change.ZF_DO_LATE_CHG.fragment.AdditionalDetails", this);
				this._oQuickView.setPlacement(sap.m.PlacementType.Top);
			}

			this.getView().addDependent(this._oQuickView);
		},

		_openQuickView: function (oEvent, oModel) {
			this._createPopover();

			// this._oQuickView.close();
			this._oQuickView.setModel(oModel);

			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var oButton = oEvent;
			jQuery.sap.delayedCall(0, this, function () {
				this._oQuickView.openBy(oButton);
			});
		},

		_onBindingChange: function () {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

		},

		_navBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Worklist", true);
			}
		},

		_handleValueHelpSalesmanClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameters().selectedItem.getBindingContext().getObject();
			if (oSelectedItem) {
				this.getView().byId("saleMan").setValue(oSelectedItem.PARTNER);
				this.getView().byId("salemanname").setValue(oSelectedItem.NAME_LAST);
			}
		},

		_handleValueHelpVehicleClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameters().selectedItem.getBindingContext().getObject();
			if (oSelectedItem) {
				this.getView().byId("newvihicle").setValue(oSelectedItem.EQUNR);
			}
		},

		_handleValueHelpDriverClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameters().selectedItem.getBindingContext().getObject();
			if (oSelectedItem) {
				this.getView().byId("newdriver").setValue(oSelectedItem.PARTNER);
				this.getView().byId("driverName").setValue(oSelectedItem.NAME_LAST);
			}
		},

		_checkValidDate: function (sCompDate) {
			var sCurrentDate = new Date();
			sCurrentDate.setHours(0, 0, 0, 0);
			if (sCompDate < sCurrentDate) {
				return false;
			} else {
				return true;
			}
		}

	});

});