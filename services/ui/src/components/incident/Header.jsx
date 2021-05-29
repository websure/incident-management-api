/**
 * Show the header of the Dashboard
 * Includes heading, create Incident button and logout
 */

import React, { useState, useRef, useContext, useEffect } from 'react';
import { Grid, Button, Modal, Form, Icon, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import IncidentForm from './IncidentForm';
import IncidentApi from './Api';
import useAsync from '../common/hoc/useAsync';
import useTableReload from '../common/hoc/useTableReload';
import { AppStateContext } from '../../store/AppStore';

const MsgTxt = 'Incident created successfully';

const Header = ({ history }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [infoMsg, setInfoMsg] = useState(MsgTxt);
  const FormRef = useRef(null);
  const { StoreData, updateData } = useContext(AppStateContext);
  const { successMsg, errorMsg } = StoreData;
  const { fetch, loading, data, reset, error } = useAsync();
  const { updateTableState } = useTableReload();

  let currUSer = sessionStorage.getItem('currentUser') || null;
  currUSer = JSON.parse(currUSer);
  const isAdmin = currUSer?.userid === 'admin';

  useEffect(() => {
    const { msg, show: ShowSuccessInfo } = successMsg;
    setShowSuccessMsg(ShowSuccessInfo);
    const { msg: errMsg, show: ShowErrorInfo } = errorMsg;
    setShowSuccessMsg(ShowSuccessInfo);
    setInfoMsg(msg || errMsg || MsgTxt);
  }, [successMsg, errorMsg]);

  const closeMessInfo = () => {
    /**
     * close feedback message and update the context state
     */
    setTimeout(() => {
      updateData({
        successMsg: {
          msg: '',
          show: false,
        },
      });
      setShowSuccessMsg(false);
    }, 3000);
  };

  useEffect(() => {
    if (showSuccessMsg) {
      closeMessInfo();
    }
  }, [showSuccessMsg]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const formValues = (values) => {
    /**
     * Update incident
     */
    fetch(
      IncidentApi.createIncident(values).then(() => {
        closePopup();
        updateTableState(true);
        updateData({
          successMsg: {
            msg: 'Incident Created Successfully',
            show: true,
          },
        });
      }),
    );
  };

  const logout = () => {
    /**
     * clear session and redirect to login page
     */
    sessionStorage.clear();
    history.push('/login');
  };
  return (
    <Grid
      style={{
        borderBottom: '2px solid #e0e1e2',
      }}
    >
      <Grid.Row textAlign="left" verticalAlign="middle">
        <Grid.Column width={12}>
          <h4>
            Welcome to Incident Management
            {showSuccessMsg && (
              <Message
                compact
                floating
                success
                content={infoMsg}
                size="small"
                style={{
                  marginLeft: '2rem',
                }}
              />
            )}
          </h4>
        </Grid.Column>
        {isAdmin && (
          <Grid.Column floated="right" width={3}>
            <Button
              primary
              floated="right"
              compact
              title="Create Incident"
              onClick={() => setShowPopup(true)}
            >
              Create Incident
            </Button>
          </Grid.Column>
        )}

        <Grid.Column floated="right" width={1}>
          <Icon
            color="red"
            style={{
              cursor: 'pointer',
            }}
            title="Logout"
            name="sign-out"
            size="large"
            onClick={logout}
          />
        </Grid.Column>
      </Grid.Row>

      {showPopup && (
        <Modal
          onClose={() => setShowPopup(false)}
          open={showPopup}
          dimmer="blurring"
        >
          <Modal.Header>Add Incident</Modal.Header>
          <Modal.Content>
            <IncidentForm
              ref={FormRef}
              formValues={formValues}
              closePopup={closePopup}
              loading={loading}
              error={error}
            />
          </Modal.Content>
        </Modal>
      )}
    </Grid>
  );
};

export default withRouter(Header);
