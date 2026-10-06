export default {
	async reset_selected_row () {
		await data_table.setSelectedRowIndices([])
	}
}