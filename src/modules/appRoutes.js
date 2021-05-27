import incidentRoutes from './incident/incident.routes';
import UserRoutes from './user/routes';

export default (app) => {
  app.use('/api/v1/incident', incidentRoutes);
  app.use('/api/v1/user', UserRoutes);
};
