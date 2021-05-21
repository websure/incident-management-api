import mongoose, { Schema } from 'mongoose';
import {
  STATUS,
  INCIDENT_TYPE,
} from '../../modules/incident/incident.constants';

const incidentSchema = new Schema(
  {
    created_by: {
      type: String,
      required: [true, 'created_by is missing'],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: [STATUS.ANALYSIS, STATUS.CLOSE, STATUS.DONE, STATUS.INPROGRESS],
      default: STATUS.ANALYSIS,
    },
    title: {
      type: String,
      required: [true, 'incident Title is missing'],
    },
    assignee: {
      type: String,
      required: [true, 'incident Assignee is missing'],
    },
    acknowledge: {
      type: String,
      enum: [true, false],
      default: false,
    },
    type: {
      type: String,
      enum: [INCIDENT_TYPE.BUG, INCIDENT_TYPE.STORY, INCIDENT_TYPE.TASK],
      required: [true, 'incident Assignee is missing'],
    },
  },
  { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } }
);

incidentSchema.virtual('id').get(function () {
  return this._id;
});

// incidentSchema.methods = {
//   toJSON() {
//     /* return object */
//     let respObj = {
//       id: this._id,
//       product_code: this.product_code,
//       description: this.description,
//       created_on: this.created_on,
//     };
//     if (this.updated_on) {
//       respObj.updated_on = this.updated_on;
//     }
//     return respObj;
//   },
// };
export default mongoose.model('Incident', incidentSchema);
