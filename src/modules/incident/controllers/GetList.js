import bunyan from 'bunyan';
import IncidentModel from '../../../db/models/incident.model';
import { generateErrorObj } from '../incident.utils';
import { INCIDENT_API_PARAMS, ORDER_BY } from '../incident.constants';

const logger = bunyan.createLogger({ name: 'GetIncident' });

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
      sortby = INCIDENT_API_PARAMS.CREATED_ON,
      orderby = ORDER_BY.DESC,
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

    return res.status(200).json({ data: incidentList });
  } catch (e) {
    logger.error({ err: e }, 'error in fetching incident ');
    return res
      .status(500)
      .json(generateErrorObj('error in fetching incident', e));
  }
}
