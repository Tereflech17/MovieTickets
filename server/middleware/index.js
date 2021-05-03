

const middleware  = {
 isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()){
      return next();
    }
    else {
          res.send('login failed');
    }
  }
}

module.exports = middleware;