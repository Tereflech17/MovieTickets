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
 * Creates CRUD operation functions for a table dynamically
 * @param {string} table Table name
 * @param {string} pk Primary key
 * @param {string[]} fields Non-primary keys
 */
function create_crud(table, pk, fields) {
  return {
    // Get all items
    async list() {
      return await query(
        "SELECT * FROM " + table
      );
    },
    
    // Get one item by ID
    async read(id) {
      return (await query(
        "SELECT * FROM " + table + " WHERE " + pk + " = ?",
        [id]
      ))[0];
    },
    
    // Insert an item
    async create(params) {
      return (await query(
        "INSERT INTO " + table + " (" +
          fields.join(",") + ") VALUES (" +
          fields.map(_ => "?").join(",") + ")",
        fields.map(n => params[n])
      )).insertId;
    },
    
    // Update an item
    async update(id, params) {
      const updateFields = fields.filter(n => n in params);
      
      await query(
        "UPDATE " + table + " SET " +
          updateFields.map(n => n + " = ?").join(",") +
          " WHERE " + pk + " = ?",
        [id, ...updateFields.map(n => params[n])]
      );
    },
    
    // Delete an item
    async delete(id) {
      await query(
        "DELETE FROM " + table +
          " WHERE " + pk + " = ?",
        [id]
      );
    }
  }
}

module.exports = {
  genre: create_crud("genre", "genre_id", ["genre_name"]),
  movie: create_crud("movie", "movie_id", [
    "movie_name",
    "movie_description",
    "movie_genre_id"
  ]),
  theater: create_crud("theater", "theater_id", [
    "theater_name",
    "address"
  ]),
  showing: create_crud("showing", "show_id", [
    "show_movie_id",
    "show_theater_id",
    "seats",
    "show_date"
  ]),
  ticket: create_crud("ticket", "ticket_id", [
    "ticket_show_id",
    "ticket_price",
    "seat_no"
  ])
}
