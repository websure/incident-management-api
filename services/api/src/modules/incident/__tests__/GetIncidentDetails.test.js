import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../../utils/TestServerSetup';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';

const request = supertest(app);
const AdminToken = 'df34e.ffrh.mh7u8';

const CreateIncidentParams = {
  status: 'analysis',
  title: 'running test cases',
  description: '',
  type: 'bug',
  assignee: 'admin',
  created_by: '',
};

beforeEach((done) => {
  mongoose.connect(
    'mongodb://localhost:27017/incident-management-test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done(),
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe('Test Get incident Details Api', () => {
  it('unauthorized user', async () => {
    const Post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', AdminToken);

    const { incident, id } = Post.body.data;
    const { status, title, created_by } = incident;

    request
      .get(`/api/v1/incident/${id}`)
      .set('Authorization', 'somewronguser')
      .expect({ msg: 'Only authorized users can access incidents', error: {} })
      .expect(401);
  });

  test('create and get incident detail', async () => {
    const Post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', AdminToken);

    const { incident, id } = Post.body.data;
    const { status, title, created_by } = incident;

    let detail = await request
      .get(`/api/v1/incident/${id}`)
      .set('Authorization', AdminToken);
    const { id: detail_Id, incident: detail_incident, activity } = detail.body;
    expect(detail_Id).toBe(id);
    expect(activity.incident_status.length).toEqual(1);
    expect(activity.incident_assignee.length).toEqual(1);
    expect(detail_incident.acknowledge).toBe('false');
  });
});
