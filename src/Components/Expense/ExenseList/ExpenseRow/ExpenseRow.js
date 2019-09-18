import React from "react";
import "./ExpenseRow.sass";

const ExpenseRow = props => {
	const { expense } = props;

	return (
		<div className="expense-row-box" onClick={() => console.log(expense)}>
			<div className="expense-row-header">
				<div className="expense-row-container">
					<div>{expense.name}</div>
				</div>
			</div>
			<div className="expense-row-container">
				<div className="expense-row-amount">£{expense.amount}</div>
				<div className="expense-row-users-name">{expense.user.name}</div>
			</div>

			<div className="bottom-container">
				<div className="expense-row-category">{expense.category.name}</div>
				<div className="expense-row-date">
					{expense.purchased_date
						.split(" ")[0]
						.split("-")
						.reverse()
						.join("-")}
				</div>
			</div>
			<div className="bottom-container">
				<div className="expense-row-comment">{expense.comment}</div>

			</div>

		</div>
	);
};

export default ExpenseRow;
