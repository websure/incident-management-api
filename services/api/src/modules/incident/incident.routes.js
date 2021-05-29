import { Router } from 'express';
import * as incidentController from './controllers/incident.controllers';
import {
  IncidentDataValidationSchema,
  getIncidentListApiParamsSchema,
  ObjectIDSchemaValidation,
} from './incident.validations.schema';
import {
  isAdmin,
  ValidateDataMiddleware,
  isAuthorizedUser,
} from './incident.utils';

const routes = new Router();

// Get incident lists
routes.post(
  '/',
  isAuthorizedUser,
  ValidateDataMiddleware(getIncidentListApiParamsSchema),
  incidentController.getIncident,
);

// create an incident
routes.post(
  '/create',
  isAdmin,
  ValidateDataMiddleware(IncidentDataValidationSchema),
  incidentController.createIncident,
);

//get an incident details
routes.get(
  '/:id',
  isAuthorizedUser,
  ValidateDataMiddleware(ObjectIDSchemaValidation),
  incidentController.getIncidentDetails,
);

//update an incident
routes.put(
  '/:id',
  isAuthorizedUser,
  ValidateDataMiddleware(IncidentDataValidationSchema),
  incidentController.updateIncident,
);

//delete an incident, its activity
routes.delete(
  '/:id',
  isAdmin,
  ValidateDataMiddleware(ObjectIDSchemaValidation),
  incidentController.deleteIncident,
);

export default routes;
