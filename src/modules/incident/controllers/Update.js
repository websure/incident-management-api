import bunyan from 'bunyan';
const logger = bunyan.createLogger({ name: 'IncidentController' });

/*
    PUT - Controller to allow create an incident. 
*/
export default async function updateIncident(req, res) {
  try {
    return res.status(200).json({ success: 'updateIncident' });
  } catch (e) {
    console.log('error  ', e);
    return res.status(500).json(e);
  }
}
