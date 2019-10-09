import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { useAuth } from '../../auth-wrapper';
import Back from '../Back/Back';
import AddTask from './AddTask/AddTask';
import TaskList from './TaskList/TaskList';

const Task = props => {

    const { group, tasks } = props;
    const { user } = useAuth();

    const [view, setView] = useState('list');

    let render = null;
    if (view == 'list') {
        render = <TaskList tasks={tasks} user={user} />

    }
    if (view == 'add') {
        render = <AddTask user={user} {...props} setView={setView} />
    }
    if (view == 'view') {
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {view == 'add' ? <Back action={() => setView('list')}/> : null}

            {view != 'add' ? <button className="button is-link floating-button" style={{ margin: "0 2%"}} onClick={() => setView('add')}><FontAwesomeIcon icon={faPlus} /></button> : null}
            {render}
        </div>
    )
}

export default Task;