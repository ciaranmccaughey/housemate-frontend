import React, { useState } from 'react';
import AddMate from './AddMate/AddMate';
import MateList from './MateList/MateList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

const Mate = props => {

    const { group, addMateToGroup } = props;

    const [ view, setView ] = useState('list');


    let render = null;

    if (view == 'list') {
        render = <MateList mates={group.users} />
    }

    if (view == 'add') {
        render = <AddMate group={group} addMateToGroup={addMateToGroup} setView={setView} />
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {view != 'add' ? <button className="button is-link floating-button" style={{ margin: "0 2%"}} onClick={() => setView('add')}><FontAwesomeIcon icon={faPlus} /></button> : null}
            {render}
        </div>
    )
}

export default Mate;