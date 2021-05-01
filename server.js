'use strict';
const app = require('./app');

const port = process.env.PORT || 3000
app.listen(port, ()  => {
  console.log(`sever running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});