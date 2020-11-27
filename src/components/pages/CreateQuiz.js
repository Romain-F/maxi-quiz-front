import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { api } from '../../api';

const TextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const SelectInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

function CreateQuiz() {

    const [themes, setThemes] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {

        api.get(`/themes`)
            .then(
                (res) => {
                    setIsLoaded(true);
                    setThemes(res.data);
                },
                // (error) => {
                //     this.setState({
                //         isLoaded: true,
                //         error
                //     });
                // }
            )
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    const loadedSelect = () => {
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement...</div>;
        } else {
            return (
                <SelectInput label="Theme" name="theme">
                    { themes.map(theme => (
                        <option value={theme.id}>{theme.name}</option>
                    )) }    
                </SelectInput>
            );
        }
    }
    return (
        <Formik
           initialValues={{
               name: '',
               theme: '',
           }}
           validationSchema={Yup.object({
               name: Yup.string()
                   .max(40, 'Le nom ne peut pas exceder 40 lettres')
                   .required('Champs requis'),
           })}
           onSubmit={(values, actions) => {
               const quiz = {
                   name: values.name,
                   id_theme: parseInt(values.theme, 10),
               };
               console.log(JSON.stringify(quiz))
               api.post('/quizzes', quiz)
                   .then(res => {
                       console.log(res);
                       console.log(res.data);
                   })

                actions.setSubmitting(false);
           }}
        >
            <Form>
                <TextInput
                    label="Nom du Quiz"
                    name="name"
                    type="text"
                />
                {loadedSelect()}
                <button type="submit">Valider</button>
            </Form>
        </Formik>
    );
};

export default CreateQuiz;
