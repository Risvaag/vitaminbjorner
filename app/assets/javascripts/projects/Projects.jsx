import React from 'react';
import axios from 'axios';
import ProjectListItem from './ProjectListItem.jsx';

export default class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            project: []
        };
    }

    //Get information from html body and creates a Json object.
    componentDidMount() {
        axios.get('http://localhost:9000/projects')
            .then( response => {
                    this.setState({
                        project: response.data
                    })
                }
            );
    }

    generateProjectList(){
        return this.state.project.map((item) => {
            return <ProjectListItem index={item.pid}
                                    name={item.p_name}
                                    descripton={item.p_desc}
                                    owner={item.po_username}
                                    manager={item.pm_username} /> }
        )
    }


    render() {
        return (
            <div className="all-project-list">
                <h1>Prosjekter</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Beskrivelse</th>
                            <th>Project owner</th>
                            <th>Project manager</th>
                            <th>Stuff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateProjectList()}
                    </tbody>
                </table>
            </div>
        );
    }
}