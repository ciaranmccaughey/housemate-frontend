import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import GroupNameForm from "./GroupNameForm";
import { useAuth } from '../../auth-wrapper';
import axios from '../../axios-instance';
import Modal from "../Modal/Modal";

const GroupSettings = props => {

	const { group, onDeleteGroup, onLeaveGroup, onGroupNameChange } = props;
	const { user, showModal } = useAuth();


	const deleteGroup = async () => {

		const postData = {
			action: 'delete',
			group_id: group.id,
		}

		const res = await axios.post("group/index.php", postData);
		const { data, success, message } = res.data;

		if (success) {
			// remove this group
			onDeleteGroup(group);
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

		if (success) {
			// leave the group
			onLeaveGroup(group);

		}

	}
	
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			Settings
            <GroupNameForm group={group} onGroupNameChange={onGroupNameChange} />

            <button type="submit" className="button is-link" style={{ margin: "10px 5%", width: "90%" }} onClick={() => showModal('Leave Group', 'Are you sure you want to leave this group?', () => leaveGroup)}>
				Leave Group
			</button>
            {group.created_by_user_id === user.id ? <button type="submit" className="button is-link" style={{ margin: "10px 5%", width: "90%" }} onClick={() => showModal('Delete Group', 'Are you sure you want to delete this group?', () => deleteGroup)}>
				Delete Group
			</button> : null}
		</div>
	);
};

export default GroupSettings;
