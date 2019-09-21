import React, { useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login/Login';

import { useAuth } from '../auth-wrapper';
import Auth from '../HOC/Auth/Auth';

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  
  const { loading, isAuthenticated } = useAuth();

  const render = props => isAuthenticated === true ? <Component {...props} /> : <Auth />;

  return <Route path={path} render={render} {...rest} />;
}

export default ProtectedRoute;