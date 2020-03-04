import React from 'react';
import Header from '../Components/Header';
import ActionCard from "../Components/ActionCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ApiService from "../Services/ApiService";

export default function AreaView() {

    let [actions, setActions] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            let services = await ApiService.getSubscribedServices();
            console.log(services);
            let toPush = [];
            for (let service of services) {
                for (let action of service.actions) {
                    action.imageUrl = service.iconRoute;
                    action.serviceName = service.route;
                    toPush.push(action);
                }
            }
            console.log(toPush);
            setActions(toPush);
        }
        fetchData();
    }, []);

    let actionsList = [];
    let actualActions = [];

    for (let i = 0; i < actions.length; i++) {
        if ((i % 4 === 0 && i !== 0)) {
            console.log(actualActions);
            actionsList.push(actualActions);
            actualActions = [];
        }
        actualActions.push(
            <Grid key={actions[i].title} item>
                <ActionCard action={actions[i]} image={actions[i].imageUrl} />
            </Grid>
        );
    }
    actionsList.push(actualActions);
    console.log(actionsList);

    return (
        <>
            <Header />
            <Grid justify={"flex-start"} style={{height: '100%', textAlign: 'center'}} wrap={"nowrap"} container direction={"column"}>
                <Typography variant={"h1"}>
                    Choose an action
                </Typography>
                    {actionsList.map((e, index) => (
                            <Grid style={{margin: '5px'}} spacing={3} item key={index} justify={"center"} container direction={"row"}>
                                {e}
                            </Grid>
                    ))}
            </Grid>
        </>
    )
}
