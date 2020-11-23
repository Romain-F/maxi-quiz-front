import React, { Component } from 'react';
import QuizListElement from './QuizListElement';

class ListElement extends Component {

    static LIST_ELEMENT_TYPE_QUIZ = 'QUIZ';
    
    render() {
        const content = this.props.listContent;
        if (content === ListElement.LIST_TYPE_QUIZ) {
            return <QuizListElement item={this.props.listItem}/>; 
        } 
        return <div />;
    }
}

export { ListElement };