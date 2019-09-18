import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavItem.sass";


const NavItem = props => {
	
    return (
		<li className="navbar-item">
			<div className="nav-item-container"  onClick={props.setView}>

				<FontAwesomeIcon icon={props.icon} style={{ display: "block" }} className={props.selected ? "selected" : ""} />
				<span style={{ fontSize: "12px" }} className={props.selected ? "selected" : ""}>{props.title}</span>
			</div>
		</li>
	);
};

export default NavItem;
