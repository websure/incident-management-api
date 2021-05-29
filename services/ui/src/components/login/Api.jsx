/*
  Api methods for User
*/
import Api from '../../services/Api';

const USerApi = {
  login: (params) => Api.post('/user/login', params),
};

export default USerApi;
