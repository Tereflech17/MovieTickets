'use strict'
require('dotenv').config();
const  config  = require('../../config');
const  mysql  = require('mysql2');
// const router = require('../routes/movie');
// const { resolve } = require('node:path');
// const { resourceLimits } = require('node:worker_threads');




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


function query(sql, params = []) {
  return new Promise((res, rej) => {
    db.execute(sql, params, (err, r) => {
      err ? rej(err) : res(r);
    });
  });
}


/**
 * Get all tickets
 * @returns 
 */
async function getAllMovieTickets() {
  return await query(
    "SELECT movie_name, seat_no, show_date, ticket_price FROM movie m"+ 
    " JOIN showing s ON m.movie_id = s.show_movie_id" +
    " JOIN ticket t ON s.show_id = t.ticket_show_id"
  );
} 



/**
 * Get a ticket by Id
 * @param {*} ticketId 
 * @returns 
 */

async function getMovieTicketById(ticketId){
  const results = await query(
    "SELECT movie_name, movie_description, genre_name, seat_no, show_date, ticket_price, theater_name, address FROM movie m"+
    " JOIN genre g ON m.movie_genre_id = g.genre_id"+ 
    " JOIN showing s ON m.movie_id = s.show_movie_id" +
    " JOIN theater th ON s.show_theater_id = th.theater_id" +
    " JOIN ticket t ON s.show_id = t.ticket_show_id WHERE t.ticket_id= ?",
    [ticketId]
  );
  
  return results[0];
}


/**
 * Add a ticket to the database
 * @param {*} showId 
 * @param {*} ticketPrice 
 * @param {*} seatNum 
 * @returns 
 */
async function insertTicket(showId, ticketPrice, seatNum) {
  const results = await query(
    "INSERT INTO ticket(ticket_show_id, ticket_price, seat_no) VALUES (?, ?, ?)",
    [showId, ticketPrice, seatNum]
  );
  
  return results.insertId;
}




/**
 * Update a ticket
 * @param {*} ticketPrice 
 * @param {*} seatNum 
 * @param {*} ticketId 
 * @returns 
 */
async function updateTicket(ticketPrice, seatNum, ticketId){
  await query(
    "UPDATE ticket SET ticket_price=?, seat_no=? WHERE ticket_id=?",
    [ticketPrice, seatNum, ticketId]
  );
}

/**
 * Delete a ticket
 */

/**
 * Delete a ticket
 * To delect a ticket we first remove a ticket information 
 * in the showing table since the ticket table and showing have a 
 * relationship and then using the ON delete CASCADE functionality of 
 * of mysql the related information will be removed from the ticket table
 * @param {*} showId 
 * @returns 
 */

async function deleteTicket(ticketId){
  await query(
    "DELETE FROM ticket WHERE ticket_id=?",
    [ticketId]
  );
}


/**
 * Get all Movies
 * @returns 
 */
async function getAllMovies() {
  return await query(
    "SELECT * FROM movie"
  );
}



/**
 * Get a Movie by ID
 * 
 * @param {*} movieId 
 * @returns 
 */
async function getMovieById(movieId){
  const results = await query(
    "SELECT * FROM movie WHERE movie_id=?",
    [movieId]
  );
  
  return results[0];
}


/**
 * 
 * @param {*} movieName 
 * @param {*} movieDesc 
 * @param {*} movieGenre 
 * @returns 
 */
async function insertMovie(movieName, movieDesc, movieGenre){
  const results = await query(
    "INSERT INTO movie(movie_name, movie_description, movie_genre_id) VALUES(?,?,?)",
    [movieName, movieDesc, movieGenre]
  );
  
  return results.insertId;
}

/**
 * 
 * @param {*} movieName 
 * @param {*} movieDesc 
 * @param {*} movieGenre 
 * @param {*} movieId 
 * @returns 
 */
async function updateMovie(movieName, movieDesc, movieGenre, movieId){
  await query(
    "UPDATE movie SET movie_name=?, movie_description=?, movie_genre_id=? WHERE movie_id=?",
    [movieName, movieDesc, movieGenre, movieId]
  );
}

/**
 * 
 * @param {*} movieId 
 * @returns 
 */
async function deleteMovie(movieId){
  await query(
    "DELETE FROM movie WHERE movie_id=?",
    [movieId]
  );
}

/**
 * Filter movies collection by genres
 * @param {*} genreId 
 * @returns 
 */
async function getMovieByGenre(genreId){
  const results = await query(
    "SELECT movie_id, movie_name, movie_description, genre_name FROM movie m JOIN genre g ON m.movie_genre_id = g.genre_id WHERE m.movie_genre_id=?",
    [genreId]
  );
  
  return results[0];
}

/**
 * Get's a Movie Id using movie_name
 * @param {*} movieName 
 * @returns 
 */
async function getMovieByName(movieName) {
  const results = await query(
    "SELECT movie_id FROM movie WHERE movie_name=?",
    [movieName]
  );
  
  return results[0];
}

/**
 * Get's a Genre Id using genre_name
 * @param {*} genreName 
 * @returns 
 */
async function getGenreName(genreName){
  const results = await query(
    "SELECT genre_id FROM genre WHERE genre_name=?",
    [genreName]
  );
  
  return results[0];
}





/**
 * Get's a TheaterId using theater_name
 * @param {*} theaterName 
 * @returns 
 */
async function getTheaterByName(theaterName){
  const results = await query(
    "SELECT theater_id FROM theater WHERE theater_name=?",
    [theaterName]
  );
  
  return results[0];
}

async function insertMovieShowing(movieId, theaterId, seats, showDate) {
  const results = await query(
    "INSERT INTO showing(show_movie_id, show_theater_id, seats, show_date) VALUES (?, ?, ?, ?)",
    [movieId, theaterId, seats, showDate]
  );
  
  return results.insertId;
}


module.exports = { 
  getAllMovies, 
  getMovieById, 
  getMovieByName, 
  getTheaterByName, 
  getAllMovieTickets, 
  getMovieTicketById,
  insertTicket,
  insertMovieShowing,
  updateTicket,
  deleteTicket 
};
