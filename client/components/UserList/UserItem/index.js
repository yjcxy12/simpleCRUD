import React, { PropTypes, Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import UserForm from 'components/common/UserForm';
import './style.scss';

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick() {
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    render() {
        const { user, updateUser, removeUser } = this.props;
        const { isEditing } = this.state;

        return (
            <Paper className="user-list--user-item--container">
                <div className="user-list--user-item--item">
                    <span className="user-list--user-item--primary-text">
                        { `${user.firstname} ${user.surname}` }
                    </span>
                    <span className="user-list--user-item--secondary-text">
                        { user.category.slice(0, 1).toUpperCase() + user.category.slice(1) }
                    </span>
                    <div className="user-list--user-item--button-container">
                        <RaisedButton
                            className="user-list--user-item--button"
                            label="Edit"
                            secondary={ true }
                            onClick={ this.handleEditClick } />
                        <RaisedButton
                            className="user-list--user-item--button"
                            label="Remove"
                            primary={ true }
                            onClick={ removeUser.bind(null, user.id) } />
                    </div>
                </div>
                { isEditing ? <UserForm
                    firstname={ user.firstname }
                    surname={ user.surname }
                    category={ user.category.toLowerCase() }
                    onSubmit={ updateUser.bind(null, user.id) } /> : null }
            </Paper>
        );
    }
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired
};

export default UserItem;
