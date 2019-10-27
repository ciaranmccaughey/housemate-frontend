import React, { useState, useEffect, useContext } from "react";
import axios from './axios-instance';
import Modal from "./Components/Modal/Modal";
// import { DotLoader } from 'react-spinners';
// import { css } from '@emotion/core';
 
export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthWrapper = ({ children }) => {

// state
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [loading, setLoading] = useState(true);

  // modal
  const [modalState, setModalState] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modelProceed, setModalProceed] = useState();


  
  useEffect(() => {
    const initAuth = async () => {

      const token = localStorage.getItem('tokenhousem8');
      
      if (token) {

        const user = await getUserFromToken();

        if (user) {
          setUser(user);
          setCurrencySymbol(user.currency_symbol);
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }
      }


      if (isAuthenticated) {
        const { user, token} = await createOrGetUserAndToken();
        localStorage.setItem('tokenhousem8', token);
        setUser(user);
        setCurrencySymbol(user.currency_symbol);
      }

    };
    initAuth();

    // eslint-disable-next-line
  }, []);


  const createOrGetUserAndToken = async user => {
    
    // const res = await axios.post('auth/index.php', {action: 'login', email: user.email});
    // const { data } = res.data;


    // return data;
  }

  const getUserFromToken = async () => {
    
    const res = await axios.post('auth/index.php', {action: 'get_user'});
    const { data } = res.data;
    
    return data;
  }

  const loginSubmit = async values => {
    
    const postData = {
			...values,
			action: "login"
		};

		const res = await axios.post("auth/index.php", postData);
    const { data, success, message } = res.data;

		if (success) {

      const { user, token } = data;
      localStorage.setItem('tokenhousem8', token);

      setUser(user);
      setCurrencySymbol(user.currency_symbol);
      setIsAuthenticated(true);
      setLoading(false);

    }
    return success;
  };
  

  const signupSubmit = async values => {
		const postData = {
			...values,
			action: "signup"
		};
    const res = await axios.post("auth/index.php", postData);
    const { data, success, message } = res.data;
    
    return {success, message};

  };
  
  const logout = () => {
    localStorage.setItem('tokenhousem8', '');
    setIsAuthenticated(false);

  }

  const showModal = (title, message, proceed) => {
    setModalState(true);
    setModalTitle(title);
    setModalMessage(message);
    setModalProceed(proceed);
  }



  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        currencySymbol,
        loading,
        logout,
        loginSubmit,
        signupSubmit,
        showModal
      }}
    >
      {children}
      <Modal 
            closeModal={() => setModalState(false)} 
            modalState={modalState} 
            proceed={modelProceed}
            title={modalTitle}
          >
          {modalMessage}
          </Modal>
    </AuthContext.Provider>
  );
};
