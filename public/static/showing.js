endpoint = "showing";

function create(obj) {
	return c("div", {},
		c("p", "ID: " + obj.show_id),
		c("p", "Movie ID: " + obj.show_movie_id),
		c("p", "Theater ID: " + obj.show_theater_id),
		c("p", "Seats: " + obj.seats),
		c("p", "Date: " + obj.show_date)
	)
}
