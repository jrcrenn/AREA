import ApiService from '../Services/ApiService';
import React from "react";
import Header from "../Components/Header";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import ServiceCard from "../Components/ServiceCard";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles({
    title: {
        fontWeight: 800,
        fontFamily: "Roboto",
        margin: 'auto',
        marginTop: '3%',
    },
    serviceContainer: {
        marginTop: '3%',
    }
});

export default function HomeView() {
    const classes = useStyles();
    const [isLoaded, setLoaded] = React.useState(false);

    const [services, setServices] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            let services = await ApiService.fetchServices();
            let subscribeds = await ApiService.getSubscribedServices();
            for (let service of services.services) {
                service.isSub = false;
                console.log('ALED');
                console.log(subscribeds);
                for (let elem of subscribeds) {
                    if (elem.route === service.route)
                        service.isSub = true;
                }
            }
            console.log(services);
            setServices(services.services);
            setLoaded(true);
        };
        fetchData();
    }, []);
    const servicesList = services.map(service => <ServiceCard name={service.name} key={service.name} description={service.description} route={service.route} isSub={service.isSub} />);
    return (
        isLoaded ?
        <div>
            <Header/>
            <Grid container>
                <Typography variant="h2" className={classes.title}>
                    Explore our services
                </Typography>
            </Grid>
            <Grid className={classes.serviceContainer} spacing={1} container direction={"column"} justify={"center"}>
                <Grid container direction={"row"} spacing={3} justify={"center"}>
                    {servicesList}
                </Grid>
            </Grid>
        </div>
            :
        <CircularProgress />
    );
}
