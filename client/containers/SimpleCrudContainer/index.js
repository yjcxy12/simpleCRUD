import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';
import Header from 'components/Header';
import UserList from 'components/UserList';
import InfoPopup from 'components/InfoPopup';
import './style.scss';

class SimpleCrudContainer extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.getUserList();
    }

    render() {
        const { userList, error, actions } = this.props;

        return (
            <div className="app--container">
                <Header
                    title="Simple CRUD"
                    createUser={ actions.createUser} />
                <UserList
                    userList={ userList }
                    updateUser={ actions.updateUser }
                    removeUser={ actions.removeUser } />
                <InfoPopup
                    isOpen={ error !== ''}
                    message={ error }
                    closePopup={ actions.removeError } />
            </div>
        );
    }
}

SimpleCrudContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    userList: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        userList: state.userReducer.userList,
        error: state.userReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCrudContainer);
