import React from "react";

const MateRow = props => {
	const { mate, viewMate } = props;

	return (
		<div className="expense-row-box" onClick={() => viewMate(mate)}>
			<div className="expense-row-header">
				<div className="expense-row-container">
					<div>{mate.name}</div>
				</div>
			</div>
			
		</div>
	);
};

export default MateRow;
