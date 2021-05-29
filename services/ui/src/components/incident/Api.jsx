/*
  Api methods for Incident
*/
import Api from '../../services/Api';

const IncidentApi = {
  getIncidentDetails: (id) => Api.get(`/incident/${id}`),
  getIncidentList: (params) => Api.post('/incident/', params),
  deleteIncident: (id) => Api.delete(`/incident/${id}`),
  updateIncident: (id, params) => Api.put(`/incident/${id}`, params),
  createIncident: (params) => Api.post('/incident/create', params),
};

export default IncidentApi;
