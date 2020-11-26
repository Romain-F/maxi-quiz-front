import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const Text = ({ label, ...props }) => {
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

const Select = ({ label, ...props }) => {
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
           onSubmit={(values, { setSubmitting }) => {
             setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);
             }, 400);
           }}
        >
            <Form>
                <Text
                    label="Nom du Quiz"
                    name="name"
                    type="text"
                />
                <Select label="Theme" name="theme">
                    <option value="histoire">Histoire</option>
                    <option value="geo">Geo</option>
                    <option value="jeux">Jeux</option>
                    <option value="other">Autre</option>
                </Select>
                <button type="submit">Valider</button>
            </Form>
        </Formik>
    );
};

export default CreateQuiz;
