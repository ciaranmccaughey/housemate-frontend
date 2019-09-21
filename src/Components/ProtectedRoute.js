import React, { useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login/Login';

import { useAuth } from '../auth-wrapper';

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  
  const { loading, isAuthenticated, loginWithRedirect } = useAuth();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props => isAuthenticated === true ? <Component {...props} /> : <Login />;

  return <Route path={path} render={render} {...rest} />;
}

export default ProtectedRoute;