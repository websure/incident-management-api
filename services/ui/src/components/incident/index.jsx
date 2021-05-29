import React from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBoundary, { ERROR_TYPES } from '../common/ErrorBoundary';

import PageLayout from '../layout/PageLayout';
import IncidentTable from './IncidentTable';

const Incident = (props) => (
  <PageLayout>
    <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
      <IncidentTable {...props} />
    </ErrorBoundary>
  </PageLayout>
);

export default withRouter(Incident);
