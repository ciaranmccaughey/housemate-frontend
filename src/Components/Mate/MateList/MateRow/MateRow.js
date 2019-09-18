import React from "react";

const MateRow = props => {
	const { mate } = props;

	return (
		<div className="expense-row-box" onClick={() => console.log(mate)}>
			<div className="expense-row-header">
				<div className="expense-row-container">
					<div>{mate.name}</div>
				</div>
			</div>
			
		</div>
	);
};

export default MateRow;
