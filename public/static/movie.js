endpoint = "movie";

function create(obj) {
	return c("div", {},
		c("p", "ID: " + obj.movie_id),
		c("p", "Name: " + obj.movie_name),
		c("p", "Desc: " + obj.movie_description),
		c("p", "Genre ID: " + obj.movie_genre_id)
	)
}
