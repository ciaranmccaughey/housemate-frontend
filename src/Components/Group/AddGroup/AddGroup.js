import React, { useState } from "react";
import axios from 'axios';

const AddGroup = props => {

    const [name, setName] = useState("");
    

    const onAddGroup = async () => {

        const postData = {
            action: 'create',
            user_id: 7,
            name: name
        }
        const res = await axios.post('http://housem8.local/api/group/index.php', postData)
        const { data, success, message } = res.data;
        if (success) {
			// update groups state
			props.showArea("list");
			props.addGroup({id: data.id, name: name});
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
