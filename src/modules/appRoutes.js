import incidentRoutes from './incident/incident.routes';

export default (app) => {
  app.use('/api/v1/incident', incidentRoutes);
};
