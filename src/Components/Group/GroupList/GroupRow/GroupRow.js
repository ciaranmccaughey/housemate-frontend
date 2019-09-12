import React from "react";

const GroupRow = ({ group, groupSelected }) => {
	return (
		<div id="group-container" className="box" style={{margin: "10px 10px"}} onClick={() => groupSelected(group)}>
			<h1 id="group-heading">{group.name}</h1>
		</div>
	);
};

export default GroupRow;
