import bunyan from 'bunyan';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';
import { getIncidentListApiParamsSchema } from '../incident.validations.schema';
import Users from '../../../db/users.db';
import { generateErrorObj, getUserFromToken } from '../incident.utils';
import { STATUS } from '../incident.constants';
const logger = bunyan.createLogger({ name: 'UpdateIncident' });

/**
 * Generates response object
 * @param {*} body
 * @param {*} incident
 * @param {*} activityModel
 * @returns
 */
const generateResponseVO = (body, originalIncidentDO, activityModel) => {
  const { description, status, type, title, assignee, acknowledge } = body;
  const { created_by, id, created_on, updated_on } = originalIncidentDO;
  logger.info('generates response object');
  return {
    created_by,
    id,
    created_on,
    updated_on,
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
const fetchAndValidateIncidentModel = async (req, res) => {
  try {
    let currUser = getUserFromToken(req);
    const { id } = req.params;
    const { acknowledge } = req.body;

    const incidentDO = await IncidentModel.findOne({ id }).exec();
    if (!incidentDO) {
      throw 'No incident data found';
    }
    /**
     * only current user can acknowledge the incident.
     * if unauthorized user acknowledges the incident, will throw error
     */
    if (incidentDO.acknowledge !== acknowledge) {
      if (incidentDO.assignee !== currUser.userid) {
        logger.error({ err: 'Only assignee can acknowledge the Incident' });
        throw 'Only assignee can acknowledge the Incident';
      }
    }
    return incidentDO;
  } catch (e) {
    throw e;
    // logger.error({err:e},'error in updating incident ');
    // return res
    //   .status(500)
    //   .json(generateErrorObj('error in updating incident', e));
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
  OldAssignee,
) => {
  try {
    const { activity } = activityList;
    const { incident_status, incident_assignee } = activity;
    let updatedStatus = incident_status;
    let updatedAssignee = incident_assignee;

    if (status && status !== OldStatus) {
      /* check if status is valid */
      let allowedStatusValues = Object.values(STATUS);
      if (!allowedStatusValues.includes(status)) throw 'invalid status value';

      const lastStatus = incident_status[incident_status.length - 1];
      updatedStatus = [{ from: lastStatus.to, to: status }, ...updatedStatus];
    }

    if (assignee && assignee !== OldAssignee) {
      // chekc if user is authorized
      let validUser = Users.filter((user) => user.userid === assignee);
      if (validUser.length === 0) throw 'Unauthorized user';

      const lastAssignee =
        incident_assignee.length > 0
          ? incident_assignee[incident_assignee.length - 1]
          : [{ to: '', from: '' }];

      updatedAssignee = [
        { from: lastAssignee.to, to: assignee },
        ...updatedAssignee,
      ];
    }
    return {
      updatedStatus,
      updatedAssignee,
    };
  } catch (e) {
    logger.error({ err: e }, 'Error in updating activity model ');
    throw e;
  }
};

/**
 * PUT - Controller to allow create an incident.
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function updateIncident(req, res, next) {
  try {
    const { id } = req.params;
    logger.info('request received to update incident ', id);

    if (req.body && Object.keys(req.body).length > 0) {
      const { description, status, type, title, assignee, acknowledge } =
        req.body;

      // validate params
      const originalIncidentDO = await fetchAndValidateIncidentModel(req, res);
      let incidentActivityDO = await IncidentActivityModel.findOne({
        incident_id: id,
      }).exec();

      const { status: OldStatus, assignee: OldAssignee } = originalIncidentDO;
      /**
       * update activity only when status,assignee is changed
       */
      if (status !== OldStatus || assignee !== OldAssignee) {
        logger.info('updating incident activity model ');
        const { updatedStatus, updatedAssignee } =
          generateIncidentActivityModel(
            incidentActivityDO,
            status,
            OldStatus,
            assignee,
            OldAssignee,
          );

        // update activity model
        incidentActivityDO = await IncidentActivityModel.findOneAndUpdate(
          { incident_id: id },
          {
            activity: {
              incident_status: updatedStatus,
              incident_assignee: updatedAssignee,
            },
          },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log('activity error  ', err);
              throw 'Error in updating the the incident';
            }
            logger.info('activity model updated successful ', doc);
          },
        );
      }

      // update incident model
      await IncidentModel.updateOne(
        { id },
        { description, status, type, title, assignee, acknowledge },
        {},
        (err, doc) => {
          if (err) throw 'Error in updating the the incident';
          logger.info('incident model updated successful ');
        },
      ).exec();

      // response
      return res
        .status(200)
        .json(
          generateResponseVO(req.body, originalIncidentDO, incidentActivityDO),
        );
    } else {
      throw 'Incident data is missing';
    }
  } catch (e) {
    logger.error({ err: e }, 'error in updating incident ');
    return res
      .status(500)
      .json(generateErrorObj('error in updating incident', e));
  }
}
