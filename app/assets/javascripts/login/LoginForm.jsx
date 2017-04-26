import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Field, reduxForm } from "redux-form";
import { renderTextField, renderPassField } from '../core/render';
import {Paper, RaisedButton} from "material-ui";

class LoginForm extends React.Component {

    render() {
        const { handleSubmit, pristine, submitting, loginFailed, handleRegisterButton } = this.props;

        return (
            <MuiThemeProvider>
                <Paper id="loginForm">
                    <form style={{display: 'flex', flexFlow: 'column'}} onSubmit={handleSubmit}>
                        {loginFailed ?
                            <div id="loginFailed">Feil brukernavn eller passord</div>
                            : null}
                        <div id="loginFields">
                            <Field
                                className="loginField"
                                name="USERNAME"
                                label="Brukernavn"
                                component={renderTextField}
                                required
                            />
                            <Field
                                className="loginField"
                                name="pass"
                                label="Passord"
                                component={renderPassField}
                                required
                            />
                        </div>
                        <div id="loginButtons">
                            <RaisedButton
                                id="loginSubmit"
                                primary={true}
                                type="submit"
                                label="Login"
                                disabled={pristine || submitting}
                            />
                            <RaisedButton
                                id="loginNew"
                                secondary={true}
                                label="Ny Bruker"
                                onTouchTap={handleRegisterButton}
                            />
                        </div>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loginFailed: state.loginPageReducer.loginFailed
    }
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'Login'
})(LoginForm));