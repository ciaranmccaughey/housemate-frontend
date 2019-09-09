import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

class AddExpense extends Component {

    constructor(props) {
        super(props);
    }

    addExpense = values => {
        console.log(values);
    }

	render() {
		return (
			<div>
				<Formik
					initialValues={{ name: "", amount: "", comment: ""}}
					onSubmit={(values, { setSubmitting }) => {
						this.addExpense(values, setSubmitting)
					}}
					// validationSchema={Yup.object().shape({
					// 	email: Yup.string()
					// 		.email()
					// 		.required("Required")
					// })}
				>
					{props => {
						const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
						return (
							<form onSubmit={handleSubmit}>
								<div className="field">
									<label className="label" htmlFor="email">
										Expense Name
									</label>
									<div className="control">
										<input
											id="name"
											placeholder="Enter your expense"
											type="text"
											value={values.name}
											onChange={handleChange}
											onBlur={handleBlur}
											className="input"
										/>
									</div>
								</div>

                                <div className="field">
									<label className="label" htmlFor="email">
										Amount ($)
									</label>
									<div className="control">
										<input
											id="amount"
											placeholder="Enter your Amount"
											type="text"
											value={values.amount}
											onChange={handleChange}
											onBlur={handleBlur}
											className="input"
										/>
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
										<input
											id="date"
                                            component="date"
											placeholder="Additional Comments"
											type="date"
											value={values.date}
											onChange={handleChange}
											onBlur={handleBlur}
											className="date"
										/>
									</div>
								</div>

								<button type="submit" className="button is-link" disabled={isSubmitting}>
									Submit
								</button>
							</form>
						);
					}}
				</Formik>
			</div>
		);
	}
}

export default AddExpense;
