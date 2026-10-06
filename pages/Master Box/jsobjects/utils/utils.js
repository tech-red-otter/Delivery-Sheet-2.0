export default {
	creating_csv : false,
	update_products() {
		return update_form.formData.products
			.map(
			(product) =>
			`${
			inv_items2.data.find(
				(inv_item) =>
				inv_item.value?.toUpperCase() === product.name?.toUpperCase()
			).label
			} | ${
			(product.weight ?? 0) === 0
			? inv_items2.data.find(
				(inv_item) =>
				inv_item.value?.toUpperCase() === product.name?.toUpperCase()
			).weight
			: product.weight
			} KG | ${product.quantity} unit(s)`
		)
			.join("<br>");
	},

	update_form_total_weight() {
		return (
			Math.round(
				update_form.formData.products
				.map((product) => {
					return {
						name: product?.name,
						weight:
						parseFloat((product.weight ?? 0) === 0
											 ? inv_items2.data.find(
							(inv_item) =>
							inv_item.value?.toUpperCase() ===
							product.name?.toUpperCase()
						).weight : product.weight) * product.quantity,
					};
				})
				.reduce((sum, product) => parseFloat(product.weight) + sum, 0) * 1000
			) / 1000
		);
	},

	async create_download_csv() {
		this.creating_csv = true;
		
		// 1. Run the queries and capture their returned data locally
		// This breaks the reactive dependency loop on .data
		const masterBoxData = await all_master_box2.run();
		const invItemsData = await inv_items2.run();

		let box_data = [`Box Name, Products, Composite box`];

		// 2. Use the local variables instead of all_master_box2.data / inv_items2.data
		(masterBoxData ?? []).filter(item => (item.products ?? []).length > 0).forEach(master_box => {
			let productsStr = master_box.products.map(product => {
				product = JSON.parse(product);
				let invItem = (invItemsData ?? []).find(inv_item => inv_item.value?.toUpperCase() === product.name?.toUpperCase());
				return `${invItem?.label ?? product.name} - (${product.quantity})`;
			}).join(' | ');

			let compositeBoxStr = (master_box.curated_box_name ?? []).length > 0 ? 
				master_box.curated_box_name.map(name => {
					let invItem = (invItemsData ?? []).find(inv_item => inv_item.value?.toUpperCase() === name?.toUpperCase());
					return invItem?.label ?? name;
				}).join(' | ') : '';

			box_data.push(`${master_box.box_code}, ${productsStr}, ${compositeBoxStr}`);
		});
		
		await download(box_data.join('\n'), 'master_box.csv', 'text/csv');
		this.creating_csv = false;
		return box_data;
	},

	async remove_selected_row() { 
		data_table.setSelectedRowIndex(-1);
	}
};