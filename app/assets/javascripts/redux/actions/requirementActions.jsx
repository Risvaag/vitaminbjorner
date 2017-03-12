import axios from 'axios';

export function getAllRequirements() {
    return dispatch => {
        axios.get('http://localhost:9000/requirements/all ')
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getAllRequirementsAsync(data))
            });

    }

}


function getAllRequirementsAsync(data) {
    return {
        type: "GET_ALL_REQUIREMENTS",
        payload: data
    }
}

