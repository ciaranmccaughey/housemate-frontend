import React from "react";
import "./App.sass";
import Group from "./HOC/Group/Group";
import { useAuth } from './auth-wrapper';

function App() {
	const { loading, user, logout, setUser } = useAuth();

	return (
		<div>
			<Group user={user} />
		</div>

	);
}

export default App;
