import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from '../../api';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

function Quiz(data) {
    const [quiz, setQuiz] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const { quizId } = useParams();
    
    useEffect(() => {
        
        api.get(`/quizzes/${quizId}`)
            .then(
                (res) => {
                    setIsLoaded(true);
                    setQuiz(res.data);
                },
                // (error) => {
                //     this.setState({
                //         isLoaded: true,
                //         error
                //     });
                // }
            )
            .catch( (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    const MySwitch = withStyles({
        switchBase: {
            color: green[300],
            '&$checked': {
                color: green[500],
            },
            '&$checked + $track': {
                backgroundColor: green[500],
            },
        },
        checked: {},
        track: {},
    })(Switch);

    const handleChange = (event) => {
        setEditMode(event.target.checked)
    };

    console.log(editMode);
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (quiz) {
        return (
            <div>
            {console.log(quiz)}
                <MySwitch checked={editMode} onChange={handleChange} name="editModeSwitch"/>
                <p>{quiz[0].quiz_name}</p>
            </div>
        );
    } else {
       return <p>404</p>
    }
};

export default Quiz;
