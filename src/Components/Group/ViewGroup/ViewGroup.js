import React, { useState, useEffect, useContext } from "react";
import Nav from "../../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import Expense from "../../Expense/Expense";
import axios from "axios";
import Mate from "../../Mate/Mate";
import "./ViewGroup.sass";

// import Context from '../../../context';

const ViewGroup = ({ group, showArea, categories, addMateToGroup }) => {
	const [view, setView] = useState("overview");
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		getExpenses();
	}, []);

	const getExpenses = async () => {
		const res = await axios.get("http://housem8.local/api/expense/index.php?action=getExpenses&group_id=" + group.id);

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				setExpenses(data);
			}
		}
	};

	let render = null;
	if (view === "overview") {
		render = (
			<div>
				<div className="expense-list-header" style={{ display: "flex" }}>
					<div className="expense-list-title">My Group</div>
					<div className="expense-list-total">Total: $200</div>
					<div className="expense-list-filter-container">
						{/* <div className="expense-list-filter-title">m8s</div> */}
						{/* {props.group.users ? props.group.users.map(mate => <div className="expense-list-filter-mate">{mate.name}</div>) : null} */}
					</div>
				</div>
			</div>
		);
	}

	if (view === "expenses") {
		render = <Expense categories={categories} group={group} expenses={expenses} setExpenses={setExpenses} />;
	}

	if (view === "m8s") {
		render = <Mate group={group} addMateToGroup={addMateToGroup} />;
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
