import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ApiService from '../Services/ApiService';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import { CircularProgress, MenuItem, Button } from "@material-ui/core";

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
   formelement: {
       paddingBottom: '10px',
   }
}));

export default function AreaModal({action, open, onClose})
{
    const classes = useStyles();
    const [reactionValue, setReactionValue] = React.useState('');

    const [reactions, setReactions] = React.useState([]);
    const [isLoaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            let services = await ApiService.getSubscribedServices();
            let toPush = [];
            for (let service of services) {
                for (let reaction of service.reactions) {
                    reaction.serviceName = service.route;
                    toPush.push(reaction);
                }
            }
            setReactions(toPush);
            setLoaded(true);
        };
        fetchData();
    }, []);
    const [actionParameters, setActionParameters] = React.useState(() => {
        let params = [];
        for (let param of action.parameters) {
            params.push({name: param.name, value: ""});
        };
        return params;
    });
    const [reactionParameters, setReactionParameters] = React.useState([]);
    const onTextFieldChange = (e) => {
        let params = actionParameters;
        for (let param of params) {
            if (param.name === e.target.name) {
                param.value = e.target.value;
            }
        }
        console.log('Suce un cuo');
        console.log(actionParameters);
        setActionParameters(params)
    }
    const handleChange = (e) => {
        setReactionValue(e.target.value);
    }
    const fields = action.parameters.map((e) => (
        <TextField
            key={e.name}
            label={e.name}
            name={e.name}
            onChange={onTextFieldChange}
            className={classes.formelement}
        />
    ));
    const selectedReaction = reactions.find((e) => e.name === reactionValue);

    const menuItems = reactions.map((e) => (
        <MenuItem value={e.name}>{e.title}</MenuItem>
    ));

    let reactionForm = undefined;

    const onReactionTextFieldChange = (e) => {
        let toPush = [];
        let params = selectedReaction.parameters;
        for (let param of params) {
            let data = {value: '', name: param.name}
            let i = reactionParameters.find((e) => e.name === data.name);
            if (i)
                data.value = i.value;
            if (param.name === e.target.name) {
                data.value = e.target.value;
            }
            toPush.push(data);
        }
        console.log(toPush);
        setReactionParameters(toPush);
    }

    const linkActions = () => {
        const fetchData = async () => {
            let response = await ApiService.link(action, actionParameters, selectedReaction, reactionParameters);
            if (response.status === 200)
                alert('MO NZIZI');
        };
        fetchData();
    }

    if (selectedReaction) {
        reactionForm = selectedReaction.parameters.map((e) => (
            <TextField
                key={e.name}
                label={e.name}
                name={e.name}
                onChange={onReactionTextFieldChange}
                className={classes.formelement}
            />
        ));
        reactionForm.push(
            <Button
                onClick={linkActions}
            >Submit</Button>
        )
    }

    return (
        isLoaded ? 
        
        <Modal
            open={open}
            onClose={onClose}
        >
            <Grid spacing={3} className={classes.paper} container direction="column">
                <Typography variant="h4">
                    {action.title}
                </Typography>
                {fields}
                <Select value={reactionValue} onChange={handleChange} >
                    {menuItems}
                </Select>
                {reactionForm}
            </Grid>
        </Modal>
        :
        <CircularProgress />
        
    )
}