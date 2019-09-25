import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import GroupNameForm from "./GroupNameForm";
import { useAuth } from '../../auth-wrapper';
import axios from '../../axios-instance';

const GroupSettings = props => {

	const { group } = props;
	const { user } = useAuth();


	const deleteGroup = async () => {
		
		const postData = {
			action: 'delete',
			group_id: group.id,
		}

		const res = await axios.post("group/index.php", postData);
		const { data, success, message } = res.data;

		if (success) {
			// remove this group
		}
	}

	const leaveGroup = async () => {
		
		const postData = {
			action: 'leave',
			group_id: group.id,
			user_id: user.id,
		}

		const res = await axios.post("group/index.php", postData);
		const { data, success, message } = res.data;

		console.log(data);
		if (success) {
			// leave the group
		}
	}
	
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			Settings
            <GroupNameForm group={group} />

            <button type="submit" className="button is-link" style={{ margin: "10px 5%", width: "90%" }} onClick={() => leaveGroup()}>
				Leave Group
			</button>
            {group.created_by_user_id === user.id ? <button type="submit" className="button is-link" style={{ margin: "10px 5%", width: "90%" }} onClick={() => deleteGroup()}>
				Delete Group
			</button> : null}
		</div>
	);
};

export default GroupSettings;
