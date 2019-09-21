import React, { useState } from "react";
import axios from '../../../axios-instance';
import { useAuth } from '../../../auth-wrapper';

const AddGroup = props => {

	const { user } = useAuth();
    const [name, setName] = useState("");
    

    const onAddGroup = async () => {

        const postData = {
            action: 'create',
            name: name
        }
        const res = await axios.post('group/index.php', postData)
		const { data, success, message } = res.data;
		
        if (success) {
			// update groups state
			props.showArea("list");
			props.addGroup({id: data.id, name: name, users: [user]});
            // return to main app
        }
    }

	return (
		<div className="container is-flex" style={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
			<div className="">
				<div className="field">
					<label className="label">Name</label>
					<div className="control">
						<input className="input" type="name" placeholder="Group name" value={name} onChange={(event) => {setName(event.target.value)}} name="name" />
					</div>
				</div>

				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link" onClick={onAddGroup}>Add Group</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddGroup;
