import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
export default (app) => {
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      ' Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    next();
  });
};
