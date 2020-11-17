import React, { Component } from 'react';
import QuizListElement from './QuizListElement';

class ListElement extends Component {

    render() {
        const content = this.props.listContent;
        if (content == 'quizzes') {
            return <QuizListElement item={this.props.listItem}/>; 
        } 
        return <div />;
    }
}



export default ListElement;