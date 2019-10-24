import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

import { AuthWrapper } from './auth-wrapper';

const Root = () => {

	return (
		<BrowserRouter basename="/app">
			<AuthWrapper >
				<Switch>
					<ProtectedRoute path="/" component={App} exact />
				</Switch>
			</AuthWrapper>
		</BrowserRouter>
	);
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
