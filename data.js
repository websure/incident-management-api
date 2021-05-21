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
