import joi from 'joi';
import { INCIDENT_TYPE, STATUS } from './incident.constants';
const IncidentDataValidationSchema = joi.object().keys({
  status: joi
    .string()
    .valid(STATUS.ANALYSIS, STATUS.CLOSE, STATUS.DONE, STATUS.INPROGRESS),
  title: joi.string().alphanum().max(200).required(),
  description: joi.string().alphanum().max(1000),
  acknowledge: joi.boolean(),
  type: joi
    .string()
    .valid(INCIDENT_TYPE.BUG, INCIDENT_TYPE.STORY, INCIDENT_TYPE.TASK)
    .required(),
  assignee: joi.string().required(),
  created_by: joi.string(),
});

export { IncidentDataValidationSchema };

// export default {
//   createIncident: {
//     status: joi
//       .string()
//       .valid('analysis', 'inprogress', 'done', 'close', 'delete')
//       .required(),
//     title: joi.string().alphanum().max(200).required(),
//     description: joi.string().alphanum().max(1000),
//     acknowledge: joi.boolean(),
//     type: joi.string().valid('bug', 'task', 'story'),
//     assignee: joi.string().required(),
//     created_by: joi.string(),
//   },
// };
