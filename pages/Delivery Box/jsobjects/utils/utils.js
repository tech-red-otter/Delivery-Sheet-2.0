export default {
  update_products() {
    return update_form.formData.products
      .map(
        (product) =>
          `${
            inv_items1.data.find(
              (inv_item) =>
                inv_item.value.toUpperCase() === product.name.toUpperCase()
            ).label
          } | ${
            (product.weight ?? 0) === 0
              ? inv_items1.data.find(
                  (inv_item) =>
                    inv_item.value.toUpperCase() === product.name.toUpperCase()
                ).weight ?? 0
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
                  ? inv_items1.data.find(
                      (inv_item) =>
                        inv_item.value.toUpperCase() ===
                        product.name.toUpperCase()
                    ).weight ?? 0
                  : product.weight) * product.quantity,
            };
          })
          .reduce((sum, product) => parseFloat(product.weight) + sum, 0) * 1000
      ) / 1000
    );
  },
	
	packaging_details() {
		update_form.formData.packaging_details.weight = this.update_form_total_weight()
		return JSON.stringify(update_form.formData.packaging_details)
	}
};
