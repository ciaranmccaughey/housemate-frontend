import React from 'react';

const GroupList = props => {

    return(
        <>
            {props.groups.length ?
            <h1>list of grouos</h1>
            :
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <h2>Try adding a group</h2>
                    <button className="button is-link" onClick={() => props.showArea('add')}>Add Group</button>
                </div>
            }
        </>
    )

}

export default GroupList;