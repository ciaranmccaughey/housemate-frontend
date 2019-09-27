import React from "react";
import Group from "../../../HOC/Group/Group";
import "./GroupView.sass";

const GroupOverview = props => {
	const { expenses, user, group, totalExpenses } = props;

	// calculate what you owe
	let youHaveSpent = 0;
	if (expenses) {
		expenses.forEach(expense => {
			if (expense.user_id == user.id) {
				youHaveSpent += +expense.amount;
			}
		});
	}
	youHaveSpent = (Math.round(youHaveSpent * 100) / 100).toFixed(2);

	// calculate what you owe
	let youOwe = 0;
	if (expenses) {
		expenses.forEach(expense => {
			if (expense.payments) {
				expense.payments.forEach(payment => {
					if (payment.user_id == user.id) {
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
			if (expense.payments) {
				expense.payments.forEach(payment => {
					if (expense.user_id == user.id) {
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
					if (expense.user_id == user.id) {
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

	return (
		<div>
			<div className="group-view-header" style={{ display: "flex" }}>
				<div className="group-view-name">{group.name}</div>
				<div className="group-view-total-container">
					<div>Total</div>
					<div>${totalExpenses}</div>
				</div>
				<div>
					<div className="group-view-container">
						<div className="group-view-row-box">
							<div className="group-box-title">You have spent</div>
							<div className="group-box-content-container">
								<div className="group-box-text">This is the total of what you have spent while in this group.</div>
								<div className="group-box-amount">
									<span style={{ fontSize: "10px" }}>£</span>
									{youHaveSpent}
								</div>
							</div>
						</div>
						<div className="group-view-row-box">
							<div className="group-box-title">You owe</div>
							<div className="group-box-content-container">
								<div className="group-box-text">This is the total of what you have spent while in this group.</div>
								<div className="group-box-amount">
									<span style={{ fontSize: "10px" }}>£</span>
									{youOwe}
								</div>
							</div>
						</div>
						<div className="group-view-row-box">
							<div className="group-box-title">You are owed</div>
							<div className="group-box-content-container">
								<div className="group-box-text">This is the total of what you have spent while in this group.</div>
								<div className="group-box-amount">
									<span style={{ fontSize: "10px" }}>£</span>
									{youAreOwed}
								</div>
							</div>
						</div>

						<div className="group-view-row-box">
							<div className="group-box-title">You were paid back</div>
							<div className="group-box-content-container">
								<div className="group-box-text">This is the total of what you have spent while in this group.</div>
								<div className="group-box-amount">
									<span style={{ fontSize: "10px" }}>£</span>
									{youWerePaidBack}
								</div>
							</div>
						</div>
					</div>
					<div className="recent-tasks-box">
						<div className="recent-tasks-title">Recent Tasks Added</div>
						<div className="recent-tasks-content-container">
							<div className="recent-tasks-content">
								<label className="myCheckbox">
									<input type="checkbox"></input>
									<span></span>
								</label>
							</div>
							<div className="recent-tasks-content">Empty the bins</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupOverview;
