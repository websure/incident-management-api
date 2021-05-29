const FORM_MODE = {
  EDIT: 'edit',
  NEW: 'new',
};

const STATUS_OPTIONS = {
  ANALYSIS: 'analysis',
  INPROGRESS: 'inprogress',
  DONE: 'done',
  CLOSE: 'close',
};

const STATUS_COLOR = {
  ANALYSIS: 'orangered',
  INPROGRESS: '#FFBF00',
  DONE: '#4BB543',
  CLOSE: '#4BB543',
};

const USERS = [
  {
    userid: 'admin',
    isadmin: true,
    token: 'df34e.ffrh.mh7u8',
  },
  {
    userid: 'user1',
    isadmin: false,
    token: 'abdgc.uyih.khi7y',
  },
  {
    userid: 'user2',
    isadmin: false,
    token: 'frt53.oifh.hg6tr',
  },
];

const ACKNOWLEDGE = {
  TRUE: true,
  FALSE: false,
};

const INCIDENT_TYPE = {
  BUG: 'bug',
  TASK: 'task',
  STORY: 'story',
};

export {
  FORM_MODE,
  STATUS_OPTIONS,
  USERS,
  ACKNOWLEDGE,
  INCIDENT_TYPE,
  STATUS_COLOR,
};
