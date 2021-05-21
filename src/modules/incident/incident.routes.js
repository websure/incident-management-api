import { Router } from 'express';

import validate from 'express-validation';
import * as incidentController from './controllers/incident.controllers';
//import { authLocal, authJwt } from '../../services/auth.services';
import { IncidentDataValidationSchema } from './incident.validations.schema';
import { isAdmin, ValidateDataMiddleware } from './incident.utils';
const routes = new Router();

routes.get('/', incidentController.getIncident);
routes.post(
  '/create',
  ValidateDataMiddleware(IncidentDataValidationSchema),
  isAdmin,
  incidentController.createIncident
);
routes.put('/:id', incidentController.updateIncident);
routes.delete('/:id', incidentController.deleteIncident);

export default routes;
