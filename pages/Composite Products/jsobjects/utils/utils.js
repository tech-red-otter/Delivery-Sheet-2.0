export default {
	update_products() {
		return update_form.formData.products
			.map(
			(product) =>
			`${
			inv_items.data.find(
				(inv_item) =>
				inv_item.value.toUpperCase() === product.name.toUpperCase()
			).label
			} | ${
			(product.weight ?? 0) === 0
			? inv_items.data.find(
				(inv_item) =>
				inv_item.value.toUpperCase() === product.name.toUpperCase()
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
						name: product.name,
						weight:
						parseFloat((product.weight ?? 0) === 0
											 ? inv_items.data.find(
							(inv_item) =>
							inv_item.value.toUpperCase() ===
							product.name.toUpperCase()
						).weight
											 : product.weight) * product.quantity,
					};
				})
				.reduce((sum, product) => parseFloat(product.weight) + sum, 0) * 1000
			) / 1000
		);
	},

	confrmation_message() {
		console.log("confrmation_message")
		try{
			let msg =`**<span style="color:#8e44ad;"> ${update_form.formData.name} </span>**<br><br><span style="color:#8e44ad;">Total Weight:</span><span style="color:#27ae60;">${utils.update_form_total_weight()} KG</span><span style="color:#8e44ad;"> | Active :</span><span style="color:#27ae60;">${!update_form.formData.archived}</span><br><br><span style="color:#8e44ad;">Products: </span>**<span style="color:#27ae60;"><br>${utils.update_products()}</span>**`
			console.log(msg)
			return msg
		}catch(error){
			return "Some data is wrong"
		}

	}
};
