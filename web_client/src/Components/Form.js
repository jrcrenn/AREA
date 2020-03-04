import React from 'react';
import Grid from "@material-ui/core/Grid";
import CheckIcon from '@material-ui/icons/Check';
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomCheckbox from "./CustomCheckbox";

export default function Form(props) {
    let form = [];
    console.log('Test');

    const [state, setState] = React.useState(() => {
        let formValues = {};
        for (let elem of props.formBuilder) {
            const type = elem.type;
            let value = null;

            if (type === 'input')
                value = '';
            if (type === 'checkbox')
                value = false;
            formValues[elem.name] = value;
        }
        return formValues;
    });

    const onInputChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const onCheckboxChange = (e) => {
        setState({...state, [e.target.name]: !state[e.target.name]});
    };

    const onValidate = () => {
        props.onValidate(state);
    };

    for (let elem of props.formBuilder)
    {
        const type = elem.type;
        const description = elem.description;
        const name = elem.name;
        const label = elem.label;

        if (type === 'input') {
            form.push(<Grid item md={4} xs={10}><CustomInput label={label} name={name} onChange={onInputChange} description={description} /></Grid>);
        } else if (type === 'checkbox') {
            form.push(<Grid item md={4} xs={10}><CustomCheckbox onChange={onCheckboxChange} name={name} label={label} description={description} /></Grid>)
        }
    }

    console.log(state);
    return (
        <Grid container alignItems={"center"} spacing={4} direction={"column"}>
            {form}
            <CustomButton onClick={onValidate} startIcon={<CheckIcon />} color={'white'} backgroundColor={'black'} backgroundHoverColor={'white'} hoverColor={'black'}>
                Save configuration
            </CustomButton>
        </Grid>
    )
}