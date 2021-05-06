import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { api } from '../../api';
//import { MyModal } from '../MyModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CreateTheme } from '../CreateTheme';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

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
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

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
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
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
                    <button type="button" onClick={handleOpen}>
                        Ajouter un Thème
                    </button>
                    

                    <button type="submit">Valider</button>
                </Form>
            </Formik>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <CreateTheme />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default CreateQuiz;
