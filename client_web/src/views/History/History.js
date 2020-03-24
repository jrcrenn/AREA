import React, { Component } from "react";

import "tabler-react/dist/Tabler.css";
import Button from '@material-ui/core/Button';
import { Card, CardContent, Grid, CardHeader ,Typography, Avatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [""],
      charged: 0
    }
    this.request()
  }

  request() {
    axios({
      "method":"GET",
      "url":"https://area.pinteed.com/user/history",
      "params":{
        "token": sessionStorage.getItem('Token')
      }
    })
    .then((response)=>{
      console.log("Ya une réponse")
      console.log(response.data)
      if (response.data.length > 0)
        this.setState({data: response.data, charged: 1})
    })
    .catch((error)=>{
      alert("Error when trying to get history:\n" + error)
      console.log(error)
    })
  }

  render() {
    return (
        <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
          <CardHeader title="History"/>
          <Button style={{marginLeft: 20}} variant="contained" color="secondary"
                    onClick={() => this.request()}>
              Refresh
          </Button>
          <CardContent>
            <Grid>
              <List component="nav" aria-label="mailbox folders">
                {this.state.data.map(res=> {
                  if (this.state.charged == 0) {
                    return <ListItem button> <ListItemText primary="EMPTY"/> </ListItem>
                  } else {
                    return  (<ListItem button> <ListItemText  primary={res.id} secondary={res.time}/> {res.description} </ListItem>)
                  }
                })}
              </List>
            </Grid>
          </CardContent>
        </Card>
    );
  }
}

export default History;