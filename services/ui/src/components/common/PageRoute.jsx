import React, { useEffect, useRef } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Login from '../login';

const PageRoute = (props) => {
  const { component: Component, path, ...rest } = props;
  const token = sessionStorage.getItem('token');
  return (
    <Route
      exact
      {...rest}
      render={(routeProps) => {
        if (path === '/login') return <Login />;
        if (token) return <Component {...routeProps} />;
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PageRoute;
