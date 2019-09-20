import React from "react";
import "./App.sass";
import Group from "./HOC/Group/Group";
import { useAuth0 } from "./react-auth0-wrapper";
import AddName from "./Components/AddName/AddName";

function App() {
	const { loading, user, logout, setUser } = useAuth0();

	console.log("user", user);

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<button onClick={() => logout()}>logout</button>

			{!user.name ? <AddName setUser={setUser} user={user}/> : <Group user={user} />}
		</div>
	);
}

export default App;
