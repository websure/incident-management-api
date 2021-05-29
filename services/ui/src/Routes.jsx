import React, { useEffect, useRef } from 'react';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import PageRoute from './components/common/PageRoute';
import Incident from './components/incident';
import IncidentDetails from './components/incident/IncidentDetails';
import Login from './components/login';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

const Routes = () => (
  <Switch>
    <PageRoute exact path="/incident" component={Incident} />
    <PageRoute exact path="/incident/:id" component={IncidentDetails} />
    <PageRoute exact path="/login" component={Login} />
    <PageRoute exact path="/" component={Incident} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default withRouter(Routes);
