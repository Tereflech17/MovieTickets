const express = require('express');
const router = express.Router();
const mysql = require('../database/db2');
// const { isLoggedIn } = require('../middleware/index');


/**
 * GET route - get all tickets collection
 */
router.get("/", async (req, res) => {
  try {
        const tickets = await mysql.getAllMovieTickets();
        // res.render("../client/views/ticket/index", { tickets: tickets });
        res.json(tickets);
  }catch(err){
      console.log(err);
      return res.sendStatus(500);
  }
})

/**
 * render form to create a new movie ticket
 */
router.get("/new", () => {
    res.render("../client/views/ticket/new");
});

/**
 * POST route - add a new ticket
 */
router.post("/", async (req, res) => {
      try {
            
            let mName = req.body.movieName;
            let tName = req.body.theaterName;
            let totalSeats = req.body.totalSeats;
            let showDate = req.body.showDate;
            let seatNum = req.body.seatNum;
            let price = req.body.ticketPrice;
            console.log("form values", mName, tName, totalSeats, showDate);
            const movieId = await mysql.getMovieByName(mName);
            const theaterId = await mysql.getTheaterByName(tName);
            // console.log("form values!!!!!!", Object.values(movieId)[0], Object.values(theaterId)[0], totalSeats, showDate);
            const showId = await mysql.insertMovieShowing(Object.values(movieId)[0], Object.values(theaterId)[0], totalSeats, showDate);
            console.log(`showId:${showId} price: ${price} seatNum: ${seatNum}`);
            const ticketId = await mysql.insertTicket(showId, price, seatNum);
            console.log(ticketId);
            // res.send("data inserted!!!!");
            // console.log("ticket created!!!!!!!");
            res.redirect('/tickets');
            // res.send("ticket updated")
            // res.redirect('back');
      }catch(err){
        console.log(err);
        return res.sendStatus(500);
      }
});

/**
 * GET route - get a tickect
 */
router.get("/:id", async (req, res) => {
  try {
        let ticketId = req.params.id 
        const ticket = await mysql.getMovieTicketById(ticketId);
        res.json(ticket);
  }catch(err){
    console.log(err);
    return res.sendStatus(500);
  }
})

/**
 * UPDATE route - update a ticket 
 */
router.put("/:id", async (req, res) => {
      try {
             let ticketId = req.params.id 
             const { ticketPrice, seatNum } = req.body;
             const updated = await mysql.updateTicket(ticketPrice, seatNum, ticketId);

             if (updated === 1) {
                res.redirect("/tickets");
             }

      }catch(err){
        console.log(err);
        return res.sendStatus(500);
      }
});

/**
 * DELETE route - delete a ticket
 */
router.delete("/:id", async (req, res) => {
    try {
            //delete ticket
            let ticketId = req.params.id;
            const affected = await mysql.deleteTicket(ticketId);
            if (affected !== null){
              res.send('ticket deleted');
            }
    }catch(err){
      console.log(err);
      return res.sendStatus(500);
    }
});

module.exports = router;

