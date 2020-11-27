import React from 'react';
import QuizListElement from './QuizListElement';


ListElement.LIST_ELEMENT_TYPE_QUIZ = 'QUIZ';
ListElement.LIST_ELEMENT_TYPE_QESTION = 'QUESTION';

function ListElement(props) {
    const content = props.contentType;

     const renderListElement = () => { 
         if (content === ListElement.LIST_ELEMENT_TYPE_QUIZ) {
            return <QuizListElement item={props.listItem}/>; 
        } 
        return <p>La liste n'a pas de type de contenu défini</p>;
    }

    return (
        renderListElement()
    );
}

export { ListElement };