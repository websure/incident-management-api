import bunyan from 'bunyan';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';
import { getUserFromToken, generateErrorObj } from '../incident.utils';
import { STATUS } from '../incident.constants';

const logger = bunyan.createLogger({ name: 'CreateIncident' });

/**
 * update created_by of incident.
 * read user from req header - 'Authorization' attr.
 *
 * @param {*} resBody
 * @returns incident object
 */
const createIncidentObject = (req) => {
  let incidentObj = req.body;
  let currUSer = getUserFromToken(req);
  incidentObj.created_by = currUSer.userid;
  incidentObj.status = STATUS.ANALYSIS;
  logger.info('Incident object created');
  return incidentObj;
};

/**
 * Create Activity object for Incident
 * @param incident object
 * @returns incident Activity object
 */
const createIncidentActivityObject = ({ id, status, assignee, created_by }) => {
  return {
    incident_id: id,
    activity: {
      incident_status: [
        {
          from: '',
          to: status,
        },
      ],
      incident_assignee: [
        {
          from: created_by,
          to: assignee,
        },
      ],
    },
  };
};

/**
 * returns incident Response object
 */
const generateIncidentRespVO = (incident) => {
  logger.info('generating incident response VO ');
  return {
    id: incident.id,
    incident,
    //activity: incidentActivity.activity,
  };
};

/**
 * POST - Controller to create an incident.
 * only admin can create Incident.
 * creates incident and incident Activity object in DB
 *
 * @returns incident Object
 */

export default async function createIncident(req, res, next) {
  try {
    logger.info('request received to create an incident');

    // create & save incident object
    const incidentDO = await IncidentModel.create(createIncidentObject(req));
    // create & save activity object
    const activityDO = await IncidentActivityModel.create(
      createIncidentActivityObject(incidentDO),
    );
    return res.status(201).json({ data: generateIncidentRespVO(incidentDO) });
  } catch (e) {
    logger.error({ err: e }, 'error in creating incident');
    return res
      .status(500)
      .json(generateErrorObj('error in creating incident', e));
  }
}
