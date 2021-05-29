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

const DeleteIncident = () => {
  return request.delete('/api/v1/incident/60afb08fa32420609c98ccb5');
};

const CreateIncident = () => {
  return request.post('/api/v1/incident/create');
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

describe('Test Delete Api', () => {
  test('return 401 if user is not admin', (done) => {
    DeleteIncident()
      .expect({
        error: {},
        msg: 'Only admin can create/delete an incident',
      })
      .expect(401, done);
  });

  test('create and delete an valid incident ', async () => {
    const post = await request
      .post('/api/v1/incident/create')
      .send(CreateIncidentParams)
      .set('Authorization', 'df34e.ffrh.mh7u8');
    await request
      .delete(`/api/v1/incident/${post.body.data.id}`)
      .set('Authorization', 'df34e.ffrh.mh7u8')
      .expect({
        data: {
          id: post.body.data.id,
          message: 'Incident and its activity deleted successfully',
        },
      });
  });

  test('delete an invalid incident id', async () => {
    await request
      .delete(`/api/v1/incident/abcd`)
      .set('Authorization', 'df34e.ffrh.mh7u8')
      .expect({
        msg: 'Invalid Incident Object',
        error: 'It must have a valid ObjectId.',
      });
  });
});
