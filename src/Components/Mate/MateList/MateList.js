import React from "react";
import MateRow from "./MateRow/MateRow";

const MateList = props => {
	const { mates, viewMate, user } = props;

	return (
		<div >
			<div className="expense-list-header" style={{ display: "flex" }}>
				<div className="expense-list-title">m8s</div>
				<div className="expense-list-total">Add a m8</div>
			</div>
			{mates ? (
				<div className="expense-row-list-container">
					{mates.map(mate => {
						if (mate.id != user.id) {
							return <MateRow key={mate.id} mate={mate} viewMate={viewMate} />;
						}
					})}
				</div>
			) : null}
		</div>
	);
};

export default MateList;
