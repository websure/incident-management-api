/**
 * Login page
 * On success - save details in session storage
 * On success - Redirects to incident list page
 */
import React, { useEffect, useState } from 'react';
import { Grid, Button, Message, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react-form-validator';

import useAsync from '../common/hoc/useAsync';
import UserApi from './Api';

const Login = ({ history }) => {
  const [formDetails, setFormDetails] = useState({ userid: '', password: '' });

  const { fetch, loading, data, reset, error } = useAsync();

  const submit = () => {
    fetch(UserApi.login(formDetails));
  };

  useEffect(() => {
    /**
     * save user details in session storage
     */
    if (data && Object.keys(data).length > 0) {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      sessionStorage.setItem('token', data.token);
      history.push('/incident');
    }
  }, [data]);

  const handleChange = ({ name, value }) => {
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <Grid
      padded
      data-id="pagelayout"
      style={{
        top: '20%',
      }}
    >
      <Grid.Row>
        <Grid.Column width={10}>
          <h4>Welcome to Incident Management Dashboard </h4>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={6} verticalAlign="middle">
          <Segment>
            {error && (
              <Message
                error
                content="Either User Name or Password is incorrect."
              />
            )}
            <Form onSubmit={submit} className="loginForm">
              <Input
                fluid
                label="User Name"
                placeholder="User Name"
                value={formDetails.userid}
                name="userid"
                onChange={(e, val) => handleChange(val)}
                validators={['required']}
                errorMessages={['User Name is required']}
                autoComplete="off"
              />

              <Input
                fluid
                label="Password"
                placeholder="Password"
                value={formDetails.password}
                name="password"
                onChange={(e, val) => handleChange(val)}
                validators={['required']}
                errorMessages={['Password is required']}
                type="password"
                autoComplete="off"
              />

              <Button
                type="submit"
                primary
                compact
                loading={loading}
                style={{
                  display: 'table',
                  margin: '10px auto',
                }}
              >
                Login
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default withRouter(Login);
