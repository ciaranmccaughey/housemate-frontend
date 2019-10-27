import React from "react";
import { useAuth } from '../../../auth-wrapper';

const PaymentRow = props => {
	// props
	const { payment, expense, setPaymentPaid } = props;
	const { currencySymbol } = useAuth();

	let paymentDetails = (
		<div className="payments-payment-details">
			<div>{payment.user.name} <span style={{ color: "red" }}>owes</span> {expense.user.name}</div>
			<div>{currencySymbol}{payment.amount}</div>
		</div>
	);

	if (payment.paid == "t") {
		paymentDetails = (
			<div className="payments-payment-details">
				<div>{payment.user.name} <span style={{color: "green"}}>paid</span> {expense.user.name}</div>
				<div>{currencySymbol}{payment.amount}</div>
			</div>)
	}

	return (
		<div className="payment-row-box" onClick={() => setPaymentPaid(payment, payment.paid == "t")}>
			{paymentDetails}
		</div>
	);
};

export default PaymentRow;
