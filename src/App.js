import React from "react";
import "./App.sass";

import Signup from "./Components/Signup/Signup";
import Group from "./HOC/Group/Group";
import Nav from "./Components/Nav/Nav";

function App() {
	return (
		<div>
			<Group />
		</div>
	);
}

export default App;
