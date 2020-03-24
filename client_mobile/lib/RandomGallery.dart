import 'dart:convert';

import 'package:flutter/material.dart';
import 'dart:core';
import 'package:flutter_app_epicture/ImageGal.dart' as global;
import 'package:http/http.dart' as http;


class MyHookPage extends StatefulWidget {
  @override
  _MyHookPageState createState() => _MyHookPageState();
}

class FAB extends StatelessWidget {
  final int id;
  final Function(int) onPressed;
  final String buttonText;

  const FAB({this.id, this.onPressed, this.buttonText});

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
        onPressed: () {onPressed(this.id);},
        color: Colors.white70 ,
        child: new Text(this.buttonText,
            style: new TextStyle(fontSize: 25.0))
    );
  }
}

class _MyHookPageState extends State<MyHookPage> {

  List <String> service = ["Facebook", "Instagram", "Gmail", "Outlook", "Timer", "Twitter"];
  List <bool> listAction = [false, false, false, false, false, false];
  List <bool> listReaction = [false, false, false, false, false, false];
  bool messageBody = false;


  final myControllerActionParam1 = TextEditingController();
  final myControllerReactionParam1 = TextEditingController();
  final myControllerReactionParam2 = TextEditingController();
  final myControllerAreaName = TextEditingController();
  final myControllerAreaDescription = TextEditingController();

  void postArea() async
  {
    var endPoint = "https://area.pinteed.com/user/area?token=" + global.token;

    String reaction =  myControllerReactionParam1.text;
    if (messageBody == true)
      reaction += ' {{actionVariable1}}';
    Map data = {
      'name': myControllerAreaName.text,
      'description': myControllerAreaDescription.text,
      'activated': 1,
      'action' : {
        'action_id': global.myActiveAction[global.actionNb]['id'],
        'param1': myControllerActionParam1.text
      },
      'reaction' : {
        'reaction_id':global.myActiveReaction[global.reactionNb]['id'],
        'param1': reaction,
        'param2': myControllerReactionParam2.text,
      }
    };

    var body = json.encode(data);
    print(body);
    var response = await http.post(endPoint,
        headers: {"Content-Type": "application/json"},
        body: body
    );
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');

  }


  void refresh()
  {
    setState(() {
    });
  }

  void buttonActionFunction(id) {
    global.actionNb = id;
    print('Button id: $id');

  }

  void buttonReactionFunction(id) {
    global.reactionNb = id;
    print('Button id: $id');
  }

  void getActionList() async
  {
    var endpoint = "http://area.pinteed.com/area/listActions";
    var response = await http.get(endpoint);

    //print('Response body: ${response.body}');
    List<dynamic> parsedJson = json.decode(response.body);
    int length = parsedJson.length;
    for(int i = 0; i < length; i++)
      global.actionLists.add(parsedJson[i]);
    for(int i = 0; i < length; i++) {
      if(service[global.actionId] == global.actionLists[i]['servicename'])
        global.myActiveAction.add(global.actionLists[i]);
    }
    setState(() {

    });
  }

  void getReactionList() async
  {
    var endpoint = "http://area.pinteed.com/area/listReactions";
    var response = await http.get(endpoint);

    //print('Response body: ${response.body}');
    List<dynamic> parsedJson = json.decode(response.body);
    int length = parsedJson.length;
    print("Length: ");
    print(length);
    for (int i = 0; i < length; i++) {
      print(i);
      global.reactionLists.add(parsedJson[i]);
    }
    for (int i = 0; i < length; i++) {
      if (service[global.reactionId] == global.reactionLists[i]['servicename'])
        global.myActiveReaction.add(global.reactionLists[i]);
    }
    setState(() {

    });
    print(global.myActiveReaction);
  }

  void checkIfTwo() async
  {
    bool action = false;
    bool reaction = false;
    int i = 0;
    int j = 0;
    print("in check");

    for (; i < 6; i++)
      if (listAction[i] == true) {
        action = true;
        break;
      }

    for (; j < 6; j++)
      if (listReaction[j] == true) {
        reaction = true;
        break;
      }

    if (action == true && reaction == true) {
      setState(() {
        global.actionId = i;
        global.reactionId = j;
        print("action id : ");
        print(global.actionId);
        print("reaction id : ");
        print(global.reactionId);
        getActionList();
        getReactionList();
      });

    }
    //print(global.actionId);
    //print(global.reactionId);
  }

  void getAction(int i) {
    setState(() {
    for (int j = 0; j < 6; j++) {
      if (j != i)
        listAction[j] = false;
      if (j == i)
        listAction[j] = !listAction[j];
    }
    });
   checkIfTwo();
  }
  void getReaction(int i) {
    setState(() {
    for (int j = 0; j < 6; j++) {
      if (j != i)
        listReaction[j] = false;
      if (j == i)
        listReaction[j] = !listReaction[j];
    }
   });
    checkIfTwo();
  }


