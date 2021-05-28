import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../../utils/TestServerSetup';

const request = supertest(app);
const AdminToken = 'df34e.ffrh.mh7u8';
const GetIncidentListParams = {
  start_index: 0,
  max: 5,
  sortby: 'created_on',
  orderby: 'desc',
};

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

describe('Test Get list Api', () => {
  it('unauthorized user', async () => {
    request
      .post(`/api/v1/incident/`)
      .send(GetIncidentListParams)
      .set('Authorization', 'somewronguser')
      .expect({ msg: 'Only authorized users can access incidents', error: {} })
      .expect(401);
  });

  test('create and get incident List', async () => {
    const Post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', AdminToken);

    const { incident, id } = Post.body.data;
    const { status, title, created_by } = incident;

    let list = await request
      .post('/api/v1/incident/')
      .send(GetIncidentListParams)
      .set('Authorization', AdminToken);

    expect(list.body.data.length).toBe(1);
  });

  test('Get list - invalid Params error ', async () => {
    let list = await request
      .post('/api/v1/incident/')
      .send({ ...GetIncidentListParams, invalid: 'idontknow' })
      .set('Authorization', AdminToken)
      .expect({
        msg: 'Invalid Incident Object',
        error: '"invalid" is not allowed',
      })
      .expect(422);
  });
});
