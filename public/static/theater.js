endpoint = "theater";

function create(obj) {
	return c("div", {},
		c("p", "ID: " + obj.theater_id),
		c("p", "Name: " + obj.theater_name),
		c("p", "Address: " + obj.address)
	)
}
