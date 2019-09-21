import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import GroupNameForm from "./GroupNameForm";

const GroupSettings = props => {

    const { group } = props;
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			Settings
            <GroupNameForm group={group} />

            <button type="submit" className="button is-link" style={{ margin: "10px 5%", width: "90%" }}>
				Leave Group
			</button>
            <button type="submit" className="button is-link" style={{ margin: "10px 5%", width: "90%" }}>
				Delete Group
			</button>
		</div>
	);
};

export default GroupSettings;
