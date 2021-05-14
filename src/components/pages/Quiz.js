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
    
    //Hook d'effet pour récupérer les données de la bd via un appel d'api (axios)
    //Est appelé après maj du DOM
    useEffect(() => {
        
        api.get(`/quizzes/${quizId}`)
            .then(
                (res) => {           
                    setQuiz(res.data);
                    setIsLoaded(true);
                },
            )
            .catch( (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [quizId])

    const EditSwitch = withStyles({
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

    //RETURN AFFICHAGE
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (quiz) {
        return (
            <div>                
                <p>{quiz[0].quiz_name}</p>
                <EditSwitch checked={editMode} onChange={handleChange} name="editModeSwitch" />
            </div>
        );
    } else {
       return <p>404</p>
    }
};

export default Quiz;
