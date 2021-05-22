import bunyan from 'bunyan';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';
import { isAdmin, generateErrorObj } from '../incident.utils';

const logger = bunyan.createLogger({ name: 'DeleteIncident' });

/**
 * DELETE - Controller to delete incident and activity model.
 * only admin can delete an incident.
 * @param {*} incident id
 * @param {*} res
 * @returns
 */
export default async function deleteIncident(req, res) {
  try {
    let id = req.params.id;
    if (!id) throw 'Incident ID missing';
    logger.info('request received to delete incident : ', incident_id);
    // check if user is admin
    await isAdmin(req, res, next);

    //delete incident and activity docs
    const incident = IncidentModel.deleteOne({ id });
    const incidentActivity = IncidentActivityModel.findOneAndDelete({
      incident_id: id,
    });

    Promise.all([incident, incidentActivity])
      .then(() => {
        return res.status(200).json({
          id,
          message: 'Incident deleted successfully',
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (e) {
    logger.error('error in Deleting incident ', e);
    return res
      .status(500)
      .json(generateErrorObj('error in Deleting incident', e));
  }
}
