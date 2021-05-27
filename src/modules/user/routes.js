import { Router } from 'express';
import * as userController from './controllers';
import { isAuthorizedUser } from '../incident/incident.utils';

const routes = new Router();

routes.post('/login', userController.login);

export default routes;
