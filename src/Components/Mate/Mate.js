import React, { useState } from 'react';
import AddMate from './AddMate/AddMate';
import MateList from './MateList/MateList';

const Mate = props => {

    const { group } = props;

    console.log(props)

    const [ view, setView ] = useState('list');
    const [ mates, setMates ] = useState([...group.users]);
    

    let render = null;

    if (view == 'list') {
        render = <MateList mates={mates} />
    }

    if (view == 'add') {
        render = <AddMate group={group} mates={mates} setMates={setMates} setView={setView} />
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {view != 'add' ? <button className="button is-link" style={{ margin: "0 2%"}} onClick={() => setView('add')}>Add m8</button> : null}
            {render}
        </div>
    )
}

export default Mate;