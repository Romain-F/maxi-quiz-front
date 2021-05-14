import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { api } from '../api';

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

function CreateTheme(props) {
    const [themes, setThemes] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {

        //Récupère la liste des thèmes pour ne pas créer deux fois le même
        //TODO peut être à déplacer pour ne pas charger la liste à chaque ouverture du modal de création de thème
        api.get(`/themes`)
            .then(
                (res) => {
                    setIsLoaded(true);
                    setThemes(res.data);
                },
            )
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (themes.length) {
        themes.map((theme) => console.log(theme));
        return (
           
            <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(20, 'Le nom ne peut pas excéder 20 caractères')
                        .required('Champs requis'),
                    name: Yup.mixed()
                        .notOneOf(themes, 'Ce thème existe déjà'),
                })}
                onSubmit={(values, actions) => {
                    const theme = {
                        name: values.name,
                    };
                    console.log(theme);
                    console.log(props);
                    api.post('/themes', theme)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                    props.handler();
                    actions.setSubmitting(false);

                }}
            >
                <Form>
                    <TextInput
                        label="Nom du thème"
                        name="name"
                        type="text"
                    />
                    <button type="submit">Valider</button>
                </Form>
            </Formik>
        );
    }
     else {
         return (
             themes.length 
         )
     }
}

export { CreateTheme };