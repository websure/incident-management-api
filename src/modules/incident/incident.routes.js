import { Router } from 'express';

import validate from 'express-validation';
import * as incidentController from './controllers/incident.controllers';
//import { authLocal, authJwt } from '../../services/auth.services';
import {
  IncidentDataValidationSchema,
  getIncidentListApiParamsSchema,
  updateIncidentListApiParamsSchema,
} from './incident.validations.schema';
import { isAdmin, ValidateDataMiddleware } from './incident.utils';
const routes = new Router();

routes.post(
  '/',
  ValidateDataMiddleware(getIncidentListApiParamsSchema),
  incidentController.getIncident
);
routes.post(
  '/create',
  ValidateDataMiddleware(IncidentDataValidationSchema),
  isAdmin,
  incidentController.createIncident
);
routes.get('/:id', incidentController.getIncidentDetails);
routes.put(
  '/update',
  ValidateDataMiddleware({
    ...IncidentDataValidationSchema,
    ...updateIncidentListApiParamsSchema,
  }),
  incidentController.updateIncident
);
routes.delete('/:id', incidentController.deleteIncident);

export default routes;
