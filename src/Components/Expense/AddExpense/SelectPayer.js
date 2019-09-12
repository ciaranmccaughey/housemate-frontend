import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';

const SelectPayer = ({ mates, setPayer }) => {
    
	const [ selected, setSelected ] = useState(0);
	
	return (
		<>
		<h1>Who paid?</h1>
			{mates
				? mates.map((mate, index) => {
						return (
							<div className="box" onClick={() => setSelected(index)}>
								<div style={{display: 'flex', justifyContent: 'space-between',}}>
									<div style={ index == selected ? {color: 'green', fontSize: '20px'} : {}}><FontAwesomeIcon icon={faCheckCircle} /></div>
									<div style={ index == selected ? {fontWeight: 'bold'} : {}}>{mate.name}</div>
								</div>
							</div>
						);
				  })
				: null}

				<button type="submit" className="button is-link" style={{width: "100%"}} onClick={() => setPayer(mates[selected])} >
					Next
				</button>
		</>
	);
};

export default SelectPayer;
