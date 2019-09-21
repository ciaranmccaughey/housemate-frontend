import React, { useState, useContext } from "react";
import Signup from "../../Components/Signup/Signup";
import Login from "../../Components/Login/Login";
import Context from "../../context";
import { Redirect } from 'react-router-dom';

const Auth = () => {

    const { state, dispatch } = useContext(Context);
	const [showScreen, setShowScreen] = useState("login");
	const [email, setEmail] = useState("");

    return (
		<>
			<div className="tabs is-centered" style={{ marginTop: "5em" }}>
				<ul>
					<li onClick={() => setShowScreen("login")} className={showScreen == "login" ? "is-active" : null}>
						<a>Login</a>
					</li>
					<li onClick={() => setShowScreen("signup")} className={showScreen == "signup" ? "is-active" : null}>
						<a>Signup</a>
					</li>
				</ul>
			</div>

			{showScreen == "login" ? <Login /> : <Signup setEmail={setEmail} setShowScreen={setShowScreen} />}

		</>
	);
};

export default Auth;
