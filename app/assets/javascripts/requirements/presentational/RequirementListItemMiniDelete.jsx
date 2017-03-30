import React from 'react';

export default class RequirementListItemMiniDelete extends React.Component {

    render() {
        const requirement = this.props.requirement;
        return (
            <tr>
                <td>{requirement.name}</td>
                <td>{requirement.description}</td>
                <td><button onClick={() => this.props.onClickHandler(requirement)}>Slett</button></td>
            </tr>
        );
    }
}