import { createContext } from 'react';

const Context = createContext({
    currentUser: null,
    isAuth: true,
});

export default Context;
