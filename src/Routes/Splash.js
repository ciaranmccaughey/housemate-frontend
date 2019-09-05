import React, { useContext } from "react";
import Auth from '../HOC/Auth/Auth';
import Context from '../context';
import { Redirect } from 'react-router-dom';

const Splash = () => {

  const { state } = useContext(Context);

  return state.isAuth ? <Redirect to="/" /> : <Auth />;
};

export default Splash;