  @override
  Widget build(BuildContext context) {
    if (global.actionId < 0 || global.reactionId < 0 || global.myActiveAction.length == 0)
    return new Scaffold(
        body: Column(
            children: <Widget>[
              Text("Select Action", style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),),
              Expanded(
                  child: GridView.count(
                      primary: false,
                      padding: const EdgeInsets.all(20),
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                      crossAxisCount: 3,
                      children: <Widget>[
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getAction(0);}  ,
                                color: listAction[0] == false ? Colors.white70 : Colors.blue,
                                splashColor: Colors.cyanAccent,
                                child: new Image.asset('assets/facebook.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getAction(1);}  ,
                                color: listAction[1] == false? Colors.white70 : Colors.blue,
                                splashColor: Colors.cyanAccent,
                                child: new Image.asset(
                                'assets/instagram.png'))),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getAction(2);}  ,
                                color: listAction[2]  == false? Colors.white70 : Colors.blue,
                                splashColor: Colors.cyanAccent,
                                child: new Image.asset('assets/gmail.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getAction(3);}  ,
                                color: listAction[3]  == false? Colors.white70 : Colors.blue,
                                splashColor: Colors.cyanAccent,
                                child: new Image.asset('assets/outlook.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getAction(4);}  ,
                                color: listAction[4]  == false? Colors.white70 : Colors.blue,
                                child: new Image.asset('assets/timer.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getAction(5);}  ,
                                color: listAction[5] == false ? Colors.white70 : Colors.blue,
                                child: new Image.asset('assets/twitter.png'))
                        ),
                      ])),
              Text("Select Reaction", style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),),
              Expanded(
                  child: GridView.count(
                      primary: false,
                      padding: const EdgeInsets.all(20),
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                      crossAxisCount: 3,
                      children: <Widget>[
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getReaction(0);}  ,
                                color: listReaction[0] == false ? Colors.white70 : Colors.blue,
                                child: new Image.asset('assets/facebook.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getReaction(1);}  ,
                                color: listReaction[1] == false ? Colors.white70 : Colors.blue,
                                child: new Image.asset(
                                'assets/instagram.png'))),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getReaction(2);}  ,
                                color: listReaction[2] == false ? Colors.white70 : Colors.blue,
                                child: new Image.asset('assets/gmail.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getReaction(3);}  ,
                                color: listReaction[3] == false ? Colors.white70 : Colors.blue,
                                child: new Image.asset('assets/outlook.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getReaction(4);}  ,
                                color: listReaction[4] == false ? Colors.white70 : Colors.blue,
                                child: new Image.asset('assets/timer.png'))
                        ),
                        Container(
                            padding: const EdgeInsets.all(8),
                            child: new RaisedButton(
                                onPressed: () { getReaction(5);}  ,
                                color: listReaction[5] == false ? Colors.white70 : Colors.blue,
                                child: new Image.asset('assets/twitter.png'))
                        ),
                      ]))
            ]));
    else if (global.myActiveAction.length > 0 && global.myActiveReaction.length > 0 && global.actionNb < 0 && global.reactionNb < 0) {
      refresh();
      return new Scaffold(
          body: Column(
              children: <Widget>[
                SizedBox( width: double.infinity,
                    child: Text("Select Action", style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),)),
                for(int i = 0; i < global.myActiveAction.length; i++)
                  SizedBox( width: double.infinity,
                      child: new FAB(id: i, onPressed: buttonActionFunction, buttonText: global.myActiveAction[i]['description']))
                ,SizedBox( width: double.infinity,
                    child: Text("Select Reaction", style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),)),
                for(int i = 0; i < global.myActiveReaction.length; i++)
                  SizedBox( width: double.infinity,
                      child: new FAB(id: i, onPressed: buttonReactionFunction, buttonText: global.myActiveReaction[i]['description']))
                ,SizedBox( width: double.infinity,
                    child: new RaisedButton(onPressed: () {refresh();}  , color : Colors.blue, child: new Text("Configure this hook")))
              ]
          )
      );}
    else if (global.myActiveAction.length > 0 && global.myActiveReaction.length > 0 && global.actionNb >= 0 && global.reactionNb >= 0) {
      refresh();
      return new Scaffold(
        body: Column(
          children: <Widget>[
            Expanded(
                child: SizedBox( width: double.infinity,
                    child: Text("Choose a name for this area", style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),))),
            Expanded(
                child: SizedBox( width: double.infinity,
                  child: TextField(controller: myControllerAreaName),)),
            Expanded(
                child: SizedBox( width: double.infinity,
                    child: Text("Describe this area", style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),))),
            Expanded(
                child: SizedBox( width: double.infinity,
                  child: TextField(controller: myControllerAreaDescription),)),
            Expanded(
              child: SizedBox( width: double.infinity,
                child: Text(global.myActiveAction[global.actionNb]['actionparam1description'], style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),))),
            Expanded(
                child: SizedBox( width: double.infinity,
                  child: TextField(controller: myControllerActionParam1),)),
            Expanded(
                child: SizedBox( width: double.infinity,
                    child: Text(global.myActiveReaction[global.reactionNb]['reactionparam1description'], style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),))),
            Expanded(
                child: SizedBox( width: double.infinity,
                  child: TextField(controller: myControllerReactionParam1),)),
            Expanded(
                child: SizedBox( width: double.infinity,
                    child: Text(global.myActiveReaction[global.reactionNb]['reactionparam2description'], style: TextStyle(height: 1.5, fontSize: 20,fontWeight: FontWeight.bold),))),
            Expanded(
                child: SizedBox( width: double.infinity,
                  child: TextField(controller: myControllerReactionParam2),)),
            Expanded(
                child: SizedBox( width: double.infinity,
                    child: new RaisedButton(onPressed: () {messageBody == false ? messageBody = true : messageBody = false; setState(() {});}  , color : messageBody == false ? Colors.red : Colors.green, child: new Text(messageBody == false ? "Message content not added" : "Message content added")))),

            Expanded(
                child: SizedBox( width: double.infinity,
                    child: new RaisedButton(onPressed: () {postArea();}  , color : Colors.blue, child: new Text("Add this area")))),
          ]
        )
      );
    }
  }
}
