import React from 'react';
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

function CreateTheme() {
    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(20, 'Le nom ne peut pas exceder 20 lettres')
                    .required('Champs requis'),
            })}
            onSubmit={(values, actions) => {
                const theme = {
                    name: values.name,
                };
                api.post('/themes', theme)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })
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

export { CreateTheme };