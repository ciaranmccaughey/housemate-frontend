import React, { useState, useContext } from "react";
import Signup from "../../Components/Signup/Signup";
import Login from "../../Components/Login/Login";
import logo from "../../images/logo.png";

const Auth = () => {
	const [showScreen, setShowScreen] = useState("login");
	const [email, setEmail] = useState("");

	return (
		<>
			<div style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "20px"}}>
				<img src={logo} style={{maxWidth: "100px", maxHeight: "100px"}}/>
			</div>
			<div className="tabs is-centered" >
				<ul>
					<li onClick={() => setShowScreen("login")} className={showScreen == "login" ? "is-active" : null}>
						<a>Login</a>
					</li>
					<li onClick={() => setShowScreen("signup")} className={showScreen == "signup" ? "is-active" : null}>
						<a>Signup</a>
					</li>
				</ul>
			</div>

			{showScreen == "login" ? <Login email={email} /> : <Signup setEmail={setEmail} setShowScreen={setShowScreen} />}
		</>
	);
};

export default Auth;
