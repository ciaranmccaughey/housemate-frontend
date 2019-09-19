import React from "react";
import './GroupRow.sass';

const GroupRow = ({ group, groupSelected }) => {
	return (
		<div className="group-row-box"  onClick={() => groupSelected(group)}>
			<div className="expense-row-header">
				<div className="expense-row-container">
					<div>{group.name}</div>
				</div>
			</div>
		</div>
	);
};

export default GroupRow;
