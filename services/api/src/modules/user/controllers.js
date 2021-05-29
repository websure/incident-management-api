import Users from '../../db/users.db';
import { generateErrorObj } from '../incident/incident.utils';
const getUSer = (userid, password) => {
  let user = Users.filter(
    (user) => user.userid === userid && user.password === password,
  );
  return user;
};

export function login(req, res, next) {
  /* user login : params -> email,password */

  const { userid, password } = req.body;
  console.log('----------   ', userid, password);
  let user = getUSer(userid, password);
  if (user.length === 1) {
    return res.status(200).json({ ...user[0] });
  } else {
    return res
      .status(401)
      .json(generateErrorObj('Only authorized users can access incidents'));
  }
}
