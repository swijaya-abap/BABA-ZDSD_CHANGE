sap.ui.define([
		"do/late/change/ZF_DO_LATE_CHG/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("do.late.change.ZF_DO_LATE_CHG.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);