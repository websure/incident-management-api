import express from 'express';
import apiRoutes from '../modules/appRoutes';
import middlewareConfig from '../config/middleware';

const app = express();
middlewareConfig(app);
apiRoutes(app);
module.exports = app;
