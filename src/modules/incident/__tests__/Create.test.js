import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../../utils/TestServerSetup';
import IncidentModel from '../../../db/models/incident.model';
import IncidentActivityModel from '../../../db/models/incident.activity.model';

const request = supertest(app);

const CreateIncidentParams = {
  status: 'analysis',
  title: 'running test cases',
  description: '',
  type: 'bug',
  assignee: 'user1',
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

describe('Test Create Api', () => {
  it('return 401 if user is not admin', (done) => {
    request
      .post('/api/v1/incident/create')
      .expect({
        error: {},
        msg: 'Only admin can create/delete an incident',
      })
      .expect(401, done);
  });

  test('create an incident ', async () => {
    const post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', 'df34e.ffrh.mh7u8');

    const { incident } = post.body.data;
    const { status, title, created_by } = incident;
    expect(created_by).toEqual('admin');
    expect(status).toEqual('analysis');
    expect(title).toEqual('running test cases');
  });

  test('unauthorized user', async () => {
    await request
      .delete(`/api/v1/incident/abcd`)
      .set('Authorization', 'somewronguser')
      .expect({ msg: 'Only admin can create/delete an incident', error: {} });
  });
});
