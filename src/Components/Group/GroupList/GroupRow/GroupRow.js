import React from "react";

const GroupRow = ({ group, groupSelected }) => {
	return (
		<div className="box" style={{margin: "10px 10px"}} onClick={() => groupSelected(group)}>
			<h1>{group.name}</h1>
		</div>
	);
};

export default GroupRow;
