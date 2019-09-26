import React from "react";
import "./App.sass";
import Group from "./HOC/Group/Group";
import { useAuth } from './auth-wrapper';
import AddName from "./Components/AddName/AddName";


function App() {
	const { loading, user, logout, setUser } = useAuth();

	return (
		<div>
		{!user.name ? <AddName setUser={setUser} user={user}/> : <Group user={user} />}
		</div>

	);
}

export default App;
