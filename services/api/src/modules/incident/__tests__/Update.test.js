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

let UpdateIncidentParams = {
  description: 'desx',
  status: 'inprogress',
  title: 'updating 2nd incident',
  assignee: 'admin',
  type: 'bug',
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

describe('Test Update Api', () => {
  it('unauthorized user', async () => {
    let Post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', AdminToken);

    request
      .put(`/api/v1/incident/${Post.body.data.id}`)
      .send(UpdateIncidentParams)
      .set('Authorization', 'somewronguser')
      .expect({ msg: 'Only authorized users can access incidents', error: {} })
      .expect(401);
  });

  test('invalid update params user', async () => {
    let Post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', AdminToken);

    let invalidObj = { ...UpdateIncidentParams };
    invalidObj['invalidPropr'] = 'junk value';
    await request
      .put(`/api/v1/incident/${Post.body.data.id}`)
      .send(invalidObj)
      .set('Authorization', AdminToken)
      .expect({
        msg: 'Invalid Incident Object',
        error: '"invalidPropr" is not allowed',
      });
  });

  test('acknowledge error on incident Update ', async () => {
    let Post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', AdminToken);

    let ackObj = {
      ...UpdateIncidentParams,
      title: 'updating Title test',
      acknowledge: false,
    };

    const User1_Token = 'abdgc.uyih.khi7y';
    await request
      .put(`/api/v1/incident/${Post.body.data.id}`)
      .send(ackObj)
      .set('Authorization', User1_Token)
      .expect({
        msg: 'error in updating incident',
        error: 'Only assignee can acknowledge the Incident',
      });
  });

  test('incident Update ', async () => {
    let Post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', AdminToken);
    const { type, status } = Post.body.data.incident;

    let UpdateObj = await request
      .put(`/api/v1/incident/${Post.body.data.id}`)
      .send({ status, type, title: 'updating Title test' })
      .set('Authorization', AdminToken);
    console.log('---UpdateObj.body ', UpdateObj.body);
    const { status: newStatus, title: newTitle, created_by } = UpdateObj.body;
    expect(created_by).toEqual('admin');
    expect(newStatus).toEqual('analysis');
    expect(newTitle).toEqual('updating Title test');
  });
});
