/**
 * Incident Form
 * Populates controls for Incident creation.
 * Prepopulates controls for incident Update.
 * Return updated values to consumer
 */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Button,
  Modal,
  Form as SemanticForm,
  Message,
  Confirm,
} from 'semantic-ui-react';
import {
  Form,
  Input,
  Dropdown,
  TextArea,
} from 'semantic-ui-react-form-validator';

import {
  FORM_MODE,
  STATUS_OPTIONS,
  USERS,
  ACKNOWLEDGE,
  INCIDENT_TYPE,
} from './constants.js';

import WithAudit from '../common/audit/index';

const IncidentForm = forwardRef(
  (
    {
      incidentId,
      formValues,
      closePopup,
      incidentDetails = {},
      history,
      location,
      deleteIncident,
      loading = false,
      error = false,
    },
    ref,
  ) => {
    const FormRef = useRef(null);
    const DefaultFormStates = {
      title: '',
      description: '',
      status: STATUS_OPTIONS.ANALYSIS,
      assignee: '',
      created_by: 'admin',
      acknowledge: false,
      type: '',
    };
    let currUSer = sessionStorage.getItem('currentUser') || null;
    currUSer = JSON.parse(currUSer);
    const isAdmin = currUSer?.userid === 'admin';

    /* states */
    const [formMode, setFormMode] = useState(
      incidentDetails?.incident ? FORM_MODE.EDIT : FORM_MODE.NEW,
    );
    const [showPopup, setShowPopup] = useState(false);
    /* form states */
    const [formDetails, setFormDetails] = useState(DefaultFormStates);

    useEffect(() => {
      if (incidentDetails?.incident) {
        setFormDetails(incidentDetails.incident);
        setFormMode(FORM_MODE.EDIT);
      }
    }, [incidentDetails]);

    /**
     * Generate form data
     */
    const StatusOptions = Object.values(STATUS_OPTIONS).map((v) => ({
      key: v,
      text: v.toUpperCase(),
      value: v,
    }));

    const AssigneeOptions = USERS.map(({ userid }) => ({
      key: userid,
      text: userid.toUpperCase(),
      value: userid,
    }));

    const IncidentTypeOptions = Object.values(INCIDENT_TYPE).map((v) => ({
      key: v,
      text: v.toUpperCase(),
      value: v,
    }));

    useImperativeHandle(ref, () => ({
      incidentValues: formDetails,
    }));

    const onSubmit = () => {
      formValues(formDetails);
    };

    const handleChange = ({ name, value }) => {
      setFormDetails({
        ...formDetails,
        [name]: value,
      });
    };

    const showListPage = () => history.push('/incident');

    const deleteInc = () => {
      setShowPopup(false);
      deleteIncident(formDetails.id);
    };

    const showCreateActionBtns = (
      <>
        {isAdmin && (
          <WithAudit
            dataid="createIncidentButton"
            dataaudit={{
              desc: 'creating new Incident',
            }}
            type="click"
          >
            <Button primary floated="right" title="Add Incident" type="submit">
              Create Incident
            </Button>
          </WithAudit>
        )}

        <Button floated="right" title="Cancel" onClick={closePopup}>
          Cancel
        </Button>
      </>
    );

    const showEditActionBtns = (
      <>
        <Button title="Cancel" onClick={showListPage}>
          Go back
        </Button>
        <WithAudit
          dataid="SaveIncidentButton"
          dataaudit={{
            desc: 'Updating Incident',
          }}
          type="click"
        >
          <Button primary title="Save Incident" type="submit" loading={loading}>
            Save Incident
          </Button>
        </WithAudit>
        {isAdmin && (
          <WithAudit
            dataid="DeleteIncidentButton"
            dataaudit={{
              desc: 'Delete Incident',
            }}
            type="click"
          >
            <Button
              title="Delete Incident"
              color="red"
              onClick={() => setShowPopup(true)}
            >
              Delete
            </Button>
          </WithAudit>
        )}
      </>
    );
    return (
      <>
        <Form ref={FormRef} onSubmit={onSubmit} data-id="incidentForm">
          <Dropdown
            fluid
            label="Incident Type"
            selection
            value={formDetails.type}
            options={IncidentTypeOptions}
            name="type"
            onChange={(e, data) => handleChange(data)}
            validators={['required']}
            errorMessages={['this field is required']}
          />

          <Input
            fluid
            label="Incident Title"
            placeholder="Title"
            value={formDetails.title}
            name="title"
            onChange={(e, data) => handleChange(data)}
            validators={['required']}
            errorMessages={['Title field is required']}
            autoComplete="off"
          />

          <TextArea
            style={{
              width: '75%',
            }}
            label="Description"
            placeholder="Add Description"
            value={formDetails.description}
            name="description"
            onChange={(e, data) => handleChange(data)}
            validators={['maxStringLength:1000']}
            errorMessages={['1000 is the maximum allowed size']}
            autoComplete="off"
            rows={2}
          />
          <Dropdown
            fluid
            label="Status"
            selection
            value={formDetails.status}
            disabled={formMode === FORM_MODE.NEW}
            // defaultValue={STATUS_OPTIONS.ANALYSIS}
            options={StatusOptions}
            name="status"
            onChange={(e, data) => handleChange(data)}
          />

          <Dropdown
            fluid
            label="Assignee"
            value={formDetails.assignee}
            selection
            options={AssigneeOptions}
            name="assignee"
            onChange={(e, data) => handleChange(data)}
          />
          <Input
            fluid
            disabled
            label="Created By"
            name="created_by"
            value={formDetails.created_by}
            onChange={(e, data) => handleChange(data)}
          />

          <SemanticForm.Group inline>
            <SemanticForm.Field>Acknowledge</SemanticForm.Field>
            <SemanticForm.Radio
              id="ack"
              label="True"
              value
              readOnly={formMode === FORM_MODE.NEW}
              checked={formDetails.acknowledge}
              name="acknowledge"
              onChange={(e, data) => handleChange(data)}
            />
            <SemanticForm.Radio
              label="False"
              value={false}
              readOnly={formMode === FORM_MODE.NEW}
              checked={!formDetails.acknowledge}
              name="acknowledge"
              onChange={(e, data) => handleChange(data)}
            />
          </SemanticForm.Group>
          <div
            style={{
              padding: '2rem .5rem',
            }}
          >
            {formMode === FORM_MODE.NEW && showCreateActionBtns}

            {formMode === FORM_MODE.EDIT && showEditActionBtns}
          </div>
        </Form>

        <Confirm
          open={showPopup}
          content="Are you sure to delete this incident ?"
          cancelButton="No"
          confirmButton="Yes"
          onCancel={() => setShowPopup(false)}
          onConfirm={deleteInc}
        />
      </>
    );
  },
);

export default withRouter(IncidentForm);
