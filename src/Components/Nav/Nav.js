import React, { Component } from "react";
import "./Nav.sass";
import NavItem from "./NavItem";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";

const Nav = ({ view, setView }) => {
	
	return (
		<nav className="nav">
			<ul className="navbar-items">
				<NavItem title="Overview" selected={view == 'overview' ? true : false} icon={faChartLine} setView={() => setView('overview')}/>
				<NavItem title="Expenses" selected={view == 'expenses' ? true : false} icon={faWallet} setView={() => setView('expenses')}/>
				<NavItem title="Tasks" selected={view == 'tasks' ? true : false} icon={faList} setView={() => setView('tasks')}/>
				<NavItem title="M8s" selected={view == 'm8s' ? true : false} icon={faUsers} setView={() => setView('m8s')}/>
				<NavItem title="Settings" selected={view == 'settings' ? true : false} icon={faCog} setView={() => setView('settings')}/>
			</ul>
		</nav>
	);
}

export default Nav;
