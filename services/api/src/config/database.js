import mongoose from 'mongoose';
import constants from './constants';

//Removes the warning with promises
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const dbConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Connect the db with the url provided
try {
  mongoose.connect(constants.MONGO_URL, dbConnectionOptions);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, dbConnectionOptions);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running at ', constants.MONGO_URL))
  .on('error', (e) => {
    throw e;
  });
