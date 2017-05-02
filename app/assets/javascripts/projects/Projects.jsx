import React from 'react';
import {connect} from "react-redux";
import { push } from 'react-router-redux';
import { getPublicProjects, getPrivateProjects, getArchivedProjects, postProjectNew, deleteProject, changeProjectsTableMode } from "../redux/actions/projectActions";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions";
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions';
import { popoverAnchor, popoverContent, popoverOpen, popoverAdd } from './../redux/actions/popoverActions';
import { snackBar } from './../redux/actions/snackBarActions';
import ProjectTable from './ProjectTable';
import ProjectsSideMenu from './presentational/ProjectsSideMenu';
import ProjectNewDialog from './dialog/ProjectNewDialog';
import DeleteDialog from "./../core/dialog/DeleteDialog";
import {
    Card, CardActions, CardHeader, CardText, CardTitle, FlatButton, GridList,
    GridTile
} from "material-ui";
import {
    amber200, blue200, blueGrey200, brown200, cyan200, deepOrange200, deepPurple200, green200,
    grey200, indigo200, lightBlue200, lightGreen200, lime200, orange200, pink200,
    purple200, red200, teal200, yellow200
} from "material-ui/styles/colors";
import {Link} from "react-router";
import Popover from "../core/popover/Popover";

const colors = [
    red200, pink200, purple200, deepPurple200,
    indigo200, blue200, lightBlue200, cyan200,
    teal200, green200, lightGreen200, lime200,
    yellow200, amber200, orange200, deepOrange200,
    brown200, blueGrey200, grey200
];

/**
 * Class represents /projects.
 * @see ProjectTable
 * @see ProjectForm
 * @see Project
 *
 * @param {Array.<Project>} publicProjects
 * @param {Array.<Project>} privateProjects
 * @param {Array.<Project>} archivedProjects
 * @param {string} tableMode
 * @param {boolean} formMode
 * @param {Snack} snack
 *
 * @param {function} postProjectNew {@link module:redux/actions/project.postProjectNew}
 * @param {function} getPublicProjects {@link module:redux/actions/project.getPublicProjects}
 * @param {function} getPrivateProjects {@link module:redux/actions/project.getPrivateProjects}
 * @param {function} getArchivedProjects {@link module:redux/actions/project.getArchivedProjects}
 * @param {function} changeProjectFormMode {@link module:redux/actions/project.changeProjectFormMode}
 * @param {function} changeProjectTableMode {@link module:redux/actions/projectForm.changeProjectTableMode}
 * @param {function} snackBar {@link module:redux/actions/projectForm.snackBar}
 * @param {function} changeSideMenuMode {@link module:redux/actions/sideMenu.changeSideMenuMode}
 */
class Projects extends React.Component {

    componentWillMount() {
        this.props.popoverAdd('projects');
    }

    componentDidMount(){
        this.props.getPublicProjects();
        this.props.getPrivateProjects();
        this.props.getArchivedProjects();
        this.props.changeSideMenuMode("HIDE");
        this.props.newDialog(false);
        this.props.deleteDialog(false);
    }

    /**
     *
     * @param mode
     * @returns {Array.<Project>}
     * @private
     */
    _projects(mode) {
        switch (mode) {
            case "private":
                return this.props.privateProjects;
            case "archive":
                return this.props.archivedProjects;
            default:
                return this.props.publicProjects;
        }
    }

    _title(mode) {
        switch (mode) {
            case "private":
                return <h2>Mine Prosjekter</h2>;
            case "archive":
                return <h2>Arkiverte Prosjekter</h2>;
            default:
                return <h2>Åpne Prosjekter</h2>;
        }
    }

