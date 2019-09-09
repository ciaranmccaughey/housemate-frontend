import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavItem.sass";


const NavItem = props => {
	
    return (
		<li className="navbar-item">
			<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} onClick={props.setView}>
				<FontAwesomeIcon icon={props.icon} style={{ display: "block" }} className={props.selected ? "selected" : ""} />
				<span className={props.selected ? "selected" : ""}>{props.title}</span>
			</div>
		</li>
	);
};

export default NavItem;
