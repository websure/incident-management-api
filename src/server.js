import express from 'express';
import middlewareConfig from './config/middleware';
import apiRoutes from './modules/appRoutes';
import constants from './config/constants';
import './config/database';
const app = express();
middlewareConfig(app);

//sample endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Incident Management API');
});

// routes
apiRoutes(app);

// listen to server
app.listen(constants.PORT, (err) => {
  if (err) {
    throw err;
    res.send(err);
  } else {
    console.log('Server running on port: ' + constants.PORT);
  }
});
