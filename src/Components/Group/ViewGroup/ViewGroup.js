import React, { useState } from 'react';
import Nav from '../../Nav/Nav';
import './ViewGroup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';



const ViewGroup = ({ group, showArea }) => {

    const [ view, setView ] = useState('overview');

    let render = null;
    if (view === 'overview') {
        render = <div>Overview</div>
    }

    if (view === 'expenses') {
        render = <div>Expenses</div>
    }

    if (view === 'm8s') {
        render = <div>m8s</div>
    }

    return(
        <div>
            <div className="header-container">
                    <div className="back-icon">
                        <FontAwesomeIcon icon={faChevronLeft} onClick={() => showArea('list')}/>
                    </div>
                    <span className="header-title">{group.name}</span>
                    <div className="back-icon">
                        <FontAwesomeIcon icon={faCog} />
                    </div>
            </div>

            <div>
                {render}
            </div>

			<Nav view={view} setView={setView} />

        </div>
    )
}


export default ViewGroup;