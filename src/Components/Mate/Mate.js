import React, { useState } from 'react';
import AddMate from './AddMate/AddMate';
import MateList from './MateList/MateList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import ViewMate from './ViewMate/ViewMate';
import { useAuth } from '../../auth-wrapper';
import Back from '../Back/Back';

const Mate = props => {

    const { group, addMateToGroup, onRemoveMate } = props;

    const { user } = useAuth();

    const [ view, setView ] = useState('list');
    const [ mate, setMate ] = useState(null);


    const viewMate = mate => {
        setMate(mate);
        setView('view');
    }


    let render = null;
    if (view === 'list') {
        render = <MateList mates={group.users} viewMate={viewMate} user={user}/>
    }
    if (view === 'add') {
        render = <AddMate group={group} addMateToGroup={addMateToGroup} setView={setView} />
    }
    if (view === 'view') {
        render = <ViewMate mate={mate} setView={setView} {...props} />
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {view === 'add' || view == 'view' ? <Back action={() => setView('list')}/> : null}

            {view !== 'add' ? <button className="button is-link floating-button" style={{ margin: "0 2%"}} onClick={() => setView('add')}><FontAwesomeIcon icon={faPlus} /></button> : null}
            {render}
        </div>
    )
}

export default Mate;