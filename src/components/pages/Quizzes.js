import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuizListElement from '../QuizListElement';

import { api } from '../../api';


class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            quizzes: [],
        };
    }

    componentDidMount() {
        api.get(this.props.content)
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        quizzes: res.data,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        //const { url } = useRouteMatch(); 
        const { error, isLoaded, quizzes } = this.state;
        console.log(this.props)
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <div>
                    <ul>
                        {quizzes.map(quiz => (
                            <li key={quiz.id}>
                                <Link to={`/quiz/${quiz.id}`}>
                                    <QuizListElement                       
                                        quiz={quiz}
                                    />
                                </Link>
                            </li>
                        ))}
                        <li><p>+</p></li>
                    </ul>
                </div>
            );
        }
    }
}

export default Quizzes;