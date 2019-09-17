import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import AddPayer from "./SelectPayer";
import Split from "./Split/Split";

const FORM = 'form';
const ADD_PLAYER = 'addPayer';
const SPLIT = 'split';

const AddExpense = props => {
	
	const [expense, setExpense] = useState();
	const [view, setAddExpenseView] = useState(FORM);

	const addExpenseDetails = async (values, submit) => {
		setExpense(values);

		if (submit) {

			const postData = {
				action: "add",
				user_id: 7,
				group_id: props.group.id,
				expense: {...values, user_id: 7}
			};

			const res = await axios.post("http://housem8.local/api/expense/index.php", postData);
			const { data, success, message } = res.data;
			console.log(data);
			console.log('sucessss matteeeee');
			if (props.expenses.length) {
				props.setExpenses([...props.expenses, data]);
			} else {
				props.setExpenses([data]);
			}
			props.setView("list");


		} else {
			setAddExpenseView(ADD_PLAYER);
		}
	};

	const setPayer = mate => {
		const expenseObj = expense;
		expenseObj.user_id = mate.id;
		setExpense(expenseObj);
		setAddExpenseView(SPLIT);
	}

	const addExpense = async mates => {

		const amount = (Math.round((expense.amount / mates.length) * 100) / 100).toFixed(2);
		const userIds = mates.map(mate => mate.id)

		const postData = {
			action: "add",
			user_id: 7,
			group_id: props.group.id,
			expense: expense,
			amountSplit: amount,
			userIds: userIds
		};

		const res = await axios.post("http://housem8.local/api/expense/index.php", postData);
		const { data, success, message } = res.data;

		console.log(data);
		if (success) {

			console.log('sucessss matteeeee');
			if (props.expenses.length) {
				props.setExpenses([...props.expenses, data]);
			} else {
				props.setExpenses([data]);
			}

			props.setView("list");
		}
	}

	let render = null;
	if (view == FORM) {
		render = <ExpenseForm {...props} addExpenseDetails={addExpenseDetails} setView={setAddExpenseView} />;
	}

	if (view == ADD_PLAYER) {
		render = <AddPayer mates={props.group.users}  setPayer={setPayer} />
	}

	if (view == SPLIT) {
		render = <Split mates={props.group.users} expense={expense} addExpense={addExpense} />
	}

	return (
		<div style={{ margin: "10px 10px 70px 10px" }}>
			{render}
		</div>
	);
};

export default AddExpense;
