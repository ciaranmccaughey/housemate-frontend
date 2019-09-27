import React from "react";
import MateRow from "./MateRow/MateRow";

const MateList = props => {
	const { mates } = props;

	return (
		<div >
			<div className="expense-list-header" style={{ display: "flex" }}>
				<div className="expense-list-title">m8s</div>
				<div className="expense-list-total">Add a m8</div>
			</div>
			{mates ? (
				<div className="expense-row-list-container">
					{mates.map(mate => (
						<MateRow key={mate.id} mate={mate} />
					))}
				</div>
			) : null}
		</div>
	);
};

export default MateList;
