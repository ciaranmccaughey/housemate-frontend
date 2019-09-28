import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
// import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";

const Back = props => {

    const { action } = props;

    return(
        <div className="back-icon">
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => action()} />
        </div>
    )


}

export default Back;