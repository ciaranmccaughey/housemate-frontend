import React, { useState } from "react";
import { useAuth } from '../../auth-wrapper';
import axios from '../../axios-instance';
import Back from "../Back/Back";
import UserSettingsForm from "./UserSettingsForm";

const UserSettings = props => {

	const { showArea } = props;
	const { user, showModal, logout } = useAuth();


	const deleteAccount = async () => {

		const postData = {
			action: 'delete_account',
			id: user.id
		};
		const res = await axios.post('user/index.php', postData)
        const { data, success, message } = res.data;

        if (success) {
            logout();
        }
	}


	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
            <Back action={() => showArea('list')} />
			<div className="expense-list-header" style={{display: 'flex'}}>
				<div className="expense-list-title">Settings</div>
				<div className="expense-list-total">Change your user settings here.</div>
			</div>

			<div className="expense-render-container">

                <button type="submit" className="button is-warning"  style={{width: "100%", marginTop: "15px"}} onClick={() => logout()}>
                    Logout
                </button>

                <button type="submit" className="button is-danger"  style={{width: "100%", marginTop: "15px"}} onClick={() => showModal("Delete account", "Are you sure you want to delete your account?", () => deleteAccount)}>
                    Delete Account
                </button>

                <UserSettingsForm user={user} />

			</div>

		</div>
	);
};

export default UserSettings;
