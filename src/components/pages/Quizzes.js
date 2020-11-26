import React, { Component } from 'react';
import List from '../List';
import { ListElement } from '../ListElement';

class Quizzes extends Component {

    render() {
        return(
            <List 
                apiUrl="quizzes"
                contentType={ListElement.LIST_ELEMENT_TYPE_QUIZ}
                linkToCreate="/quizzes_new"
            />
        )
    }
}

export default Quizzes;