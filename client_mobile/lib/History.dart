import 'package:flutter/material.dart';
import 'dart:core';
import 'package:flutter_app_epicture/ImageGal.dart' as global;
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'dart:convert';
import 'package:flutter_app_epicture/RandomGallery.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_app_epicture/WebViewLog.dart';


class MyHistoryPage extends StatefulWidget {
  @override
  _MyHistoryPageState createState() => _MyHistoryPageState();
}

class _MyHistoryPageState extends State<MyHistoryPage> {

  bool noHistory = false;
  List <Map<dynamic, dynamic>> historyLists = [];

  ///////////////////////////////////////////////////////////////

  String concatTime(int i)
  {
    String result = historyLists[i]['time'] + ' ' + historyLists[i]['description'];
    return(result);
  }
  void getHistory() async
  {
    var endpoint = 'http://area.pinteed.com/user/history?token=' + global.token;
    var response = await http.get(endpoint);
    noHistory = false;
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
    if (response.body == '[]')
    {
      print('no history');
      noHistory = true;
      setState(() {

      });
      return;
    }
    List<dynamic> parsedJson = json.decode(response.body);
    int length = parsedJson.length;
    for(int i = 0; i < length; i++)
      historyLists.add(parsedJson[i]);

    setState(() {

    });
  }

  @override
  Widget build(BuildContext context) {
    if (historyLists.length < 1)
      return new Scaffold(
          body: Column(
            children: <Widget>[
              new RaisedButton(onPressed: (){getHistory();}, child:Text("Get History")),
              if (noHistory == true)
                new Text("Nothing in the history")
            ],
          )
      );
    else if (historyLists.length > 0)
      return new Scaffold(
          body: Column(
              children: <Widget>[
                for(int i = 0; i < historyLists.length; i++)
                  SizedBox( width: double.infinity, child: new Text(concatTime(i)))

              ])
      );
  }
}