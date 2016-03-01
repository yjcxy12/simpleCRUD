import React, { PropTypes } from 'react';
import { List } from 'material-ui';
import UserItem from './UserItem';

function UserList(props) {
    const { userList, updateUser, removeUser } = props;
    const itemElements = userList ? userList.map(
        (user) => <UserItem
            key={ user.id }
            user={ user }
            updateUser={ updateUser }
            removeUser={ removeUser} />) : null;

    return (
        <List>
            { itemElements }
        </List>
    );
}

UserList.propTypes = {
    userList: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired
};

UserList.defaultProps = {
    userList: []
};

export default UserList;
