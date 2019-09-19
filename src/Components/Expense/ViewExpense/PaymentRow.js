import React from "react";

const PaymentRow = props => {
	// props
	const { payment, expense, setPaymentPaid } = props;

	let paymentDetails = (
		<div className="payments-payment-details">
			<div>{payment.user.name} owes {expense.user.name}</div>
			<div>£{payment.amount}</div>
		</div>
	);

	if (payment.paid == "t") {
		paymentDetails = (
			<div className="payments-payment-details">
				<div>{payment.user.name} paid {expense.user.name}</div>
				<div>£{payment.amount}</div>
			</div>)
	}

	return (
		<div className="payment-row-box" onClick={() => setPaymentPaid(payment, payment.paid == "t")}>
			{paymentDetails}
		</div>
	);
};

export default PaymentRow;
