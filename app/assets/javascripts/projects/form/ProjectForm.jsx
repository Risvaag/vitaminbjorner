import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderCheckbox, warnNumberField, validateProjectForm as validate} from './../../admin/render.jsx';

/**
 * Redux-form for project creation.
 * @see Projects
 * @see module:admin/render.validateProjectForm
 * @see module:admin/render.renderTextField
 * @see module:admin/render.renderCheckbox
 */
class ProjectForm extends React.Component {

    render() {
        const {
            handleSubmit, handleCreate, handleClear,
            disabled, pristine, reset, submitting
        } = this.props;
        return(
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <Field
                            name="name"
                            label="Projektnavn"
                            disabled={disabled}
                            component={renderTextField}
                        />
                        <Field
                            name="securityLevel"
                            label="Sikkerhetsnivå"
                            disabled={disabled}
                            warn={warnNumberField}
                            component={renderTextField}
                        />
                        <Field
                            name="transactionVolume"
                            label="Transaksjonsvolum"
                            disabled={disabled}
                            component={renderTextField}
                        />
                        <Field
                            name="userChannel"
                            label="Brukerkanal"
                            disabled={disabled}
                            component={renderTextField}
                        />
                        <Field
                            name="deploymentStyle"
                            label="Distribusjonsstil"
                            disabled={disabled}
                            component={renderTextField}
                        />
                        <Field
                            name="isPublic"
                            label="Offentlig"
                            disabled={disabled}
                            component={renderCheckbox}
                        />
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" secondary={true} label="Lag prosjekt" disabled={!disabled} onClick={handleCreate}/>
                        <RaisedButton className="form-button" label="Tilbakestill" disabled={disabled} onClick={() => {reset(); handleClear()}}/>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: state.projectFormReducer.project,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'ProjectForm',
    validate,
    enableReinitialize: true
})(ProjectForm));
