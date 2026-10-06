export default {
	async routes_data() {
		let data = delivery_routes1?.data[0]?.response?.routes
		if (!data) return []
		return data.map((route, index) => {
			return {
				index: index + 1,
				vehicle: route.vehicle,
				description: route.description,
				weight: ((route.delivery[1] ?? 0) / 1000),
				duration: (route.duration / 60).toFixed(2),
				deliveries: !route.steps?.length ? 0 : route.steps.length - 2,
				box_count: route.delivery[0] ?? 0,
				created: route.created ?? false,
				modified: route.modified ?? false,
				driverName: route.driverName ?? '',
				driverPhone: route.driverPhone ?? '',
				raw: route
			}
		})
	},
	get_route_map() {
		const data = routes_table.selectedRow?.raw?.steps
		if(!data) return '<div>SELECT ANY ROUTE</div>>'
		const apiKey = "AIzaSyCItmmdYQcFZfJ79B0A7BhqCrdiYLXJ-vI";
		const origin = `${data[0].location[1]},${data[0].location[0]}`;
		const destination = `${data[data.length - 1].location[1]},${data[data.length - 1].location[0]}`;
		const waypoints = data.slice(1, -1).map(job => `${job.location[1]},${job.location[0]}`).join('|');
		return `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}${waypoints.length > 0 ? `&waypoints=${waypoints}` : ''}`;
	},
	async route_selected() {
		this.get_route_map()
		await this.steps_list()
	},
	
	async steps_list() {
		const jobs = delivery_routes1?.data[0]?.jobs;
		return routes_table.selectedRow?.raw?.steps?.slice(1, -1).map((r, index) => {
			return {
				...r,
				index,
				address: jobs[r.id].address || "Address not found"
			};
		});
	}
	
}