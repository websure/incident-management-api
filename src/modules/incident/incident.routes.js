import { Router } from 'express';

import validate from 'express-validation';
import * as incidentController from './controllers/incident.controllers';
//import { authLocal, authJwt } from '../../services/auth.services';
import {
  IncidentDataValidationSchema,
  getIncidentListApiParamsSchema,
  updateIncidentListApiParamsSchema,
  ObjectIDSchemaValidation,
} from './incident.validations.schema';
import {
  isAdmin,
  ValidateDataMiddleware,
  isAuthorizedUser,
} from './incident.utils';

const routes = new Router();

routes.post(
  '/',
  isAuthorizedUser,
  ValidateDataMiddleware(getIncidentListApiParamsSchema),
  incidentController.getIncident,
);
routes.post(
  '/create',
  isAdmin,
  ValidateDataMiddleware(IncidentDataValidationSchema),
  incidentController.createIncident,
);
routes.get(
  '/:id',
  isAuthorizedUser,
  ValidateDataMiddleware(ObjectIDSchemaValidation),
  incidentController.getIncidentDetails,
);
routes.post(
  '/update',
  isAuthorizedUser,
  ValidateDataMiddleware({
    ...IncidentDataValidationSchema,
    ...updateIncidentListApiParamsSchema,
  }),
  incidentController.updateIncident,
);
routes.delete(
  '/:id',
  isAdmin,
  ValidateDataMiddleware(ObjectIDSchemaValidation),
  incidentController.deleteIncident,
);

export default routes;
