import ApiService from "../Services/ApiService";
import React from 'react';
import {useParams} from 'react-router-dom';
import Header from "../Components/Header";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import capitalize from "../Utils/Capitalize";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CollapseItem from "../Components/CollapseItem";
import Divider from "@material-ui/core/Divider";
import CustomButton from "../Components/CustomButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import getSpecificButton from "../Services/OAuthButtonService";
import CircularProgress from "@material-ui/core/CircularProgress";
import ModalForm from "../Components/ModalForm";

const useStyles = makeStyles(theme => ({
    cardContainer: {
        marginTop: '10%',
        paddingX: 'auto',
    },
    root: {
        paddingLeft: 'auto',
        paddingRight: 'auto',
    },
    textContainer: {
        textAlign: 'center',
    },
    title: {
        fontWeight: 800,
        fontFamily: "Roboto",
        margin: 'auto',
        marginTop: '3%',
    },
    container: {
        marginTop: '1%',
    },
    listContainer: {
        textAlign: 'center'
    },
    listTitle: {
        fontWeight: 800,
        fontSize: '2.5em'
    },
    divider: {
        marginTop: '10px',
    }
}));

export default function ServiceView(props) {
    const [services, setServices] = React.useState([]);
    const [isLoaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            let data = await ApiService.fetchServices();
            setServices(data.services);
            setLoaded(true);
        };
        fetchData();
    }, []);

    let {name} = useParams();
    let service = undefined;
    for (let elem of services) {
        console.log(elem);
        console.log(elem.route + '!==' + props.name)
        if (elem.route === name)
            service = elem;
    }
    console.log(service);
    let actions = [];
    let reactions = [];
    if (service) {
        actions = service.actions;
        reactions = service.reactions;
    }
    let button = getSpecificButton(name);
    const classes = useStyles();

    const [isSubscribed] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleModal = () => {
        console.log('is open ? ' + open);
        setOpen(!open)
    };
    if (button === undefined)
        button = (
            <CustomButton color={'white'} hoverColor={'#4BB543'} backgroundColor={'#4BB543'} backgroundHoverColor={'white'} onClick={handleModal} icon={isSubscribed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon /> }>
                Subscribe now
            </CustomButton>
        );

    const actionList = actions.map(action =>
        <Grid key={action.name} item md={10} xs={11}>
            <CollapseItem name={action.name} description={action.description} />
            <Divider className={classes.divider} />
        </Grid>
    );

    const reactionList = reactions.map(reaction =>
        <Grid item md={10} key={reaction.name} xs={11}>
            <CollapseItem name={reaction.name} description={reaction.description} />
            <Divider className={classes.divider} />
        </Grid>
    );

    name = capitalize(name);
    return (
        isLoaded ?
            (<div>
            <Header />
            <Grid className={classes.root} spacing={4} container justify={"center"}>
                <Grid item xs={12} md={12} className={classes.textContainer}>
                    <Typography variant={"h2"} className={classes.title}>
                        {name} service
                    </Typography>
                </Grid>
                <Grid item>
                    {isSubscribed ?
                        <CustomButton color={'white'} hoverColor={'#4BB543'} backgroundColor={'#4BB543'} backgroundHoverColor={'white'} onClick={handleModal} icon={isSubscribed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon /> }>
                            Subscribed
                        </CustomButton>
                    : button}
                </Grid>
                <Grid className={classes.container} spacing={3} container direction={"row"} justify={"space-evenly"}>
                    <Grid className={classes.listContainer} item md={6} xs={12}>
                        <Grid container justify={"center"}  spacing={8}>
                            <Grid item md={12}>
                                <Typography variant={"h6"} className={classes.listTitle}>
                                    Actions
                                </Typography>
                            </Grid>
                            {actionList}
                        </Grid>
                    </Grid>
                    <Grid className={classes.listContainer} item md={6} xs={12}>
                        <Grid container justify={"center"}  spacing={8}>
                            <Grid item md={12}>
                                <Typography variant={"h6"} className={classes.listTitle}>
                                    REActions
                                </Typography>
                            </Grid>
                            {reactionList}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ModalForm open={open} service={service} onClose={handleModal} />
        </div>)
            :
            <>
                <CircularProgress />
                </>
    )
}
