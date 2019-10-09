import React, { useState } from "react";
import "./TaskList.sass";
import axios from "../../../axios-instance";
import TaskRow from "./TaskRow/TaskRow";

const TaskList = props => {
    const { tasks, user } = props;
    
    const [completedTasks, setCompletedTasks] = useState(tasks.length ? tasks.filter(task => task.completed == "t") : []);
    const [outstandingTasks, setOutstandingTasks] = useState(tasks.length ? tasks.filter(task => task.completed == "f") : []);

	const taskCompleteToggle = async (task, e) => {

        const completed = e.target.checked;
		const postData = {
			action: "complete",
			task_id: task.id,
			user_id: user.id,
			completed: completed
		};

		const res = await axios.post("task/index.php", postData);
		const { data, success, message } = res.data;

		if (success) {
            if (completed) {
                task.completed = 't';
                setCompletedTasks([...completedTasks, task])
                setOutstandingTasks(outstandingTasks.filter(outstandingTask => outstandingTask.id != task.id));

            } else {
                task.completed = 'f';
                setOutstandingTasks([...outstandingTasks, task])
                setCompletedTasks(completedTasks.filter(completedTask => completedTask.id != task.id));
            }
		}
	};

	return (
		<div style={{marginBottom: "100px"}}>
			<div className="expense-list-header" style={{ display: "flex" }}>
				<div className="expense-list-title">Tasks</div>
				<div className="expense-list-total">Add and complete tasks.</div>
			</div>

			{outstandingTasks ? (
				<div className="expense-row-list-container">
					{outstandingTasks.map(task => {
						return <TaskRow key={task.id} task={task} taskCompleteToggle={taskCompleteToggle} />;
					})}
				</div>
			) : null}

			{completedTasks ? (
				<div className="expense-row-list-container">
					{completedTasks.map(task => {
						return <TaskRow key={task.id} task={task} taskCompleteToggle={taskCompleteToggle} />;
					})}
				</div>
			) : null}
		</div>
	);
};

export default TaskList;