    hashCode(s) {
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            const code = s.charCodeAt(i);
            hash = ((hash<<5)-hash) + code;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    getCardColor(title) {
        return colors[this.hashCode(title) % colors.length];
    }

    /**
     * Render method
     * @returns {XML}
     */
    render(){
        const {
            newDialogIsOpen, deleteDialogIsOpen,
            newDialog, deleteDialog, deleteDialogAction, deleteDialogChangeAction,
            postProjectNew,
            deleteProject,
            push, path,
            popoverOpen, popoverAnchor, popoverContent
        } = this.props;
        const tableMode = path.replace('/projects/', '');

        return (
            <div style={{display: 'flex'}}>
                <ProjectsSideMenu
                    className="projects-sidemenu"
                    handleUser={push.bind(null, '/projects/private')}
                    handleAll={push.bind(null, '/projects')}
                    handleArchived={push.bind(null, '/projects/archive')}
                    handleNew={newDialog.bind(null, true)}
                />
                <div>
                    <div className="containerUsers">
                        <div style={{display: 'flex', flexWrap: 'wrap', margin: '8px'}}>
                            {this._projects(tableMode).map((project, index) => {
                                const color = this.getCardColor(project.name);
                                return (
                                    <Card key={index} style={{margin: '8px', minWidth: '150px', backgroundColor: color}}>
                                        <CardTitle
                                            style={{paddingBottom: 0}}
                                            title={project.name}
                                            subtitle={'Laget av:' + project.creatorID + '  ' + 'Sjef: ' + project.managerID}
                                        />
                                        <CardActions>
                                            <Link to={'project/' + project.ID}>
                                                <FlatButton label='Åpne'/>
                                            </Link>
                                            <FlatButton label="Info" onTouchTap={(event) => {
                                                popoverOpen(true);
                                                popoverContent(project.description);
                                                popoverAnchor(event.currentTarget);
                                            }}/>
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </div>

                        <Popover component="projects"/>

                        <ProjectNewDialog
                            title="Nytt Prosjekt"
                            open={newDialogIsOpen}
                            handleSubmit={(values, dispatch, props) => {postProjectNew(values, dispatch, props); newDialog(false)}}
                            onRequestClose={newDialog.bind(null, false)}
                        />
                        <DeleteDialog
                            title="Slett Prosjekt"
                            desc="Er du sikker på at du vil slette prosjektet?"
                            open={deleteDialogIsOpen}
                            action={deleteDialogAction}
                            onRequestClose={deleteDialog.bind(null, false)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        path: props.location.pathname,
        publicProjects: state.projectReducer.publicProjects,
        privateProjects: state.projectReducer.privateProjects,
        archivedProjects: state.projectReducer.archivedProjects,
        tableMode: state.projectReducer.tableMode,
        newDialogIsOpen: state.dialogReducer.projectNew.isOpen,
        deleteDialogIsOpen: state.dialogReducer.projectDelete.isOpen,
        deleteDialogAction: state.dialogReducer.projectDelete.action,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (url) => {
            dispatch(push(url));
        },
        getPublicProjects: () => {
            dispatch(getPublicProjects());
        },
        getPrivateProjects: () => {
            dispatch(getPrivateProjects());
        },
        getArchivedProjects: () => {
            dispatch(getArchivedProjects());
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode));
        },
        postProjectNew: (data) => {
            dispatch(postProjectNew(data));
        },
        deleteProject: (project) => {
            dispatch(deleteProject(project));
        },
        newDialog: (open) => {
            dispatch(dialogOpen('projectNew', open));
        },
        deleteDialog: (open) => {
            dispatch(dialogOpen('projectDelete', open));
        },
        deleteDialogChangeAction: (action) => {
            dispatch(dialogChangeAction('projectDelete', action))
        },
        popoverOpen: (open) => {
            dispatch(popoverOpen('projects', open));
        },
        popoverAnchor: (anchor) => {
            dispatch(popoverAnchor('projects', anchor));
        },
        popoverContent: (content) => {
            dispatch(popoverContent('projects', content));
        },
        popoverAdd: (popover) => {
            dispatch(popoverAdd(popover));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);