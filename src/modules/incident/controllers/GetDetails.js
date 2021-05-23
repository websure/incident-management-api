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
  logger.info('generating details response object for incident details ');
  return {
    id: incident.id,
    incident,
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
    const { id } = req.params;
    logger.info('request received to fetch incident details ', id);
    const incident = await IncidentModel.findOne({ id }).exec();
    const incidentActivityModel = await IncidentActivityModel.findOne({
      incident_id: incident.id,
    });
    return res
      .status(200)
      .json(generateResponseVO(incident, incidentActivityModel));
  } catch (e) {
    logger.error({ err: e }, 'error in fetching incident details ');
    return res
      .status(500)
      .json(generateErrorObj('error in fetching incident details', e));
  }
}
