'use strict'
require('dotenv').config();
const  config  = require('../../config');
const  mysql  = require('mysql2');
const router = require('../routes/movie');


const c = config.dev;
console.log(c);

const db = mysql.createConnection({
      host: c.host,
      user: c.username,
      password: c.password,
      database: c.database
}); 

db.connect(err => {
  if (err) console.log(err);
  else console.log("Connection to MySQL database was successful");
});


/**
 * Get all Tickets
 */
function getAllMovieTickets() {
      const query = "SELECT movie_name, seat_no, show_date, ticket_price FROM movie m"+ 
                    " JOIN showing s ON m.movie_id = s.show_movie_id" +
                    " JOIN ticket t ON s.show_id = t.ticket_show_id";
      return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
          if(typeof results != 'undefined'){
                const rows = results;
                console.log(results);

                if(rows.length >= 0){
                  let data = [];
                  rows.forEach(d => {
                    data.push(d);
                  });

                  resolve(data)
                }
            }
            reject(err);
        })
      })
} 


/**
 * Get Tickets by ID
 * 
 */

function getMovieTicketById(ticketId){
    const query = "SELECT movie_name, movie_description, genre_name, seat_no, show_date, ticket_price, theater_name, address FROM movie m"+
                  " JOIN genre g ON m.movie_genre_id = g.genre_id"+ 
                  " JOIN showing s ON m.movie_id = s.show_movie_id" +
                  " JOIN theater th ON s.show_theater_id = th.theater_id" +
                  " JOIN ticket t ON s.show_id = t.ticket_show_id WHERE t.ticket_id= ?";

  return new Promise((resolve, reject) => {
    db.execute(query, [ticketId], (err, results) => {
      if (typeof results != 'undefined'){
        const rows = results;

        if (rows.length === 1) {
          let ticketData = rows[0];
            resolve(ticketData);
        }
      }
      reject(err);
    });
  })
}


/**
 * Insert Tickets into database
 * @param {*} showId 
 * @param {*} ticketPrice 
 * @param {*} seatNum 
 * @returns 
 */
function insertTicket(showId, ticketPrice, seatNum) {
    const query = "INSERT INTO ticket(ticket_show_id, ticket_price, seat_no) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.execute(query, [showId, ticketPrice, seatNum], (err, results) => {
        if (typeof results != 'undefined') {
            const affected = results.affectedRows; 

            //get the last inserted id
            const insertedId = results.insertId;

            //check affected rows
            if (affected === 1) resolve(insertedId);
        }
        reject(err);
      })
    })
}



/**
 * Update a ticket
 */

/**
 * Delete a ticket
 */


/**
 * Get all Movies
 * @returns 
 */
function getMovies() {
  const query = "SELECT * FROM `movie`";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (typeof results != 'undefined'){
        const rows = results;
        console.log(results);

        if (rows.length > 0) {
          let data = [];
          rows.forEach(d => {
             data.push(d);
            
          });

          resolve(data);
        }
      }
      reject(err);
    })
  })
}



/**
 * Get a Movie by ID
 * 
 * @param {*} movieId 
 * @returns 
 */
function getMovieById(movieId){
  const query = "SELECT * FROM movie WHERE movie_id= ?";

  return new Promise((resolve, reject) => {
    db.execute(query, [movieId], (err, results) => {
      if (typeof results != 'undefined'){
        const rows = results;

        if (rows.length === 1) {
          let movieData = rows[0];
            resolve(movieData);
        }
      }
      reject(err);
    });
  })
}


/**
 * Get's a Movie Id by movie_name
 * @param {*} moiveName 
 * @returns 
 */
function getMovieByName(moiveName) {
      const query =  "SELECT movie_id FROM movie WHERE movie_name= ?";

      return new Promise((resolve, reject) => {
        db.execute(query,[moiveName], (err, results) => {
          if (typeof results != 'undefined'){
            const rows = results;
            
            if(rows.length === 1){
              let movieId = rows[0];
              resolve(movieId)
            }
          }
          reject(err);
        })
      })
}


/**
 * Get's a TheaterId by theater_name
 * @param {*} theaterName 
 * @returns 
 */
function getTheaterByName(theaterName){
  const query = "SELECT theater_id FROM theater WHERE theater_name= ?";

  return new Promise((resolve, reject) => {
    db.execute(query, [theaterName], (err, results) => {
      if (typeof results != 'undefined'){
        const rows = results;
        
        if(rows.length === 1){
          let theaterId = rows[0];
          resolve(theaterId)
        }
      }
      reject(err);
    })
  })

}

function insertMovieShowing(movieId, theaterId, seats, showDate) {
  const query = "INSERT INTO showing(show_movie_id, show_theater_id, seats, show_date) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.execute(query, [movieId, theaterId, seats, showDate], (err, results) => {
      if (typeof results != 'undefined') {
          console.log(results);
          const affected = results.affectedRows; 

          //get the last inserted id
          const insertedId = results.insertId;

          //check affected rows
          if (affected === 1) resolve(insertedId);
      }
      reject(err);
    })
  })
}


module.exports = { 
  getMovies, 
  getMovieById, 
  getMovieByName, 
  getTheaterByName, 
  getAllMovieTickets, 
  getMovieTicketById,
  insertTicket,
  insertMovieShowing, 
};
