endpoint = "genre";

function create(obj) {
	return c("div", {
		className: "genre"
	},
		c("p", "ID: " + obj.genre_id),
		c("p", "Name: " + obj.genre_name)
	)
}
