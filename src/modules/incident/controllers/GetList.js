import bunyan from 'bunyan';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';
import { getIncidentListApiParamsSchema } from '../incident.validations.schema';
import Users from '../../../db/users.db';
import { generateErrorObj } from '../incident.utils';
const logger = bunyan.createLogger({ name: 'GetIncident' });

/**
 * generate response VO
 * @param {*} incidentList
 * @param {*} activityList
 */

// const generateResponseVO = (incidentList, activityList) => {
//   return incidentList.map((t1) => ({
//     ...t1,
//     activity: activityList.find((t2) =>
//       t2.incident_id === t1.id ? t2.activity : []
//     ),
//   }));
// };

/**
 * Get list of incidents.
 * Allows filter by date, type and lazy loading
 * @param {*} req
 * @param {*} res
 * @returns
 */

export default async function getIncident(req, res) {
  try {
    logger.info('request received to fetch incident list');
    const {
      start_index = 0,
      max = 25,
      sortby,
      orderby,
      filterby = [{}],
    } = req.body;

    let sortStr = {};
    sortStr[sortby] = orderby;

    // get incident list based on query params
    const incidentList = await IncidentModel.find(filterby[0])
      .limit(max)
      .skip(start_index)
      .sort(sortStr)
      .exec();

    // get all incident id
    // const ids = incidentList.reduce((pre, curr) => {
    //   pre.push(curr.id);
    // }, []);

    // // get activity list for all fetched incidents
    // const activityList = await IncidentActivityModel.find({
    //   incident_id: { $in: ids },
    // });

    // return res
    //   .status(200)
    //   .json({ list: generateResponseVO(incidentList, activityList) });

    return res.status(200).json({ list: incidentList });
  } catch (e) {
    logger.error('error in fetching incident ', e);
    return res
      .status(500)
      .json(generateErrorObj('error in fetching incident', e));
  }
}
