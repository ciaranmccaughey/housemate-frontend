import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavItem = props => {
    
    return (
		<li className="navbar-item">
			<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				<FontAwesomeIcon icon={props.icon} style={{ display: "block" }} />
				<span style={{ fontSize: "12px" }}>{props.title}</span>
			</div>
		</li>
	);
};

export default NavItem;
