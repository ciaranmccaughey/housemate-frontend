import React from "react";
import GroupRow from "./GroupRow/GroupRow";

const GroupList = props => {
	return (
		<div style={{ display: "flex", flexDirection: "column"}}>
			<div className="list-container">
				<div className="expense-list-header" style={{ display: "flex" }}>
					<div className="expense-list-title">Your Groups</div>
				</div>
				{props.groups.length ? (
					<>
						{props.groups.map(group => (
							<GroupRow key={group.id} group={group} showArea={props.showArea} groupSelected={() => props.groupSelected(group)} />
						))}
					</>
				) : null}
			</div>

			<div>
				<button className="button is-link floating-button" onClick={() => props.showArea("add")}>
					Add Group
				</button>
			</div>
		</div>
	);
};

export default GroupList;
