const editModal = (ticketId) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", `http://localhost:3000/api/tickets/${ticketId}`, false);
  xhttp.send();

  const ticket = JSON.parse(xhttp.response);
  console.log(ticket);
  // const {
  //     movie_name, 
  //     movie_description, 
  //     genre_name, 
  //     theater_name,
  //     address,
  //     seat_no,
  //     ticket_price,
  //     show_date
  // } = ticket;

  document.getElementById('movieName').value = ticket.movie_name;
  document.getElementById('movieDesc').value = ticket.movie_description;
  document.getElementById('genreName').value = ticket.genre_name;
  document.getElementById('theaterName').value = ticket.theater_name;
  document.getElementById('address').value = ticket.address;
  document.getElementById('seatNum').value = ticket.seat_no;
  document.getElementById('ticketPrice').value = ticket.ticket_price;
  document.getElementById('showDate').value = ticket.show_date;

  //setting up the action url for the book
  document.getElementById('editForm').action = `http://localhost:3000/api/tickets/${ticketId}?_method=PUT`;
  // window.location.href = "http://localhost:3000/";
}

const deleteTicket = (ticketId) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("DELETE", `http://localhost:3000/api/tickets/${ticketId}`, false);
  xhttp.send();

  location.reload();
}

const loadTickets = () => {
  const xhttp = new XMLHttpRequest();
 
  xhttp.open("GET", "http://localhost:3000/api/tickets", false);
  xhttp.send();

   console.log(xhttp.response);
  const tickets = JSON.parse(xhttp.responseText);

  for (let ticket of tickets) {
      const x = `
          <div class="col-4 mb-5">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${ticket.movie_name}</h5>
                      <div>Seat Number: ${ticket.seat_no}</div>
                      <div>Price: $${ticket.ticket_price}</div>
                      <div>Showing Date: ${ticket.show_date.substring(0,10)}</div>
                      <hr>
                      <button type="button" class="btn btn-danger" onClick="deleteTicket(${ticket.ticket_id})">Delete</button>
                      <button types="button" class="btn btn-primary" data-toggle="modal" 
                          data-target="#editModal" onClick="editModal(${ticket.ticket_id})">
                          Edit
                      </button>
                  </div>
              </div>
          </div>
      `

      document.getElementById('tickets').innerHTML = document.getElementById('tickets').innerHTML + x;
  }
}

loadTickets();









// $(document).ready(function(){
//   $.getJSON("/api/tickets")
//   .then(addTickets);

//   $('.addTicket').click(function(){
//       createTicket();
      
//   })

// });

// /**
//  * adds tickets to the page 
//  * from the database
//  * @param {*} tickets 
//  */
// function addTickets(tickets){
//    //add tickets to the page
//    tickets.forEach(function (ticket){
//     //  let id = ticket.data('id')
//     //  console.log(id);
//        $('.row').append(
//             `<div class="col-md-4">
//                 <div class="tickets">
//                   <div class="ticket-box">
//                     <h4 class="card-heading">${ticket.movie_name}</h4>
//                     <ul>
//                       <li>${ticket.seat_no}</li>
//                       <li>${ticket.ticket_price}</li>
//                       <li>${ticket.show_date}</li>
//                     </ul>
//                     <a href="http://localhost:3000/api/tickets/${ticket.ticket_id}" class="btn btn-medium-blue">View ticket</a>
//                     </div>
//                   </div>
                 
//             </div>
//                 `
//        )
//    });
// }

// function createTicket(){

//   //send request to create a new ticket
//   let movieName = $('#movieName').val();
//   let theaterName = $('#theaterName').val();
//   let seatNum = $('#seatNum').val();
//   let totalSeats = $('#totalSeats').val();
//   let ticketPrice  = $('#ticketPrice').val();
//   let showDate = $('#showDate').val();

//   $.post("/api/tickets/", {
//       movieName: movieName,
//       theaterName: theaterName,
//       seatNum: seatNum,
//       totalSeats: totalSeats, 
//       ticketPrice: ticketPrice,
//       showDate: showDate
//   })
//     .then(function(newTicket) {
//       console.log(newTicket);
//     })
//     .catch(function(err) {
//       console.log(err);
//     })
//     // window.location.href = "http://localhost:3000/index.html";
//     window.history.back();
// }


// function setEditModal(ticketId){
//   $.get(`api/tickets/${ticketId}`)
// }

// function updateTicket(ticket){

//   $.ajax({
//     method: 'PUT',
//     url: 'api/tickets/' + ticket.data('id')
//   })
// }

