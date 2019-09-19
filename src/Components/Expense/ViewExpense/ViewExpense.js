import React from "react";
import './ViewExpense.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import PaymentRow from './PaymentRow';
import axios from "axios";

const ViewExpense = props => {
	console.log(props);

	// props
	const { expenses, expense, setExpenses } = props;


	const setPaymentPaid = async (payment, paid) => {


		const postData = {
			action: 'set_paid',
			paid: paid ? 'f' : 't',
			payment_id: payment.id
		}

		// update the database
		const res = await axios.post("http://housem8.local/api/expense/index.php", postData);
		const { data, success, message } = res.data;

		if (success) {

			// update the payment on the expenses array
			const updatedExpenses = expenses.map(exp => {
				if (expense.id === exp.id) {
					exp.payments = exp.payments.map(paymentBefore => {
						if (paymentBefore.id === payment.id) {
							payment.paid = paid ? 'f' : 't';
							console.log('payment.paid', payment.paid);
							
							return payment;
						}
						return paymentBefore;
					})
				}
				return exp;
			});
			setExpenses(updatedExpenses);

		}


	}


	let payments = null;
	if (expense.payments) {
		payments = expense.payments
			? expense.payments.map(payment => {
				if (payment.user.id !== expense.user.id) {
					return <PaymentRow payment={payment} expense={expense} setPaymentPaid={setPaymentPaid} />
				}
			  })
			: null;
	}

	return (
		<>
			<div className="list-container">
				<div className="expense-list-header" style={{ display: "flex" }}>
                    {/* <FontAwesomeIcon icon={faChevronLeft} onClick={() => console.log('clicked')} /> */}
					<div className="expense-list-title">Expense</div>
					<div className="expense-list-total">£{parseFloat(Math.round(expense.amount * 100) / 100).toFixed(2)}</div>
					<div className="expense-list-total">{expense.category.name}</div>
					<div className="expense-list-total">{expense.user.name}</div>
					<div className="expense-list-total">{expense.purchased_date.split(' ')[0].split('-').reverse().join('-')}</div>

				</div>
                <div className="payments-container">
                    {payments}
                </div>

                <button type="button" className="button is-link" style={{ width: "90%", margin: "40px 5%"}}>Delete</button>
				
			</div>

			
		</>
	);
};

export default ViewExpense;
