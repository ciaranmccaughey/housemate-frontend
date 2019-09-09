import React, { Component } from 'react';
import AddGroup from '../../Components/Group/AddGroup';
import GroupList from '../../Components/GroupList/GroupList';

class Group extends Component {

    state = {
        groups: [],
        selectedGroup: null,
        showArea: 'list'
    }

    showArea = area => {
        this.setState({showArea: area});
    }

    render() {


        let render = <GroupList groups={this.state.groups} showArea={this.showArea}/>

        if (this.state.showArea == 'add') {
            render = <AddGroup  showArea={this.showArea} />;
        }

        return(
            <>
                {render}
            </>
        );
    }
}

export default Group;