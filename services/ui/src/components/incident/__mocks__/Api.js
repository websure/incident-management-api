const IncidentDetailsMockResp = {
  id: '60aee6d1eece4442889630cd',
  incident: {
    id: '60aee6d1eece4442889630cd',
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: 'compact msg',
    assignee: '',
    acknowledge: 'false',
    type: 'task',
    updated_on: '2021-05-27T00:24:49.774Z',
    created_on: '2021-05-27T00:24:49.774Z',
  },
  activity: {
    incident_status: [
      { from: '', to: 'analysis', timestamp: '2021-05-27T00:24:49.785Z' },
    ],
    incident_assignee: [
      { from: 'admin', to: 'user1', timestamp: '2021-05-27T00:24:49.786Z' },
    ],
  },
};

const getIncidentListMockResp = [
  {
    id: '60aafe3079d3ae59ecc71c6b',
    created_by: 'admin',
    description: 'desc text',
    status: 'analysis',
    title: 'updating  incident',
    assignee: 'user1',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-24T03:27:26.369Z',
    created_on: '2021-05-24T01:15:28.283Z',
  },
  {
    id: '60aa5c4dd69b37127c5c746c',
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '2nd incident',
    assignee: 'user1',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T13:44:45.615Z',
    created_on: '2021-05-23T13:44:45.615Z',
  },
  {
    id: '60aa4a48803ccc36e436ef42',
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '1st incident',
    assignee: '',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T12:27:52.151Z',
    created_on: '2021-05-23T12:27:52.151Z',
  },
  {
    id: '60aa4921cf08e61568e3521e',
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '1st incident',
    assignee: '',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T12:22:57.360Z',
    created_on: '2021-05-23T12:22:57.360Z',
  },
  {
    created_by: 'admin',
    description: '',
    status: 'analysis',
    title: '1st incident',
    assignee: '',
    acknowledge: 'false',
    type: 'bug',
    updated_on: '2021-05-23T10:07:47.506Z',
    created_on: '2021-05-23T10:07:47.506Z',
  },
];

const deleteIncidentMockResp = {
  data: {
    id: '60aee6d1eece4442889630cd',
    message: 'Incident and its activity deleted successfully',
  },
};
const updateIncidentMockResp = {
  created_by: 'admin',
  id: '60aee5aceece4442889630c5',
  created_on: '2021-05-27T00:19:56.122Z',
  updated_on: '2021-05-27T03:29:31.556Z',
  description: 'description',
  status: 'inprogress',
  type: 'task',
  title: 'tetsing msg',
  assignee: 'admin',
  acknowledge: 'false',
  activity: {
    incident_status: [
      {
        from: 'analysis',
        to: 'inprogress',
        timestamp: '2021-05-27T03:29:31.528Z',
      },
      { from: '', to: 'analysis', timestamp: '2021-05-27T00:19:56.135Z' },
    ],
    incident_assignee: [
      { from: 'admin', to: 'admin', timestamp: '2021-05-27T00:19:56.136Z' },
    ],
  },
};

const createIncidentMockResp = {
  data: {
    id: '60af223e50fb1900940d8a8b',
    incident: {
      id: '60af223e50fb1900940d8a8b',
      created_by: 'admin',
      description: '',
      status: 'analysis',
      title: 'teting create',
      assignee: '',
      acknowledge: 'false',
      type: 'bug',
      updated_on: '2021-05-27T04:38:22.648Z',
      created_on: '2021-05-27T04:38:22.648Z',
    },
  },
};
export {
  IncidentDetailsMockResp,
  getIncidentListMockResp,
  deleteIncidentMockResp,
  updateIncidentMockResp,
  createIncidentMockResp,
};
