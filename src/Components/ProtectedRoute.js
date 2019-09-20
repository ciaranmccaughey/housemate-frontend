import React, { useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../context';
import { useAuth0 } from "../react-auth0-wrapper";
const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

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

  console.log('isAuthenticated', isAuthenticated);
  

  const render = props => isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
}

export default ProtectedRoute;