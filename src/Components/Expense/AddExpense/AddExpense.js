import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import ExpenseList from "../ExenseList/ExpenseList";

const AddExpense = props => {
	
	const addExpense = async values => {

		const postData = {
            action: 'add',
            user_id: 7,
            group_id: props.group.id,
            ...values
        }
		const res = await axios.post('http://housem8.local/api/expense/index.php', postData)
        const { data, success, message } = res.data;
        if (success) {
			props.setView('list');
			
			if (props.expenses.length) {
				props.setExpenses([...props.expenses, data])
			} else {
				props.setExpenses([data])

			}
        }
	};


	return (
		<div>
			<Formik
				initialValues={{ name: "", amount: "", comment: "", category_id: "", purchased_date: "" }}
				onSubmit={(values, { setSubmitting }) => {
					addExpense(values, setSubmitting);
				}}
				// validationSchema={Yup.object().shape({
				// 	email: Yup.string()
				// 		.email()
				// 		.required("Required")
				// })}
			>
				{formikProps => { 
					const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = formikProps;
					return (
						<form onSubmit={handleSubmit}>
							<div className="field">
								<label className="label" htmlFor="email">
									Expense Name
								</label>
								<div className="control">
									<input id="name" placeholder="Enter your expense" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} className="input" />
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Amount ($)
								</label>
								<div className="control">
									<input id="amount" placeholder="Enter your Amount" type="text" value={values.amount} onChange={handleChange} onBlur={handleBlur} className="input" />
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Category
								</label>
								<div className="select">
									<select name="category_id" value={values.color} onChange={handleChange} onBlur={handleBlur} style={{ display: "block" }}>
										<option value="" label="Select a Category" />
										{props.categories.map(category => (
											<option key={category.id} value={category.id} label={category.name} />
										))}

									</select>
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Comment
								</label>
								<div className="control">
									<textarea
										id="comment"
										component="textarea"
										placeholder="Additional Comments"
										type="textarea"
										value={values.comment}
										onChange={handleChange}
										onBlur={handleBlur}
										className="textarea"
									/>
								</div>
							</div>

							<div className="field">
								<label className="label" htmlFor="email">
									Date Expensed
								</label>
								<div input="control">
									<input id="purchased_date" component="date" placeholder="Additional Comments" type="date" value={values.purchased_date} onChange={handleChange} onBlur={handleBlur} className="date" />
								</div>
							</div>

							<button type="submit" className="button is-link" 
							// disabled={isSubmitting}
							>
								Submit
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default AddExpense;