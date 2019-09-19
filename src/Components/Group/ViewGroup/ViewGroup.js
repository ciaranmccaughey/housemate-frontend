import React, { useState, useEffect, useContext } from "react";
import Nav from "../../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import Expense from "../../Expense/Expense";
import axios from "axios";
import Mate from "../../Mate/Mate";
import "./ViewGroup.sass";

const ViewGroup = props => {
	const { group, showArea, categories, addMateToGroup } = props;
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

	// calculate the total expenses
	let totalExpenses = 0;
	if (expenses) {
		expenses.forEach(expense => {
			totalExpenses += +expense.amount;
		});
	}
	totalExpenses = (Math.round(totalExpenses * 100) / 100).toFixed(2);

	// calculate what you owe
	let youHaveSpent = 0;
	if (expenses) {
		expenses.forEach(expense => {
			// TODO: change user_id below, get from logged in user
			if (expense.user_id == 7) {
				youHaveSpent += +expense.amount;
			}
		});
	}
	youHaveSpent = (Math.round(youHaveSpent * 100) / 100).toFixed(2);

	// calculate what you owe
	let youOwe = 0;
	if (expenses) {
		expenses.forEach(expense => {
			// TODO: change user_id below, get from logged in user
			if (expense.payments) {
				expense.payments.forEach(payment => {
					if (payment.user_id == 7) {
						if (payment.user_id != expense.user_id) {
							if (payment.paid == "f") {
								youOwe += +payment.amount;
							}
						}
					}
				});
			}
		});
	}
	youOwe = (Math.round(youOwe * 100) / 100).toFixed(2);

	// calculate what you are owed
	let youAreOwed = 0;
	if (expenses) {
		expenses.forEach(expense => {
			// TODO: change user_id below, get from logged in user
			if (expense.payments) {
				expense.payments.forEach(payment => {
					// TODO: change 7 to logged in user_id
					if (expense.user_id == 7) {
						if (payment.user_id != expense.user_id) {
							if (payment.paid == "f") {
								youAreOwed += +payment.amount;
							}
						}
					}
				});
			}
		});
	}
	youAreOwed = (Math.round(youAreOwed * 100) / 100).toFixed(2);

	// calculate what you were paid back
	let youWerePaidBack = 0;
	if (expenses) {
		expenses.forEach(expense => {
			if (expense.payments) {
				expense.payments.forEach(payment => {
					// TODO: change 7 to logged in user_id
					if (expense.user_id == 7) {
						if (payment.user_id != expense.user_id) {
							if (payment.paid == "t") {
								youWerePaidBack += +payment.amount;
							}
						}
					}
				});
			}
		});
	}
	youWerePaidBack = (Math.round(youWerePaidBack * 100) / 100).toFixed(2);

	let render = null;
	if (view === "overview") {
		render = (
			<div>
				<div className="expense-list-header" style={{ display: "flex" }}>
					<div className="expense-list-title">My Group</div>
					<div className="expense-list-total">Total: ${totalExpenses}</div>
					<div className="expense-list-total">You have spent: ${youHaveSpent}</div>
					<div className="expense-list-total">You owe: ${youOwe}</div>
					<div className="expense-list-total">You are owed: ${youAreOwed}</div>
					<div className="expense-list-total">You were paid back: ${youWerePaidBack}</div>
					<div className="expense-list-filter-container">
						{/* <div className="expense-list-filter-title">m8s</div> */}
						{/* {props.group.users ? props.group.users.map(mate => <div className="expense-list-filter-mate">{mate.name}</div>) : null} */}
					</div>
				</div>
			</div>
		);
	}

	if (view === "expenses") {
		render = <Expense categories={categories} group={group} expenses={expenses} setExpenses={setExpenses} totalExpenses={totalExpenses} />;
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
