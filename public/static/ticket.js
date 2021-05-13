endpoint = "ticket";

function create(obj) {
	return c("div", {},
		c("p", "Show ID: " + obj.ticket_show_id),
		c("p", "Price: " + obj.ticket_price),
		c("p", "Seat Number: " + obj.seat_no)
	)
}
