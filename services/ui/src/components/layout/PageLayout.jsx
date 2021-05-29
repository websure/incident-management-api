import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import {
  Grid,
  Button,
  Modal,
  Form as SemanticForm,
  Message,
} from 'semantic-ui-react';
import ErrorBoundary, { ERROR_TYPES } from '../common/ErrorBoundary';
import Header from '../incident/Header';

const PageLayout = ({ children, ...rest }) => (
  <Grid padded data-id="pagelayout">
    <Grid.Column width={16}>
      <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
        <Header />
      </ErrorBoundary>
    </Grid.Column>
    <Grid.Column width={16} style={{ padding: '0px' }}>
      <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>{children}</ErrorBoundary>
    </Grid.Column>
  </Grid>
);

export default withRouter(PageLayout);
