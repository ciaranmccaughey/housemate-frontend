import React from "react";
import "./ExpenseRow.sass";
import { useAuth } from "../../../../auth-wrapper";

const ExpenseRow = props => {
	const { expense, viewExpense } = props;
	const { currencySymbol } = useAuth();

	return (
		<div className="expense-row-box" onClick={() => viewExpense(expense)}>
			<div className="expense-row-header">
				<div className="expense-row-container">
					<div>{expense.name}</div>
				</div>
			</div>
			<div className="expense-row-container">
				<div className="expense-row-amount">{currencySymbol}{parseFloat(Math.round(expense.amount * 100) / 100).toFixed(2)}</div>
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
