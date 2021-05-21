import mongoose, { Schema } from 'mongoose';

const incidentActivitySchema = new Schema(
  {
    incident_id: {
      type: String,
      required: [true, 'Incident Id is missing'],
    },
    activity: {
      incident_status: [
        {
          _id: false,
          timestamp: {
            type: Date,
            default: Date.now,
          },
          from: {
            type: String,
          },
          to: {
            type: String,
          },
        },
      ],
      incident_assignee: [
        {
          _id: false,
          timestamp: {
            type: Date,
            default: Date.now,
          },
          from: {
            type: String,
          },
          to: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } }
);

incidentActivitySchema.virtual('id').get(function () {
  return this._id;
});

// incidentActivitySchema.methods = {
//     toJSON() {
//       /* return object */
//       let respObj = {
//         id: this._id,
//         product_code: this.product_code,
//         description: this.description,
//         created_on: this.created_on,
//       };
//       if (this.updated_on) {
//         respObj.updated_on = this.updated_on;
//       }
//       return respObj;
//     },
// };
export default mongoose.model('IncidentActivity', incidentActivitySchema);
