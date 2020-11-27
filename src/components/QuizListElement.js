import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class QuizListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <Link to={`/quizzes/${this.props.item.id}`}>
                <div>
                    <h2>{this.props.item.quiz_name}</h2>
                    <p>{this.props.item.theme_name}</p>
                    <p><b>*</b></p>
                    <p>Thomas</p>
                </div>
            </Link>
        );
    }
}



export default QuizListElement;