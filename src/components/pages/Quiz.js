import React from "react";
import { useParams } from "react-router-dom";


function Quiz(data) {

   
        const { quizId } = useParams();
        //const quiz = data.find(q => q.id === Number(quizId));
        let quizData;
        //console.log(quiz);
        //if (true) {
        //    quizData = (
        //        <div>
        //            <h3> {quiz.name} </h3>
        //            <p>{quiz.id}</p>
        //            <hr />
        //            <h4>{quiz.name + quiz.name}</h4>
        //        </div>
        //    );
        //} else {
        //    quizData = <h2> Sorry. Quiz doesn't exist </h2>;
        //}

        return (
            <div>
                <div>coucou</div>
            </div>
        );
};

export default Quiz;
