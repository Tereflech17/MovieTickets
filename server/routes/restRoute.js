const express = require('express');
const router = express.Router();
const mysql = require('../database/db');

/**
 * Handles async stuff and error handling for an express route
 */
const handleRoute = handler => async (req, res, next) => {
	try{
		let result = handler(req, res);
		if(result instanceof Promise){
			result = await result;
		}
		
		if(result === undefined){
			res.status(204);
			return res.send();
		}
		
		res.json(result);
	}catch(e){
		// throwing a number (e.g. `throw 404`) just sends that as a status code
		if(typeof e === 'number'){
			res.status(e);
			return res.send();
		}
		next(e);
	}
}

for(let table in mysql) {
	router.get("/" + table + "s", handleRoute(
		(_req, _res) => mysql[table].list()
	));
	
	router.get("/" + table + "/:id", handleRoute(
		(req, _res) => mysql[table].read(req.params.id)
	));
	
	router.post("/" + table, handleRoute(
		(req, _res) => mysql[table].create(req.body)
	));
	
	router.put("/" + table + "/:id", handleRoute(
		(req, _res) => mysql[table].update(req.params.id, req.body)
	));
	
	router.delete("/" + table + "/:id", handleRoute(
		(req, _res) => mysql[table].delete(req.params.id)
	));
}

module.exports = router;
