import React from "react";
import GroupRow from "./GroupRow/GroupRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useAuth } from "../../../auth-wrapper";

const GroupList = props => {

	const { logout } = useAuth();
	return (
		<div style={{ display: "flex", flexDirection: "column"}}>
					<button type="button" onClick={() => logout()}>Logout</button>

			<div className="list-container" onClick={() => console.log('clicked')}>
				<div className="expense-list-header" style={{ display: "flex" }}>
					<div className="expense-list-title" >Your Groups</div>
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
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>
		</div>
	);
};

export default GroupList;
