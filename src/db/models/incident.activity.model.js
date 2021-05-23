import mongoose, { Schema } from 'mongoose';

const IncidentActivitySchema = new Schema(
  {
    id: {
      type: mongoose.ObjectId,
      unique: true,
    },
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
  {
    timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' },
    // toObject: {
    //   transform: function (doc, ret) {
    //     return {
    //       id: ret.id,
    //       incident_id: ret.incident_id,
    //       activity: ret.activity,
    //     };
    //   },
    // },
    toJSON: {
      transform: function (doc, ret) {
        return {
          id: ret.id,
          incident_id: ret.incident_id,
          activity: ret.activity,
        };
      },
    },
  },
);

// IncidentActivitySchema.pre('save', function () {
//   if (this.isNew) {
//     this._doc.id = this._id;
//   }
// });

// IncidentActivitySchema.set('toObject', {
//   virtuals: false,
//   versionKey: false,
//   transform: function (doc, ret, options) {
//     return {
//       id: ret._id,
//       incident_id: ret.incident_id,
//       activity: ret.activity,
//     };
//   },
// });

// IncidentActivitySchema.set('toJSON', {
//   virtuals: false,
//   versionKey: false,
//   transform: function (doc, ret, options) {
//     return {
//       id: ret._id,
//       incident_id: ret.incident_id,
//       activity: ret.activity,
//     };
//   },
// });

// IncidentActivitySchema.methods = {
//   toJSON() {
//     /* return object */
//     let respObj = {
//       id: this._id,
//       incident_id: this.incident_id,
//       activity: this.activity,
//       created_on: this.created_on,
//       updated_on: this.updated_on,
//     };

//     return respObj;
//   },
// };

// incidentActivitySchema.virtual('id').get(function () {
//   return this._id;
// });

// IncidentActivitySchema.options.toJSON = {
//   transform: function (doc, ret, options) {
//     return {
//       id: ret._id,
//       incident_id: ret.incident_id,
//       activity: ret.activity,
//     };
//   },
// };

// incidentActivitySchema.set('toJSON', { getters: true, virtuals: false });

// incidentActivitySchema.method('toJSON', function () {
//   var activity = this.toObject();
//   delete activity.salt;
//   delete activity.hash;
//   delete activity.__v;
//   activity.id = this._id;
//   return activity;
// });

// IncidentActivitySchema.methods.toJSON = function () {
//   /* return object */
//   let respObj = {
//     id: this._id,
//     incident_id: this.incident_id,
//     activity: this.activity,
//     created_on: this.created_on,
//     updated_on: this.updated_on,
//   };

//   return respObj;
// };
export default mongoose.model('IncidentActivity', IncidentActivitySchema);
