import React from "react";
import './ViewExpense.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";


const ViewExpense = props => {
	console.log(props);

	const { expense } = props;

	let payments = null;

	if (expense.payments) {
		payments = expense.payments
			? expense.payments.map(payment => {
					let paymentDetails = (
						<div className="payments-payment-details">
							{payment.user.name} owes {expense.user.name}
						</div>
					);
					if (payment.user.id === expense.user.id) {
						return;
					}
					if (expense.paid == "t") {
						paymentDetails = <div className="payments-payment-details">{payment.user.name} paid</div>;
					}
					return (
						<div className="view-expense-box">
							{paymentDetails}
							<div>£{payment.amount}</div>
						</div>
					);
			  })
			: null;
	}

	return (
		<>
			<div className="list-container">
				<div className="expense-list-header" style={{ display: "flex" }}>
                    {/* <FontAwesomeIcon icon={faChevronLeft} onClick={() => console.log('clicked')} /> */}
					<div className="expense-list-title">Expense</div>
					<div className="expense-list-total">£{expense.amount}</div>
					<div className="expense-list-total">{expense.category.name}</div>
					<div className="expense-list-total">{expense.user.name}</div>
					<div className="expense-list-total">{expense.purchased_date.split(' ')[0].split('-').reverse().join('-')}</div>

				</div>
                <div className="payments-container">
                    {payments}
                </div>

                <button type="button" className="button is-danger">Delete</button>

			</div>
		</>
	);
};

export default ViewExpense;
