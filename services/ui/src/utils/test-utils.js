/**
 * Setup for tests.
 * Including State context Router wrapper
 */
import React from 'react';
import { render as rtlrender } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import StoreProvider from '../store/AppStore';

const history = createMemoryHistory({ initialEntries: ['/incident/1234'] });
// mocking user
const user = {
  isadmin: true,
  password: 'admin',
  token: 'df34e.ffrh.mh7u8',
  userid: 'admin',
};

sessionStorage.setItem('currentUser', JSON.stringify(user));
sessionStorage.setItem('token', user.token);

const AllTheProviders = ({ children, ...rest }) => (
  <StoreProvider>
    <Router history={history} {...rest}>
      <Route path="/incident/:id">{children}</Route>
    </Router>
  </StoreProvider>
);

const customRender = (
  ui,
  options,
  // options?: Omit<RenderOptions, 'queries'>,
) =>
  // const RouteWrapper = <Router history={history}>{ui}</Router>;

  rtlrender(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
