import express from 'express';
import apiRoutes from '../modules/appRoutes';
import middlewareConfig from '../config/middleware';

const app = express();
middlewareConfig(app);
apiRoutes(app);

// app.listen(4000, (err) => {
//   if (err) {
//     throw err;
//     res.send(err);
//   } else {
//     console.log('Test Server running on port: ' + 4000);
//   }
// });

module.exports = app;
