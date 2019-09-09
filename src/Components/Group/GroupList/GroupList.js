import React from "react";
import GroupRow from "./GroupRow/GroupRow";

const GroupList = props => {
	return (
		<>
			{props.groups.length ? (
				<>
					{props.groups.map(group => (
						<GroupRow key={group.id} group={group} showArea={props.showArea} groupSelected={() => props.groupSelected(group)}/>
					))}
				</>
			) : null}
			<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				{!props.groups.length ? <h2>Try adding a group</h2> : null}
				<button className="button is-link" onClick={() => props.showArea("add")}>
					Add Group
				</button>
			</div>
		</>
	);
};

export default GroupList;
