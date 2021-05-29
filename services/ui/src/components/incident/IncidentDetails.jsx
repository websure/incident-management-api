/**
 * Show Incident details, activities
 * User can do - Delete, Update actions
 */
import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { Grid, Segment, Container, Icon, Message } from 'semantic-ui-react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import IncidentForm from './IncidentForm';
import useAsync from '../common/hoc/useAsync';
import ErrorBoundary, { ERROR_TYPES } from '../common/ErrorBoundary';
import IncidentApi from './Api';
import PageLayout from '../layout/PageLayout';
import Loader from '../common/Loader';
import { AppStateContext } from '../../store/AppStore';

const UPDATE_MSG = 'Incident updated Successfully.';
const DELETE_MSG = 'Incident deleted Successfully.';

const IncidentDetails = (props) => {
  const { history, match } = props;
  const { fetch, loading, data: asyncData, reset, error } = useAsync();
  const { updateData } = useContext(AppStateContext);

  const [activity, setActivity] = useState([]);
  const [data, setData] = useState(asyncData);
  console.log('details  ', props);
  const { id } = match?.params;
  useEffect(() => {
    if (id) {
      fetch(IncidentApi.getIncidentDetails(id));
    }
  }, [match?.params?.id]);

  useEffect(() => {
    setData(asyncData);
  }, [asyncData]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const {
        incident_assignee: assigneeActivity,
        incident_status: statusActivity,
      } = data.activity;
      const activityArr = [
        ...assigneeActivity.map((v) => ({
          ...v,
          formattedTimestamp: moment(v.timestamp).format('DD-MM-YYYY HH:MM:SS'),
          msg: `Incident assigned ${v.from && 'from'} ${v.from} ${v.to && 'to'
            } ${v.to}`,
        })),
        ...statusActivity.map((v) => ({
          ...v,
          formattedTimestamp: moment(v.timestamp).format('DD-MM-YYYY HH:MM:SS'),
          msg: `Incident status updated ${v.from && 'from'} ${v.from} ${v.to && 'to'
            } ${v.to}`,
        })),
      ].sort((a, b) => {
        if (a.formattedTimestamp > b.formattedTimestamp) return -1;
        if (a.formattedTimestamp < b.formattedTimestamp) return 1;
        return 0;
      });
      setActivity(activityArr);
    }
  }, [data]);

  const updateValues = (values) => {
    /**
     * Update incident
     */
    const { acknowledge, assignee, description, status, title, type } = values;

    fetch(
      IncidentApi.updateIncident(id, {
        acknowledge,
        assignee,
        description,
        status,
        title,
        type,
      }).then((res) => {
        updateData({
          successMsg: {
            msg: UPDATE_MSG,
            show: true,
          },
        });
        setData(res);
      }),
    );
  };

  const deleteIncident = (delId) => {
    IncidentApi.deleteIncident(delId).then((res) => {
      updateData({
        successMsg: {
          msg: DELETE_MSG,
          show: true,
        },
      });
      history.goBack();
    });
  };

  const showActivities = activity.map((act, i) => (
    <>
      <Segment key={`a_${act.timestamp}`} style={{ margin: 0 }}>
        <p>
          {act.formattedTimestamp} - {act.msg}
        </p>
      </Segment>
      {i !== activity.length - 1 && (
        <Icon
          name="long arrow alternate down"
          color="blue"
          style={{
            left: '50%',
            position: 'relative',
          }}
        />
      )}
    </>
  ));

  return (
    <PageLayout>
      <Grid padded data-id="detailsPage">
        <Grid.Row columns={2}>
          <Grid.Column largeScreen={10} computer={10} mobile={16}>
            <h4>Incident Details</h4>
            <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
              {data && (
                <IncidentForm
                  formValues={updateValues}
                  incidentDetails={data}
                  deleteIncident={deleteIncident}
                  loading={loading}
                  error={error}
                />
              )}
            </ErrorBoundary>
          </Grid.Column>
          <Grid.Column largeScreen={6} computer={6} mobile={16}>
            <h4>Incident Activity</h4>
            <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
              <Segment
                style={{
                  maxHeight: window.innerHeight - 180,
                  overflow: 'auto',
                }}
              >
                {activity.length > 0 && (
                  <Container id="activitySection">{showActivities}</Container>
                )}
              </Segment>
            </ErrorBoundary>
          </Grid.Column>
        </Grid.Row>
        {loading && <Loader />}
        {error && <span>Error in fetching Incident Details</span>}
      </Grid>
    </PageLayout>
  );
};

export default withRouter(IncidentDetails);
