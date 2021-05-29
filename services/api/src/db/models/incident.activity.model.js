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

IncidentActivitySchema.pre('save', function () {
  if (this.isNew) {
    this._doc.id = this._id;
  }
});

export default mongoose.model('IncidentActivity', IncidentActivitySchema);
