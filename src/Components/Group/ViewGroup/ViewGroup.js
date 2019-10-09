import React, { useState, useEffect, useContext } from "react";
import axios from "../../../axios-instance";
import { useAuth } from "../../../auth-wrapper";

// components
import Nav from "../../Nav/Nav";
import Expense from "../../Expense/Expense";
import Task from "../../Task/Task";
import Mate from "../../Mate/Mate";
import Back from "../../Back/Back";

import GroupSettings from "../../GroupSettings/GroupSettings";
import GroupOverview from "../GroupOverview/GroupOverview";

import "./ViewGroup.sass";

const ViewGroup = props => {

	const { user } = useAuth();

	const { group, showArea, categories } = props;
	const [view, setView] = useState("overview");
	const [expenses, setExpenses] = useState([]);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		getExpenses();
		getTasks();
	}, []);

	const getExpenses = async () => {
		const res = await axios.get("expense/index.php?action=getExpenses&group_id=" + group.id);

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				setExpenses(data);
			}
		}
	};

	const getTasks = async () => {
		const res = await axios.get("task/index.php?action=getTasks&group_id=" + group.id);
		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				setTasks(data);
			}
		}
	};

	const addTaskToGroup = task => {
		if (tasks.length) {
			setTasks([...tasks, task]);
		} else {
			setTasks([task]);
		}
	}

	const setTasksCompleted = task => {

	}

	// calculate the total expenses
	let totalExpenses = 0;
	if (expenses) {
		expenses.forEach(expense => {
			totalExpenses += +expense.amount;
		});
	}
	totalExpenses = (Math.round(totalExpenses * 100) / 100).toFixed(2);

	

	let render = null;
	if (view === "overview") {
		render = <GroupOverview expenses={expenses} user={user} group={group} totalExpenses={totalExpenses} tasks={tasks} />
	}

	if (view === "expenses") {
		render = <Expense categories={categories} group={group} expenses={expenses} setExpenses={setExpenses} totalExpenses={totalExpenses} />;
	}

	if (view === "tasks") {
		render = <Task group={group} tasks={tasks} {...props} addTaskToGroup={addTaskToGroup} />;
	}

	if (view === "m8s") {
		render = <Mate group={group} {...props} />;
	}

	if (view === "settings") {
		render = <GroupSettings group={group} {...props}/>;
	}
	return (
		<div>
			{view == "overview" ? <Back action={() => showArea('list')}/> : null}

			<div className="app-bg">{render}</div>

			<Nav view={view} setView={setView} />
		</div>
	);
};

export default ViewGroup;
