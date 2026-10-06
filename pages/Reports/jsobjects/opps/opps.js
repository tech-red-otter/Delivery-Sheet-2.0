export default {
	all_report: [
		{name: "Sales Order Data", code :"SALES_ORDER_DATA"},
		{name: "Delivery Box Content Print", code :"DELIVERY_BOX_CONTENT_PRINT"},
		{name: "Composite Box Content Print", code :"COMPOSITE_BOX_PRINT"},
		{name: "Total Boxes", code :"TOTAL_BOXES"},
		{name: "Sales order Print", code :"SALES_ORDER_PRINT"},
		{name: "Pickup Orders", code :"PICKUP_ORDERS"},
		{name: "Labels", code :"LABELS"},
		{name: "Merge Orders", code :"MERGE_ORDERS"},
		{name: "Dispatch", code :"DISPATCH"},
		{name: "To Pack", code :"TO_PACK"},
		{name: "To Order", code :"TO_ORDER"},
		{name: "SZCUS Data", code :"SZCUS"},
		{name: "ZBOX Data", code :"SZCUS_2"},
		{name: "Future Data", code: "FUTURE_BOX_COUNT"}
		//{name: "Dispatch slip", code: "DISPATCH_SLIP"}
	],
	report_data_type:{
		"SALES_ORDER_DATA": "PDF",
		"DELIVERY_BOX_CONTENT_PRINT" : "PDF",
		"COMPOSITE_BOX_PRINT" : "PDF",
		"TOTAL_BOXES": "PDF",
		"SALES_ORDER_PRINT": "PDF",
		"PICKUP_ORDERS": "PDF",
		"LABELS": "PDF",
		"MERGE_ORDERS": "PDF",
		"DISPATCH": "EXCEL", 
		"TO_PACK": "EXCEL",
		"TO_ORDER": "EXCEL", 
		"SZCUS": "EXCEL",
		"SZCUS_2": "EXCEL", 
		"FUTURE_BOX_COUNT": "PDF",
		"DISPATCH_SLIP": "PDF"
	},
	loading: true,
	creating:true,
	async generate_report () {
		switch(this.report_data_type[report_type.selectedOptionValue]) {
			case 'PDF':
				this.loading = true
				await get_report.run();
				this.loading = false
				break;
			case 'EXCEL':
				this.creating = true
				await get_report.run();
				this.creating = false	
				return 
		}
	},

}