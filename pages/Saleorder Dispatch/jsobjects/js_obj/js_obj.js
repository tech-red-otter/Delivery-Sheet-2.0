export default {
  postSelectedRows: async () => {
    const selectedRows = Table2.selectedRows;

    if (!selectedRows || selectedRows.length === 0) {
      showAlert("No rows selected", "warning");
      return;
    }
    try {
      for (const row of selectedRows) {
        await mark_deliverd.run({
          salesorder_number: row.salesorder_number,
          salesorder_id: row.salesorder_id
        });
      };
			await get_salesorders_ncr.run();
      showAlert("All selected rows posted successfully", "success");
    } catch (error) {
      showAlert("Error posting some rows", "error");
      console.log(error);
    }
  }
};
