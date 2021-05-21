import bunyan from 'bunyan';
const logger = bunyan.createLogger({ name: 'IncidentController' });

/*
    GET - Get list of incidents assigned to a given user
*/
export default async function getIncident(req, res) {
  try {
    return res.status(200).json({ success: 'get incident list' });
  } catch (e) {
    console.log('error  ', e);
    return res.status(500).json(e);
  }
}
