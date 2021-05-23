import Joi from 'joi';
import bunyan from 'bunyan';
import Users from '../../db/users.db';

const logger = bunyan.createLogger({ name: 'IncidentUtils' });

/**
 * method to find admin user using authorization token.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isAdmin = (req, res, next) => {
  let currUSer = Users.filter(
    (user) => user.token === req.headers['authorization'],
  );
  if (currUSer.length > 0 && currUSer[0].isadmin) return next();
  logger.error({ err: 'Only admin can create an incident' });
  return res
    .status(500)
    .json(generateErrorObj('Only admin can create/delete an incident'));
};

/**
 * checks if user is authorized
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isAuthorizedUser = (req, res, next) => {
  let user = Users.filter(
    (user) => user.token === req.headers['authorization'],
  );
  if (user.length === 1) return next();
  logger.error({ err: 'unauthorized user' });
  return res
    .status(500)
    .json(generateErrorObj('Only authorized users can access incidents'));
};

const getUserFromToken = (req) => {
  let user = Users.filter(
    (user) => user.token === req.headers['authorization'],
  );
  return user.length === 1 ? user[0] : {};
};

const generateErrorObj = (msg, errObject = {}) => ({ msg, error: errObject });

/**
 * validates the body with schema
 *  throws error if body params is invalid
 * @param {*} Incident schema
 */
const ValidateDataMiddleware = (schema) => {
  return (req, res, next) => {
    let params =
      req.method.toLowerCase() === 'delete' ? { id: req.params.id } : req.body;
    const { error } = schema.validate(params);
    const valid = error == null;

    if (valid) {
      return next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      return res
        .status(422)
        .json(generateErrorObj('Invalid Incident Object', message));
    }
  };
};

export {
  ValidateDataMiddleware,
  generateErrorObj,
  getUserFromToken,
  isAdmin,
  isAuthorizedUser,
};
