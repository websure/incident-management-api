import bunyan from 'bunyan';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';
import { getIncidentListApiParamsSchema } from '../incident.validations.schema';
import Users from '../../../db/users.db';
import { generateErrorObj, getUserFromToken } from '../incident.utils';

const logger = bunyan.createLogger({ name: 'UpdateIncident' });

/**
 * Generates response object
 * @param {*} body
 * @param {*} incident
 * @param {*} activityModel
 * @returns
 */
const generateResponseVO = (body, incident, activityModel) => {
  const { description, status, type, title, assignee, acknowledge } = body;
  logger.info('generates response object');
  return {
    ...incident,
    description,
    status,
    type,
    title,
    assignee,
    acknowledge,
    activity: activityModel.activity,
  };
};

/**
 * validate and update incident model
 * only current user can acknowledge the incident
 * @param {*} req
 * @param {*} res
 * @returns
 */
const validateIncidentModel = async (req, res) => {
  try {
    let currUser = getUserFromToken(req);
    const { id, acknowledge } = req.body;

    const incidentDO = await IncidentModel.findOne({ id }).exec();
    /**
     * only current user can acknowledge the incident.
     * if unauthorized user acknowledges the incident, will throw error
     */
    if (incidentDO.acknowledge !== acknowledge) {
      if (incidentDO.assignee !== currUser.userid) {
        logger.error('Only assignee can acknowledge the Incident');
        throw 'Only assignee can acknowledge the Incident';
      }
    }
    return incidentDO;
  } catch (e) {
    logger.error('error in updating incident ', e);
    return res
      .status(500)
      .json(generateErrorObj('error in updating incident', e));
  }
};
/**
 * update status and asignee activity
 * @param {*} activityList
 * @param {*} status
 * @param {*} OldStatus
 * @param {*} assignee
 * @param {*} OldAssignee
 * @returns updated status and asignee
 */
const generateIncidentActivityModel = (
  activityList,
  status,
  OldStatus,
  assignee,
  OldAssignee
) => {
  const { activity } = activityList;
  const { incident_status, incident_assignee } = activity;
  const updatedStatus = incident_status;
  const updatedAssignee = incident_assignee;

  if (status !== OldStatus) {
    const lastStatus = incident_status[incident_status.length - 1];
    updatedStatus = [...updatedStatus, { from: lastStatus.to, to: status }];
  }

  if (assignee !== OldAssignee) {
    const lastAssignee = incident_assignee[incident_assignee.length - 1];
    updatedAssignee = [
      ...updatedAssignee,
      { from: lastAssignee.to, to: assignee },
    ];
  }

  return {
    updatedStatus,
    updatedAssignee,
  };
};

/**
 * PUT - Controller to allow create an incident.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function updateIncident(req, res) {
  try {
    if (req.body && Object.keys(req.body).length > 0) {
      let id = req.body.id;
      logger.info('request received to update an incident : ', id);

      const { description, status, type, title, assignee, acknowledge } =
        req.body;

      // validate params
      const incidentDO = validateIncidentModel(req, res);
      const incidentActivityDO = {};

      // update incident model
      await IncidentModel.updateOne(
        { id },
        { description, status, type, title, assignee, acknowledge },
        {},
        (err, doc) => {
          if (err) throw 'Error in updating the the incident';
        }
      ).exec();

      const { status: OldStatus, assignee: OldAssignee } = incidentDO;

      if (status !== OldStatus || assignee !== OldAssignee) {
        // update activity model only if status or assignee is changed
        const activityList = await IncidentActivityModel.findOne({
          incident_id: id,
        }).exec();

        // get updated status and assignee
        const { updatedStatus, updatedAssignee } =
          generateIncidentActivityModel(
            activityList,
            status,
            OldStatus,
            assignee,
            OldAssignee
          );
        // update activity model
        incidentActivityDO = await IncidentActivityModel.updateOne(
          { incident_id: id },
          {
            activity: {
              incident_status: updatedStatus,
              incident_assignee: updatedAssignee,
            },
          },
          { new: true }
        );
      }
      // response
      return res
        .status(200)
        .json(generateResponseVO(req.body, incidentDO, incidentActivityDO));
    } else {
      throw 'Incident data is missing';
    }
  } catch (e) {
    logger.error('error in updating incident ', e);
    return res
      .status(500)
      .json(generateErrorObj('error in updating incident', e));
  }
}
