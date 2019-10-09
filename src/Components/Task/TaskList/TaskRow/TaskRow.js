import React from 'react';

const TaskRow = ({ task, taskCompleteToggle }) => {

    return (<div className="expense-row-box">
                <div className="expense-row-header">
                    <div className="expense-row-container">
                        <div>
                        <label class="container">
                            <input type="checkbox" defaultChecked={task.completed == 't' ? true : false} onChange={(e) => taskCompleteToggle(task, e)} />
                            <span className="checkmark"></span>
                        </label>
                        </div>
                        <div>{task.name}</div>
                    </div>
                </div>
            </div>)

}

export default TaskRow;