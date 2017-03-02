import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.style = {
            sidebar: {
                margin: '0',
                padding: '0',
                height: '100vh',
                width: '290px',
                left: '-220px',
                transform: 'translate(0,0)',
                transition: '0.3s',
                backgroundColor: '#0C5AA7',
                display: 'block',
                position: 'fixed',
                zIndex: '500'
            },
            rightIcon: {
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '24px',
                backgroundColor: '#082b57',
                margin: '6px',
                width: '24px',
                height: '24px',
                padding: '6px',
                right: '11px'
            },
        };

        this.state = {open: false};
    }

    open() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(220px, 0)';
        sidebar.backgroundColor = '#0C5AA7';
        this.style.sidebar = sidebar;
        this.setState({open: true});
    }

    close() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(0, 0)';
        sidebar.backgroundColor = '#0C5AA7';
        this.style.sidebar = sidebar;
        this.setState({open: false});
    }

    render() {
        return (
            <div style={this.style.sidebar} onMouseEnter={this.open} onMouseLeave={this.close}>
                <MuiThemeProvider>
                    <Menu autoWidth={false} width={290}>
                        <MenuItem primaryText="Hjem" containerElement={<Link to="/" />} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">home</FontIcon>}/>
                        <MenuItem primaryText="Prosjekter"containerElement={<Link to="projects" />} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">assignment</FontIcon>} />
                        <MenuItem primaryText="Krav"containerElement={<Link to="requirements" />} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">speaker_notes</FontIcon>}/>
                    </Menu>
                </MuiThemeProvider>
            </div>
        );
    }
}