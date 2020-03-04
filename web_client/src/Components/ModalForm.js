import TextField from "@material-ui/core/TextField";
import React from 'react';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ApiService from '../Services/ApiService';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}));


export default function ModalForm({service, open, onClose}) {
    const classes = useStyles();
    let textFieldArray = [];

    console.log(open);

    const [parameters, setParameters] = React.useState(() => {
        let params = [];
        if (service) {
            for (let parameter of service.parameters) {
                params.push({name: parameter.name, value: ''});
            }
        }
        return params;
    });

    const onTextFieldChange = (e) => {
        let params = parameters;
        for (let param of parameters) {
            if (param.name === e.target.name) {
                param.value = e.target.value;
            }
        }
        console.log(params);
        setParameters(params)
    }

    if (service) {
        for (let parameter of service.parameters) {
            console.log('ALED DE DE ');
            textFieldArray.push(
                <TextField
                    key={parameter.name}
                    label={parameter.name}
                    name={parameter.name}
                    onChange={onTextFieldChange}
                />
            )
        }
    }

    const submit = () => {
        console.log(parameters);
        const connect = async () => {
            let response = await ApiService.connectTo(service.route, parameters);
            if (!response.success)
                alert('error');
            else
                alert('success !');
        }
        connect();
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className={classes.paper}>
                {service.parameters.map((e) => (
                    <TextField
                        key={e.name}
                        label={e.name}
                        name={e.name}
                        onChange={onTextFieldChange}
                    />
                ))}
                <Button onClick={submit}>
                    <p>Subscribe !</p>
                </Button>
            </div>
        </ Modal>
    )
};
