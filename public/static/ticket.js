async function newticket() {
	const fd = new FormData(id("form"));
	
	const res = await api("movietickets", "POST", fd);
	
	if(res){
		setresult(JSON.stringify(res));
	}
}

function createticket(ticket) {
	return c("div", {
		className: "ticket"
	},
		c("h3", "Seat: " + ticket.seat_no),
		c("p", "Movie: " + ticket.movie_name),
		c("p", "Price: " + ticket.ticket_price),
		c("p", "Date: " + ticket.show_date)
	)
}

async function gettickets() {
	const res = await api("movietickets");
	
	if(res){
		for(const i of res){
			id("ticket-list").appendChild(createticket(i));
		}
	}
}

gettickets();
