import bunyan from 'bunyan';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';
import { getIncidentListApiParamsSchema } from '../incident.validations.schema';
import Users from '../../../db/users.db';
import { generateErrorObj } from '../incident.utils';
const logger = bunyan.createLogger({ name: 'GetIncidentDetails' });

/**
 * generate response VO
 * @param {*} incidentList
 * @param {*} activityList
 */

const generateResponseVO = (incident, incidentActivityModel) => {
  logger.info('getting incident details');
  return {
    ...incident,
    activity: incidentActivityModel.activity,
  };
};

/**
 * Get list of incidents.
 * Allows filter by date, type and lazy loading
 * @param {*} req
 * @param {*} res
 * @returns
 */

export default async function getIncidentDetails(req, res) {
  try {
    logger.info('request received to fetch incident details');
    const { id } = req.params;
    const incident = await IncidentModel.findOne({ id }).exec();
    const incidentActivityModel = await IncidentActivityModel.findOne({
      incident_id: incident.id,
    });
    return res
      .status(200)
      .json(generateResponseVO(incident, incidentActivityModel));
  } catch (e) {
    logger.error('error in fetching incident details ', e);
    return res
      .status(500)
      .json(generateErrorObj('error in fetching incident details', e));
  }
}
