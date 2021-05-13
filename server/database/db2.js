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



/**
 * Get all tickets
 * @returns 
 */
function getAllMovieTickets() {
      const query = "SELECT ticket_id, movie_name, seat_no, show_date, ticket_price FROM movie m"+ 
                    " JOIN showing s ON m.movie_id = s.show_movie_id" +
                    " JOIN ticket t ON s.show_id = t.ticket_show_id ORDER BY ticket_id DESC";
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
 * Get a ticket by Id
 * @param {*} ticketId 
 * @returns 
 */

function getMovieTicketById(ticketId){
    const query = "SELECT ticket_id, movie_name, movie_description, genre_name, seat_no, show_date, ticket_price, theater_name, address FROM movie m"+
                  " JOIN genre g ON m.movie_genre_id = g.genre_id"+ 
                  " JOIN showing s ON m.movie_id = s.show_movie_id" +
                  " JOIN theater th ON s.show_theater_id = th.theater_id" +
                  " JOIN ticket t ON s.show_id = t.ticket_show_id WHERE t.ticket_id= ?";

  return new Promise((resolve, reject) => {
    db.execute(query, [ticketId], (err, results) => {
      if (typeof results != 'undefined'){
        const rows = results;

        if (rows.length === 1) {
          let ticketRecord = rows[0];
            resolve(ticketRecord);
        }
      }
      reject(err);
    });
  })
}


/**
 * Add a ticket to the database
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
 * @param {*} ticketPrice 
 * @param {*} seatNum 
 * @param {*} ticketId 
 * @returns 
 */
function updateTicket( ticketPrice, seatNum, ticketId){
      const query  = "UPDATE ticket SET ticket_price=?, seat_no=? WHERE ticket_id=?";

      return new Promise((resolve, reject) => {
        db.execute(query, [ticketPrice, seatNum, ticketId], (err, results) => {
          if(typeof results != 'undefined'){
              const affected = results.affectedRows;

             //check affected rows
             if(affected === 1) resolve(1);
          }
           reject(err)
        });
      });
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

function deleteTicket(ticketId){
    const query = "DELETE FROM ticket WHERE ticket_id=?";

    return new Promise((resolve, reject) => {
        db.execute(query, [ticketId], (err, results) => {
            if(typeof results != 'undefined'){
              const affected = results.affectedRows;

              //check affected rows 
              if (affected === 1) resolve(1);
            }

            reject(err);
        });
    });
}


/**
 * Get all Movies
 * @returns 
 */
function getAllMovies() {
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
 * 
 * @param {*} movieName 
 * @param {*} movieDesc 
 * @param {*} movieGenre 
 * @returns 
 */
function insertMovie(movieName, movieDesc, movieGenre){
    const query = "INSERT INTO movie(movie_name, movie_description, movie_genre_id) VALUES(?,?,?)";

    return new Promise((resolve, reject) => {
      db.execute(query, [movieName, movieDesc, movieGenre], (err, results) => {
            if (typeof results != 'undefined'){
                const affected = results.affectedRows;

                //get the last inserted id
                const insertedId = results.insertId;

                if(affected === 1) resolve(insertedId);

            }

            reject(err);
      });
    });
}

/**
 * 
 * @param {*} movieName 
 * @param {*} movieDesc 
 * @param {*} movieGenre 
 * @param {*} movieId 
 * @returns 
 */
function updateMovie(movieName, movieDesc, movieGenre, movieId){
  const query = "UPDATE movie SET movie_name=?, movie_description=?, movie_genre_id=? WHERE movie_id=?";

  return new Promise((resolve, reject) => {
    db.execute(query, [movieName, movieDesc, movieGenre, movieId], (err, results) => {
        if (typeof results != 'undefined'){
            const affected = results.affectedRows;

            //check affected rows
            if (affected === 1) resolve(1);
        }

        reject(err);
    });
  });
}

/**
 * 
 * @param {*} movieId 
 * @returns 
 */
function deleteMovie(movieId){
    const query = "DELETE FROM movie WHERE movie_id=?";

    return new Promise((resolve, reject) => {
       db.execute(query, [movieId], (err, results) => {
          if (typeof results != 'undefined'){
              const affected = results.affectedRows;

              if (affected === 1) resolve(1);
          }
          reject(err);
       });
    });
}

/**
 * Filter movies collection by genres
 * @param {*} genreId 
 * @returns 
 */
function getMovieByGenre(genreId){
  const query = "SELECT movie_id, movie_name, movie_description, genre_name FROM movie m JOIN genre g ON m.movie_genre_id = g.genre_id WHERE m.movie_genre_id=?";

  return new Promise((resolve, reject) => {
    db.execute(query, [genreId], (err, results) => {
        if (typeof results != 'undefined'){
          const rows = results;

          if (rows.length > 0){
              let data  = []

              rows.forEach(d => {
                 data.push(d);
              })
              resolve(data);
          }
        }
        reject(err);
    });
  });
}

/**
 * Get's a Movie Id using movie_name
 * @param {*} moiveName 
 * @returns 
 */
function getMovieByName(moiveName) {
      const query =  "SELECT movie_id FROM movie WHERE movie_name=?";

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
 * Get's a Genre Id using genre_name
 * @param {*} genreName 
 * @returns 
 */
function getGenreName(genreName){
  const query = "SELECT genre_id FROM genre WHERE genre_name=?";

  return new Promise((resolve, reject) => {
    db.execute(query, [genreName], (err, results) => {
      if (typeof results != 'undefined'){
          const rows = results;
          if (rows.length === 1){
            let genreId = rows[0];
            resolve(genreId);
          }
      }
      reject(err);
    })
  })
}





/**
 * Get's a TheaterId using theater_name
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
