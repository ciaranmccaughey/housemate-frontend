import React, { useState, useEffect, useContext } from "react";
import Nav from "../../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import Expense from "../../Expense/Expense";
import axios from "../../../axios-instance";
import Mate from "../../Mate/Mate";
import "./ViewGroup.sass";
import { useAuth } from "../../../auth-wrapper";
import GroupSettings from "../../GroupSettings/GroupSettings";
import GroupOverview from "../GroupOverview/GroupOverview";


const ViewGroup = props => {

	const { user } = useAuth();

	const { group, showArea, categories, addMateToGroup, onRemoveMate } = props;
	const [view, setView] = useState("overview");
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		getExpenses();
	}, []);

	const getExpenses = async () => {
		const res = await axios.get("expense/index.php?action=getExpenses&group_id=" + group.id);

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				setExpenses(data);
			}
		}
	};

	// calculate the total expenses
	let totalExpenses = 0;
	if (expenses) {
		expenses.forEach(expense => {
			totalExpenses += +expense.amount;
		});
	}
	totalExpenses = (Math.round(totalExpenses * 100) / 100).toFixed(2);

	

	let render = null;
	if (view === "overview") {
		render = <GroupOverview expenses={expenses} user={user} group={group} totalExpenses={totalExpenses} />
	}

	if (view === "expenses") {
		render = <Expense categories={categories} group={group} expenses={expenses} setExpenses={setExpenses} totalExpenses={totalExpenses} />;
	}

	if (view === "m8s") {
		render = <Mate group={group} addMateToGroup={addMateToGroup} onRemoveMate={onRemoveMate}/>;
	}

	if (view === "settings") {
		render = <GroupSettings group={group} {...props}/>;
	}
	return (
		<div>
			{false ? (
				<div className="header-container">
					<div className="back-icon">
						<FontAwesomeIcon icon={faChevronLeft} onClick={() => showArea("list")} />
					</div>
					<span className="header-title">{group.name}</span>
					<div className="back-icon">
						<FontAwesomeIcon icon={faCog} />
					</div>
				</div>
			) : null}

			<div className="app-bg">{render}</div>

			<Nav view={view} setView={setView} />
		</div>
	);
};

export default ViewGroup;
