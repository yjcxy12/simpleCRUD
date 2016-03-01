import React, { PropTypes } from 'react';
import { Snackbar } from 'material-ui';

function InfoPopup(props) {
    return (
        <Snackbar
            open={ props.isOpen}
            message={ props.message }
            onRequestClose={ props.closePopup }
            autoHideDuration={ 2000 } />
    );
}

InfoPopup.propTypes = {
    message: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired
};

export default InfoPopup;
