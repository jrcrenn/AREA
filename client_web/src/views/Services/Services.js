import React, { Component } from "react";

import "tabler-react/dist/Tabler.css";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Grid } from "tabler-react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Popout from 'react-popout';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popTwitter: 0,
      popGmail: 0,
      popGithub: 0,
      magicField: 0,
      servicename: "",
      services: [],
      twitterstat: "grey",
      gmailstat: "grey",
      githubstat: "grey",
      outlookstat: "grey"
    }
    this.getserv()
  }

  getserv() {
    axios({
      "method":"GET",
      "url":"https://area.pinteed.com/user/service",
      "params":{
        "token": sessionStorage.getItem('Token')
      }
    })
    .then((response)=>{
      console.log("Ya une réponse")
      this.setState({services: response.data.services})
      this.checkstatus()
      console.log(this.state.services)
    })
    .catch((error)=>{
      console.log("Error when trying to register to this service, please try again\n" + error)
      console.log(error)
    })
  }

  popTwitter() {
    if(this.state.popTwitter == 1){
      this.setState({popTwitter: 0, magicField: 1, servicename: "Twitter"})
      return (
          <Popout url='https://area.pinteed.com/getAuth/twitter'>
          </Popout>
      )
    }
  }

  popOutlook() {
    if(this.state.popOutlook == 1){
      this.setState({popOutlook: 0, magicField: 1, servicename: "Outlook"})
      return (
          <Popout url='https://area.pinteed.com/getAuth/outlook'>
          </Popout>
      )
    }
  }

  popGithub() {
    if(this.state.popGithub == 1){
      this.setState({popGithub: 0, magicField: 1, servicename: "Github"})
        return(
          <Popout url='https://area.pinteed.com/getAuth/github'>
          </Popout>
        )
    }
  }

  popGmail() {
    if (this.state.popGmail == 1) {
      this.setState({popGmail: 0,  magicField: 1, servicename: "Gmail"})
      return(
        <Popout url='https://area.pinteed.com/getAuth/Gmail'>
        </Popout>
      )
    }
  }

  postServ() {
    this.state.magicField = 0
    axios({
      "method":"POST",
      "url":"https://area.pinteed.com/user/service",
      "params":{
        "service": this.state.servicename,
        "tokenService": document.getElementById("tokenfield").value,
        "token": sessionStorage.getItem('Token')
      }
    })
    .then((response)=>{
      console.log("Ya une réponse")
      if (response.data.success == 1) {
        alert("Successfully registered to" + this.state.servicename + "service")
        sessionStorage.setItem(this.state.servicename + 'Token', document.getElementById("tokenfield").value)
        window.location.reload();
      } else
        alert("Error when sending token: "  + response.data.message)
      this.checkstatus()
      console.log(response.data)
    })
    .catch((error)=>{
      alert("Error when trying to register to this service, please try again\n" + error)
      console.log(error)
    })
  }


  magicField() {
    var txt = "Paste " + this.state.servicename + " token"

    if (this.state.magicField == 1) {
      return (
        <div style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
          <TextField id="tokenfield" label={txt}></TextField>
          <Button  onClick={() => this.postServ()}style={{marginLeft: 20, marginTop: 20}}>Send token</Button>
        </div>
      );
    }
  }

  checkstatus() {
    if (this.state.services != undefined && this.state.services.includes("Twitter"))
      this.setState({twitterstat: "#66cdaa"}) 
    if (this.state.services != undefined && this.state.services.includes("Github"))
      this.setState({githubstat: "#66cdaa"})
    if (this.state.services != undefined && this.state.services.includes("Gmail"))
      this.setState({gmailstat: "#66cdaa"})
    if (this.state.services != undefined && this.state.services.includes("Outlook"))
      this.setState({outlookstat: "#66cdaa"})
  }

  render() {
    var test = "grey"

    return (
      <div style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
      <h1>Services</h1>
      <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
           <Button size="small" onClick={() => this.setState({popTwitter: 1})} style={{marginLeft: 30, marginRight: 100, marginTop: 50, marginBottom: 50}}><TwitterIcon /> > Twitter <FiberManualRecordIcon style={{marginLeft: 5, fill: this.state.twitterstat}}/></Button>
           <Button onClick={() => this.setState({popGmail: 1})} style={{marginLeft: 30, marginRight: 100, marginTop: 50, marginBottom: 50}}><MailIcon/> > Gmail <FiberManualRecordIcon style={{marginLeft: 5, fill: this.state.gmailstat}}/></Button>
           <Button onClick={() => this.setState({popGithub: 1})} style={{marginLeft: 30, marginRight: 100, marginTop: 50, marginBottom: 50}}><GitHubIcon/> > Github <FiberManualRecordIcon style={{marginLeft: 5, fill: this.state.githubstat}}/></Button>
           <Button onClick={() => this.setState({popOutlook: 1})} style={{marginLeft: 30, marginRight: 100, marginTop: 50, marginBottom: 50}}><MailIcon/> > Outlook <FiberManualRecordIcon style={{marginLeft: 5, fill: this.state.outlookstat}}/></Button>
           {/* <Button style={{marginLeft: 30, marginRight: 100, marginTop: 50, marginBottom: 50}} disabled><FacebookIcon/> > Facebook</Button>
           <Button style={{marginLeft: 30, marginRight: 100, marginTop: 50, marginBottom: 50}} disabled><YouTubeIcon/> > Youtube</Button> */}
      </ButtonGroup>
      {this.popTwitter()}
      {this.popGithub()}
      {this.popGmail()}
      {this.popOutlook()}
      {this.magicField()}
      </div>
    );
  }
}

export default Dashboard;