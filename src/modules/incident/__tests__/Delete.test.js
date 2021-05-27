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
  it('return 401 if user is not admin', (done) => {
    DeleteIncident()
      .expect({
        error: {},
        msg: 'Only admin can create/delete an incident',
      })
      .expect(401, done);
  });

  test('create and delete an invalid incident ', async () => {
    try {
      let incidentId = '';
      const post = await request
        .post('/api/v1/incident/create')
        .send(CreateIncidentParams)
        .set('Authorization', 'df34e.ffrh.mh7u8');
      // .then((err, res) => {
      //   incidentId = res.body.id;
      // });
      console.log('000incidentId ', post.body);
      await request
        .delete(`/api/v1/incident/${post.body.data.id}`)
        .set('Authorization', 'df34e.ffrh.mh7u8')
        .expect({
          id: post.body.data.id,
          message: 'Incident and its activity deleted successfully',
        });
    } catch (e) {
      console.log('error');
      console.log(e);
    }

    // DeleteIncident()
    //   .set('Authorization', 'df34e.ffrh.mh7u8')
    //   .expect({
    //     id: '60afb08fa32420609c98ccb5',
    //     message: 'Incident and its activity deleted successfully',
    //   })
    //   .expect(200, done);
  });
});
