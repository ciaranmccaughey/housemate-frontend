import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Context from "./context";
import Splash from "./Routes/Splash";
import reducer from "./reducer";

import createAuth0Client from "@auth0/auth0-spa-js";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";

// A function that routes the user to the right place
// after login


const Root = () => {
	const initialState = useContext(Context);
	const [state, dispatch] = useReducer(reducer, initialState);

	const onRedirectCallback = appState => {
		window.history.replaceState({}, document.title, appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
	
	};

	return (
		<BrowserRouter>
			<Auth0Provider domain={config.domain} client_id={config.clientId} redirect_uri={window.location.origin} onRedirectCallback={onRedirectCallback}>
				<Switch>
					<ProtectedRoute path="/" component={App} exact />
				</Switch>
			</Auth0Provider>
		</BrowserRouter>
	);
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
