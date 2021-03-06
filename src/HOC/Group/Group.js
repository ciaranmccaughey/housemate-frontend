import React, { Component } from "react";
import AddGroup from "../../Components/Group/AddGroup/AddGroup";
import GroupList from "../../Components/Group/GroupList/GroupList";
import axios from "../../axios-instance";
import ViewGroup from "../../Components/Group/ViewGroup/ViewGroup";
import Back from "../../Components/Back/Back";
import UserSettings from '../../Components/UserSettings/UserSettings';

import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Group extends Component {
	state = {
		groups: [],
		selectedGroup: null,
		showArea: "list",
		categories: []
	};

	componentDidMount() {
		this.getGroups();
		this.getCategories();
	}

	getGroups = async () => {
		const res = await axios.get("group/index.php?action=getGroups");

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				console.log("grouos", data);
				this.setState({ groups: data });
			}
		}
	};

	getCategories = async () => {
		const res = await axios.get("category/index.php?action=getCategories");

		if (res.data) {
			const { data, success, message } = res.data;
			if (success) {
				this.setState({ categories: data });
			}
		}
	};

	addMateToGroup = mate => {
		// add mate to the selected group
		const selectedGroup = this.state.selectedGroup;
		selectedGroup.users.push(mate);

		// update the groups state
		const groups = this.state.groups.map(group => {
			if (group.id === selectedGroup.id) {
				return selectedGroup;
			}
			return group;
		});

		this.setState({
			groups: groups,
			selectedGroup: selectedGroup
		});
	};

	showArea = area => {
		this.setState({ showArea: area });
	};

	groupSelected = selectedGroup => {
		this.setState({ showArea: "view", selectedGroup });
	};

	// delete the group from the group settings component
	onDeleteGroup = groupDeleted => {
		const updateGroups = this.state.groups.filter(group => group.id != groupDeleted.id);
		this.setState({ showArea: "list", selectedGroup: null, groups: updateGroups });
	};

	// leave the group from the group settings component
	onLeaveGroup = groupLeft => {
		const updateGroups = this.state.groups.filter(group => group.id != groupLeft.id);
		this.setState({ showArea: "list", selectedGroup: null, groups: updateGroups });
	};

	onRemoveMate = (mateRemoved, groupToRemove) => {

		let selectedGroupUpdated = null;
		const updateGroups = this.state.groups.map(group => {
			if (group.id === groupToRemove.id) {
				group.users = group.users.filter(user => user.id !== mateRemoved.id);
				selectedGroupUpdated = group;
			}
			return group;
		});

		this.setState({ selectedGroup: selectedGroupUpdated, groups: updateGroups });

	};

	// update groups name from the group settings component
	onGroupNameChange = groupChanged => {
		const updateGroups = this.state.groups.map(group => {
			if (group.id === groupChanged.id) {
				group.name = groupChanged.name;
			}
			return group;
		});
		this.setState({ selectedGroup: groupChanged, groups: updateGroups });
	};

	addGroup = group => {
		let groups = null;
		if (this.state.groups.length) {
			groups = [...this.state.groups, group];
		} else {
			groups = [group];
		}
		this.setState({ groups: groups });
	};

	render() {
		let render = <GroupList groups={this.state.groups} showArea={this.showArea} groupSelected={this.groupSelected} />;

		if (this.state.showArea == "add") {
			render = <AddGroup showArea={this.showArea} addGroup={this.addGroup} />;
		}

		if (this.state.showArea == "view") {
			render = (
				<ViewGroup
					group={this.state.selectedGroup}
					showArea={this.showArea}
					categories={this.state.categories}
					addMateToGroup={this.addMateToGroup}
					onDeleteGroup={this.onDeleteGroup}
					onLeaveGroup={this.onLeaveGroup}
					onRemoveMate={this.onRemoveMate}
					onGroupNameChange={this.onGroupNameChange}
					{...this.props}
				/>
			);
		}

		if (this.state.showArea == "settings") {
			render = <UserSettings showArea={this.showArea}  />;
		}
		return (<div style={{ display: "flex", flexDirection: "column" }}>
			{this.state.showArea == 'list' ? <div className="cog-icon">
				<FontAwesomeIcon icon={faCog} onClick={() => this.setState({ showArea: 'settings' })}  />
			</div> : null}
            {this.state.showArea == 'add' ? <Back action={() => this.setState({ showArea: 'list' })}/> : null}
			{render}
		</div>);
	}
}

export default Group;
