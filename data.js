import { response } from 'express';

const incident = {
  createdBy: 'admin',
  status: 'analysis,inprogress,done,close',
  title: '',
  description: '',
  assignee: '',
  acknowledge: 'true,false',
  type: 'bug,task,story',
  timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' },
};

const activity = {
  id: '',
  activity: {
    status: [
      {
        _id: false,
        timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' },
        from: '',
        to: '',
      },
    ],
  },
  timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' },
};

export { incident };

mock_create_incident = {
  status: 'analysis',
  title: '1st incident',
  description: '',
  acknowledge: false,
  type: 'bug',
  assignee: '',
  created_by: '',
};

create_incident_successful_response = {
  data: {
    id: '60aa2644a482d90a2c470867',
    incident: {
      id: '60aa2644a482d90a2c470867',
      created_by: 'admin',
      description: '',
      status: 'analysis',
      title: '1st incident',
      assignee: '',
      acknowledge: 'false',
      type: 'bug',
      updated_on: '2021-05-23T09:54:12.578Z',
      created_on: '2021-05-23T09:54:12.578Z',
    },
    activity: {
      incident_status: [
        {
          from: '',
          to: 'analysis',
          timestamp: '2021-05-23T09:54:12.603Z',
        },
      ],
      incident_assignee: [
        {
          from: 'admin',
          to: '',
          timestamp: '2021-05-23T09:54:12.604Z',
        },
      ],
    },
  },
};

//mock_delete  : 60aa26d86e129d5ec81cf415

/**
test cases:

create :
invalid schemas
admin user, other user


delete :
invalid schemas
admin user, other user

invalid objectID =
{
    "msg": "Invalid Incident Object",
    "error": "It must have a valid ObjectId."
}

 */
