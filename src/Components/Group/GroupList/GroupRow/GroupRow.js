import React from "react";

const GroupRow = ({ group, groupSelected }) => {
	return (
		<div className="expense-row-box"  onClick={() => groupSelected(group)}>
			<div className="expense-row-header">
				<div className="expense-row-container">
					<div>{group.name}</div>
				</div>
			</div>
		</div>
	);
};

export default GroupRow;
