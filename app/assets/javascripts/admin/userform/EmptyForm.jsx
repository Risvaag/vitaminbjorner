import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EmptyForm extends React.Component {

    _render(handleSubmit) {
        return(
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        hintText="Brukernavn"
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="email"
                        hintText="Epost"
                        disabled={true}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        name="firstname"
                        hintText="Fornavn"
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="lastname"
                        hintText="Etternavn"
                        disabled={true}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        disabled={true}
                        type="submit"
                        label="Submit"
                        component={RaisedButton}
                    />
                    <Field
                        disabled={true}
                        type="edit"
                        label="Edit"
                        component={RaisedButton}
                    />
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {handleSubmit} = this.props;
        return this._render(handleSubmit);
    }

}
