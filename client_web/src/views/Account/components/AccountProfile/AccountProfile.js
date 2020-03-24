import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core';
import axios from "axios";


class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Unknown",
      userid: "undefined"
    }
    this.request();
  }

  request() {
    axios({
      "method":"GET",
      "url":"https://area.pinteed.com/user/user",
      "params":{
        "token": sessionStorage.getItem('Token')
      }
    })
    .then((response)=>{
      console.log("Ya une réponse")
      this.setState({username: response.data[0].username, userid: response.data[0].user_id})
      console.log(response.data[0])
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  render() {

    return (
      <Card>
      <CardContent>
        <div>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {this.state.username}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Lyon, FR
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              User ID: {this.state.userid} 
            </Typography>
          </div>
          <Avatar src="https://p0.pikrepo.com/preview/199/780/man-wearing-round-sunglasses-with-silver-colored-frame.jpg" style={{width: 100, height: 100, marginLeft: 180}}
          />
        </div>
        <div>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          onClick={() => alert("Feature not implemented yet")}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text" onClick={() => alert("Feature not implemented yet")}>Remove picture</Button>
      </CardActions>
    </Card>
    );
  }
}

export default AccountProfile;
