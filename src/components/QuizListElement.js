import React, { Component } from 'react';

class QuizListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return <div>
            <h2>{this.props.quiz.name}</h2>
            <p>theme</p>
            <p><b>*</b></p>
            <p>Thomas</p>
        </div>;
    }
}



export default QuizListElement;