import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import AddPayer from "./SelectPayer";

const FORM = 'form';
const ADD_PLAYER = 'addPayer';
const SPLIT = 'split';

const AddExpense = props => {
	
	const [expense, setExpense] = useState();
	const [view, setView] = useState("form");

	const addExpense = async values => {
		const postData = {
			action: "add",
			user_id: 7,
			group_id: props.group.id,
			...values
		};

		console.log(values);
		setExpense(values);
		setView(ADD_PLAYER);

		// const res = await axios.post("http://housem8.local/api/expense/index.php", postData);
		// const { data, success, message } = res.data;
		// if (success) {
		// 	// props.setView("list");
			// setView('addPayer');
		// 	if (props.expenses.length) {
		// 		props.setExpenses([...props.expenses, data]);
		// 	} else {
		// 		props.setExpenses([data]);
		// 	}
		// }
	};

	const setPayer = mate => {

		const expenseObj = expense;
		expenseObj.user_id = mate.id;
		setExpense(expenseObj);
		setView(SPLIT);


	}

	let render = null;
	if (view == FORM) {
		render = <ExpenseForm {...props} addExpense={addExpense} setView={setView} />;
	}

	if (view == ADD_PLAYER) {
		render = <AddPayer mates={props.group.users}  setPayer={setPayer} />
	}

	if (view == SPLIT) {
		render = <>split the bill</>
	}

	return (
		<div style={{ margin: "10px 10px 70px 10px" }}>
			{render}
		</div>
	);
};

export default AddExpense;
