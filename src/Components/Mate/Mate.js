import React, { useState } from 'react';
import AddMate from './AddMate/AddMate';
import MateList from './MateList/MateList';

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
            {view != 'add' ? <button className="button is-link" style={{ margin: "0 2%"}} onClick={() => setView('add')}>Add m8</button> : null}
            {render}
        </div>
    )
}

export default Mate;