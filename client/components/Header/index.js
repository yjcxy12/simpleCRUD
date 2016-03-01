import React, { Component, PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import UserForm from 'components/common/UserForm';
import './style.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            formOpen: !this.state.formOpen
        });
    }

    render() {
        const { title, createUser } = this.props;
        const { formOpen } = this.state;

        return (
            <div className="header--container" style={{ backgroundColor: '#2c3e50' }}>
                <Paper className="header--top" style={{ backgroundColor: '#2c3e50' }}>
                    <h3 className="header--title">{ title }</h3>
                    <RaisedButton
                        className="header--create-new"
                        label="+ Create New"
                        secondary={ true }
                        onClick={ this.handleClick } />
                </Paper>
                { formOpen ? <UserForm onSubmit={ createUser } /> : null }
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    createUser: PropTypes.func.isRequired
};

export default Header;
