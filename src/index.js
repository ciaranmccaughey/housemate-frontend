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

const Root = () => {
	const initialState = useContext(Context);
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<BrowserRouter>
			<Context.Provider value={{ state, dispatch }}>
				<Switch>
					<Route path="/login" component={Splash} />
					<ProtectedRoute path="/" component={App} exact />
				</Switch>
			</Context.Provider>
		</BrowserRouter>
	);
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
