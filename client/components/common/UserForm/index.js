import React, { Component, PropTypes } from 'react';
import { Paper, TextField, SelectField, MenuItem, RaisedButton } from 'material-ui';
import injectTouchTapEvent from 'react-tap-event-plugin';

injectTouchTapEvent();

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: props.firstname,
            surname: props.surname,
            category: props.category
        };
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleFirstnameChange(event) {
        this.setState({
            firstname: event.target.value
        });
    }

    handleSurnameChange(event) {
        this.setState({
            surname: event.target.value
        });
    }

    handleCategoryChange(event, index, value) {
        this.setState({
            category: value
        });
    }

    render() {
        const { firstname, surname, category } = this.state;
        const { onSubmit } = this.props;

        return (
            <Paper className="user-list--user-item--container">
                <TextField
                    floatingLabelText="First Name"
                    onChange={ this.handleFirstnameChange }
                    value={ firstname }
                    type="text"
                    style={{ marginRight: '10px' }} />
                <TextField
                    floatingLabelText="Surname"
                    onChange={ this.handleSurnameChange }
                    value={ surname }
                    type="text"
                    style={{ marginRight: '10px' }} />
                <SelectField
                    value={ category }
                    onChange={ this.handleCategoryChange }
                    style={{ transform: 'translateY(2px)', marginRight: '10px' }}>
                    <MenuItem value="admin" primaryText="Admin" />
                    <MenuItem value="developer" primaryText="Developer" />
                    <MenuItem value="designer" primaryText="Designer" />
                </SelectField>
                <RaisedButton
                    secondary={ true }
                    label="Submit"
                    onClick={ onSubmit.bind(null, firstname, surname, category) } />
            </Paper>
        );
    }
}

UserForm.propTypes = {
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

UserForm.defaultProps = {
    firstname: '',
    surname: '',
    category: 'admin'
};

export default UserForm;
