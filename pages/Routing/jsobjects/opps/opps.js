export default {
	temp_vars: [],
	async temp_vars_reset() {
		await active_delivery_partners1.run()
		this.temp_vars = active_delivery_partners1.data.map(adp => { return { partner_name: adp.partner_name, number_of_riders: 0 } })
	},
	temp_vars_update() {
		this.temp_vars = Table1.tableData
	},
	async reset_inputs() {
		await curr_pos.setValue('')
		await update_position_step.setValue('')
		await update_pos.setValue('')
	},
	async refreshAllData () {
		await delivery_routes1.run()
		await data_ops.routes_data()
		let curr_selected = routes_table.selectedRowIndex
		await routes_table.setSelectedRowIndex(curr_selected)
		await data_ops.steps_list()
		await data_ops.get_route_map()
		
	},	
	async refresh_and_reset() {
		await this.refreshAllData()
		await this.reset_inputs()
	}
	
}