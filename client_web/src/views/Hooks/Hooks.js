import React, { Component } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import "tabler-react/dist/Tabler.css";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Checkbox, Button } from 'semantic-ui-react'
import axios from "axios";
import Loader from 'react-loader-spinner'
import { Form, TextArea } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { FaTrashAlt } from "react-icons/fa";

class Hooks extends Component {

  constructor(props) {
        super(props);
        this.state = {
          section:0,
          charged:0,
          actions:[],
          hooks:[],
          reactions:[],
          actionSelected: 0,
          reactionSelected: 0,
          services:[],
          vars:{
            comment:"",
            name:"",
            actionParam1:"",
            reactionParam1:"",
            reactionParam2:""
          }
        }
  }

  findActionById(id) {
    var element1 = null;
    this.state.actions.map((element) => {
      if (element.id == id) {
        element1 = element
      }
    })
    return (element1)
  }

  findRectionById(id) {
    var element1 = null;
    this.state.reactions.map((element) => {
      if (element.id == id) {
        element1 = element
      }
    })
    return (element1)
  }

  requests() {
    axios({
      "method":"GET",
      "url":"https://area.pinteed.com/area/listReactions",
    })
    .then((response)=>{
      this.setState({reactions: response.data});
      console.log(response.data)
    })
    .catch((error)=>{
      alert("Error server, please try again")
      console.log(error)
      window.location.reload();
    })
    axios({
      "method":"GET",
      "url":"https://area.pinteed.com/area/listActions",
    })
    .then((response)=>{
      this.setState({charged: 1, actions: response.data});
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
    axios({
      "method":"GET",
      "url":"https://area.pinteed.com/user/area",
      "params": {
        "token": sessionStorage.getItem("Token")
      }
    })
    .then((response)=>{
      this.setState({charged: 1, hooks: response.data});
      console.log(response.data)
    })
    .catch((error)=>{
      window.location.reload();
      console.log(error)
    })

    axios({
      "method":"GET",
      "url":"https://area.pinteed.com/user/service",
      "params": {
        "token": sessionStorage.getItem("Token")
      }
    })
    .then((response)=>{
      this.setState({charged: 1, services: response.data.services});
      console.log(response.data.services)
    })
    .catch((error)=>{
      window.location.reload();
      console.log(error)
    })
  }

  componentDidMount() {
    this.requests()
  }

  render_reactions = () => {
    const reactions = this.state.reactions
    if (this.state.actionSelected == 0) {
      return
    }
    
    return (
      <div style={{flexDirection: "row"}}>
        <h2 style={{marginTop:20}}>Choose an reaction</h2>
        <Card.Group>
          {reactions.map((element) => {
            if (!this.state.services.includes(element.servicename)) {
              return (
                <Card color={"red"} >
                  <Card.Content>
                    <Card.Header>{element.reactionname}</Card.Header>
                    <Card.Meta>
                      <span >{element.servicename}</span>
                    </Card.Meta>
                    <Card.Description>
                      {element.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui'>
                        Service not configured
                    </div>
                  </Card.Content>
                </Card>
              )
            }
            if (element.id == this.state.reactionSelected) {
              return (
                <Card color={"black"}>
                  <Card.Content>
                    <Card.Header>{element.reactionname}</Card.Header>
                    <Card.Meta>
                      <span >{element.servicename}</span>
                    </Card.Meta>
                    <Card.Description>
                      {element.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            }
            return (
              <Card onClick={() => this.setState({reactionSelected: element.id})}>
                <Card.Content>
                  <Card.Header>{element.reactionname}</Card.Header>
                  <Card.Meta>
                    <span >{element.servicename}</span>
                  </Card.Meta>
                  <Card.Description>
                    {element.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </div>
    )

}

  render_actions = () => {
      const actions = this.state.actions
      if (this.state.charged == 0) {
        return (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )
      }
      return (
        <div style={{flexDirection: "row"}}>
          <h2 style={{marginTop:20}}>Choose an action</h2>
          <Card.Group>
            {actions.map((element) => {
              if (!this.state.services.includes(element.servicename)) {
                return (
                  <Card color={"red"} >
                    <Card.Content>
                      <Card.Header>{element.actionname}</Card.Header>
                      <Card.Meta>
                        <span >{element.servicename}</span>
                      </Card.Meta>
                      <Card.Description>
                        {element.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui'>
                          Service not configured
                      </div>
                    </Card.Content>
                  </Card>
                )
              }
              if (element.id == this.state.actionSelected) {
                return (
                  <Card color={"black"}>
                    <Card.Content>
                      <Card.Header>{element.actionname}</Card.Header>
                      <Card.Meta>
                        <span >{element.servicename}</span>
                      </Card.Meta>
                      <Card.Description>
                        {element.description}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                )
              }
              return (
                <Card onClick={() => this.setState({actionSelected: element.id})}>
                  <Card.Content>
                    <Card.Header>{element.actionname}</Card.Header>
                    <Card.Meta>
                      <span >{element.servicename}</span>
                    </Card.Meta>
                    <Card.Description>
                      {element.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        </div>
      )

  }

  render_params = () => {
    if (this.state.reactionSelected == 0) {
      return
    }
    const action = this.findActionById(this.state.actionSelected);
    const reaction = this.findRectionById(this.state.reactionSelected);

    return (
      <div style={{marginTop: 30}}>
        <h2>Personnalize your hook</h2>
        <Form>
          <p style={{marginTop: 10}}>Name your hook :</p>
          <TextArea onChange={(a,val) => this.state.vars.comment = val.value} placeholder='Enter Name' />
          {/* <p style={{marginTop: 20}}>Do you want to activate your hook:</p> */}

          <h5 style={{marginTop: 20}}>Action Parameter : </h5>
          <p style={{marginTop: 5}}>Enter {action.actionparam1description}</p>
          <Input onChange={(a,val) => this.state.vars.actionParam1 = val.value} placeholder='Enter Parameter' />

          {(reaction.reactionparam1description != "NULL" || reaction.reactionparam2description != "NULL") &&
              <div style={{marginBottom: 30}}>
                <h5 style={{marginTop: 20}}>Reactions Parameters : </h5>
                <p style={{marginTop: 10}}>Variables available. Click to copy the variable and then past it on one of the fields. </p>
                <CopyToClipboard text="{{actionVariable1}}">
                  <Button style={{marginTop: 5}}>{action.actionvariable1description}</Button>
                </CopyToClipboard>
                <CopyToClipboard text="{{actionVariable2}}">
                  <Button style={{marginTop: 5}}>{action.actionvariable2description}</Button>
                </CopyToClipboard>
              </div>
          }


          

          {reaction.reactionparam1description != "NULL" &&  <div><p style={{marginTop: 10}}>Enter {reaction.reactionparam1description}</p>
          <Input onChange={(a,val) => this.state.vars.reactionParam1 = val.value}  placeholder='Enter Parameter' /></div>}
          {reaction.reactionparam2description != "NULL" &&  <div><p style={{marginTop: 20}}>Enter {reaction.reactionparam2description}</p>
          <Input onChange={(a,val) => this.state.vars.reactionParam2 = val.value} placeholder='Enter Parameter' /></div>}


          <Button style={{marginTop: 20}} onClick={() => {
            axios({
              "method":"POST",
              "url":"https://area.pinteed.com/user/area",
              "params": {
                "token": sessionStorage.getItem("Token")
              },
              "data": {
                "name": "",
                "description": this.state.vars.comment,
                "activated": 1,
                "action" : {
                    "action_id": this.state.actionSelected,
                    "param1": this.state.vars.actionParam1
                },
                "reaction" : {
                    "reaction_id":this.state.reactionSelected,
                    "param1":this.state.vars.reactionParam1,
                    "param2":this.state.vars.reactionParam2,
                }
              }
            })
            .then((response)=>{
              this.requests()
              this.setState({section: 0});
              alert(response.data.message)
              this.setState({vars:{comment:"",name:"",actionParam1:"",reactionParam1:"",reactionParam2:""}, actionSelected: 0, reactionSelected: 0})
            })
            .catch((error)=>{
              alert("Error server, please try again")
              console.log(error)
            })
          }} primary>Create</Button>
        </Form>
      </div>
    )
  }

  activate_desactivate_area(status, id) {

    var link = ""
    if (status == 0) {
      link = "https://area.pinteed.com/user/desactivateArea"
    } else {
      link = "https://area.pinteed.com/user/activateArea"
    }
    axios({
      "method":"GET",
      "url":link,
      "params": {
        "areaId":id,
        "token": sessionStorage.getItem("Token")
      }
    })
    .then((response)=>{
      axios({
        "method":"GET",
        "url":"https://area.pinteed.com/user/area",
        "params": {
          "token": sessionStorage.getItem("Token")
        }
      })
      .then((response)=>{
        this.setState({charged: 1, hooks: response.data});
        console.log(response.data)
      })
      .catch((error)=>{
        alert("Error server, please try again")
        console.log(error)
      })
      console.log(response.data)
    })
    .catch((error)=>{
      alert("Error server, please try again")
      console.log(error)
    })
  }

  render_hooks = () => {
    const hooks = this.state.hooks
    return (
      <div style={{flexDirection: "row", marginTop: 10, marginBottom: 20}}>
        <Card.Group>
          {hooks.map((element) => {

            const action = this.findActionById(element.action_id);
            const reaction = this.findRectionById(element.reaction_id);

            console.log(action)
            console.log(reaction)

            var text = action.servicename + " -> " + reaction.servicename

            return (
              <Card>
                
                <Card.Content>
                  <Card.Header>{text}</Card.Header>
                  <Card.Meta>
                    <span >{element.servicename}</span>
                  </Card.Meta>
                  <Card.Description>
                    {element.description}
                  </Card.Description>

                  <Card.Description style={{marginTop: 10}}>
                    <div>
                      <div>
                        {element.activated && <Checkbox checked onChange={(evt, btn) => this.activate_desactivate_area(0, element.id)} label='Activated' />}
                        {!element.activated && <Checkbox onChange={(evt, btn) => this.activate_desactivate_area(1, element.id)} label='Activated' />}
                      </div>
                    </div>
                  </Card.Description>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </div>
    )
  }

  renderSections = () => {
    if (this.state.section == 0) {
      return (
        <div>
          <h2>Your Hooks</h2>
          {this.render_hooks()}
          <Button onClick={() => this.setState({section: 1})} primary>Create a new Hook</Button>
        </div>
      )
    } else if (this.state.section == 1) {
      return (
        <div>
          <h2>Create a new Hook</h2>
          <Button onClick={() => this.setState({section: 0})} secondary>back</Button>
          {this.render_actions()}
          {this.render_reactions()}
          {this.render_params()}
        </div>
      )
    }
  }


  render() {
    return (
      <div style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
        <h1>Hooks</h1>
        {this.renderSections()}
      </div>
    );
  }
}

export default Hooks;