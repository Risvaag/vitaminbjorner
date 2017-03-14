import React from 'react';

import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class NewRequirement extends React.Component {

	componentDidMount(){
		this.props.changeSideMenuMode("MENU");
	}

	render() {

		return (
			<form action="/add-requirement" method="post">
                <h1>Lag nytt krav</h1>

                <br/>

				<label><b>KravNavn</b></label><br/>
				<input type="text" placeholder="Kravname" name="name" required/>

                <br/>
				<label><b>Beskrivelse</b></label><br/>
				<input type="text" placeholder="Beskrivelse" name="description" required/>

                <br/>

				<label> <b>Source</b></label><br/>
				<input type="text" placeholder="Source" name="source" required/>

                <br/>
				<label><b>Stimulus</b></label><br/>
				<input type="text" placeholder="Stimulus" name="stimulus" required/>

                <br/>
				<label> <b>Artifact</b></label><br/>
				<input type="text" placeholder="Artifact" name="artifact" required/>

                <br/>
				<label> <b>Response</b></label><br/>
				<input type="text" placeholder="Response" name="response" required/>

                <br/>
				<label> <b>Environment</b></label><br/>
				<input type="text" placeholder="Environment" name="environment" required/>

                <br/>
				<label><b>Public</b></label>
				<input type="checkbox" name="public"/>
                <br/>
                <button type="submit">Legg til</button>
				</form>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequirement);