import Joi from 'joi';
import Users from '../../db/users.db';

/**
 * method to find admin user using authorization token.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isAdmin = (req, res, next) => {
  let currUSer = Users.filter(
    (user) => user.token === req.headers['Authorization']
  );
  if (currUSer?.isadmin) return next();
  return res.status(500).json({ error: 'Only admin can create an incident' });
};

const getUserFromToken = (req) => {
  return Users.filter((user) => user.token === req.headers['Authorization']);
};

const generateErrorObj = (msg, errObject = {}) => ({ msg, error: errObject });

/**
 * validates the body with schema
 *  throws error if body params is invalid
 * @param {*} Incident schema
 */
const ValidateDataMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res
        .status(422)
        .json(generateErrorObj('Invalid Incident Object', message));
    }
  };
};

export { ValidateDataMiddleware, generateErrorObj, getUserFromToken, isAdmin };
