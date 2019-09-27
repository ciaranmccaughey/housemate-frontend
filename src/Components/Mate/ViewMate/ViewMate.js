import React from "react";
import { useAuth } from "../../../auth-wrapper";
import axios from '../../../axios-instance';

const ViewMate = props => {

    const { mate, group, onRemoveMate, setView } = props;
    const { showModal } = useAuth();

    const removeMate = async () => {
		
		const postData = {
			action: 'remove',
			group_id: group.id,
			mate_id: mate.id,
		}

		const res = await axios.post("mate/index.php", postData);
        const { data, success, message } = res.data;
        
        console.log(res.data);

		if (success) {
			// leave the group
			onRemoveMate(mate, group);
            setView('list');
		}

	}

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div className="expense-list-header" style={{ display: "flex" }}>
				<div className="expense-list-title">Update your m8</div>
				<div className="expense-list-total">Change you m8 settings here.</div>
			</div>

			<div style={{marginTop: "200px"}}>
				<button
					type="submit"
					className="button is-danger"
					style={{ margin: "10px 5%", width: "90%" }}
					onClick={() => showModal("Remove m8", "Are you sure you want to remove your m8 from this group?", () => removeMate)}
				>
					Remove m8
				</button>
			</div>
		</div>
	);
};

export default ViewMate;
