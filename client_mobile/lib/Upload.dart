import 'package:flutter/material.dart';
import 'dart:core';
import 'package:flutter_app_epicture/ImageGal.dart' as global;
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'dart:convert';
import 'package:flutter_app_epicture/RandomGallery.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_app_epicture/WebViewLog.dart';


class MyUploadPage extends StatefulWidget {
  @override
  _MyUploadPageState createState() => _MyUploadPageState();
}

class _MyUploadPageState extends State<MyUploadPage> {

  bool noArea = false;
  int areaOpen = -1;
  var endPoint = 'http://area.pinteed.com/user/area?token=' + global.token;
  List <Map<dynamic, dynamic>> areaLists = [];

  String chooseAsset(int i)
  {
    String asset_path = null;

    if(areaLists[i]['servicename'] == 'Gmail')
        asset_path = 'assets/gmail.png';
    if(areaLists[i]['servicename'] == 'Twitter')
      asset_path = 'assets/twitter.png';
    if(areaLists[i]['servicename'] == 'Outlook')
      asset_path = 'assets/outlook.png';
    if(areaLists[i]['servicename'] == 'Instagram')
      asset_path = 'assets/instagram.png';
    if(areaLists[i]['servicename'] == 'Facebook')
      asset_path = 'assets/facebook.png';
    if(areaLists[i]['servicename'] == 'Timer')
      asset_path = 'assets/timer.png';
   return(asset_path);
  }

  void openArea(id)
  {
    areaOpen = id;
    setState(() {
    });
  }

  ////////////////////////////////////TO DO
  void deleteArea() async{
    var endpoint = 'http://area.pinteed.com/user/delete/area?token=' + global.token + '&areaId=' + areaLists[areaOpen]['id'].toString();
    var response = await http.get(endpoint);
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
    if (response.statusCode == 200) {
      areaLists = [];
      areaOpen = -1;
    }
    setState(() {

    });

  }

  void desactivateArea() async {
    print("desactivate area");
    var endpoint1 = 'http://area.pinteed.com/user/desactivateArea?token=' + global.token + '&areaId=' + areaLists[areaOpen]['id'].toString();
    if (areaLists[areaOpen]['activated'] == 1) {
      var response = await http.get(endpoint1);
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
      if (response.statusCode == 200)
        areaLists[areaOpen]['activated'] = 0;
      setState(() {

      });
    }
  }

  void activateArea() async{
    print("activate area");
    var endpoint1 = 'http://area.pinteed.com/user/activateArea?token=' + global.token + '&areaId=' + areaLists[areaOpen]['id'].toString();

    if (areaLists[areaOpen]['activated'] == 0) {
      var response = await http.get(endpoint1);
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');
      if (response.statusCode == 200)
        areaLists[areaOpen]['activated'] = 1;

      setState(() {

      });
    }


  }

  ///////////////////////////////////////////////////////////////

  void getArea() async
  {
    var response = await http.get(endPoint);
    noArea = false;
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
    if (response.body == '[]')
      {
        print('no area');
        noArea = true;
        setState(() {

        });
        return;
      }
    List<dynamic> parsedJson = json.decode(response.body);
    int length = parsedJson.length;
    for(int i = 0; i < length; i++)
      areaLists.add(parsedJson[i]);
    print(areaLists);
    setState(() {

    });
  }

  @override
  Widget build(BuildContext context) {
    if (areaLists.length < 1)
      return new Scaffold(
        body: Column(
          children: <Widget>[
            new RaisedButton(onPressed: (){getArea();}, child:Text("Get area")),

            if (noArea == true)
              new Text("No current Area")
          ],
        )
    );
    else if (areaOpen == -1 && areaLists.length > 0)
      return new Scaffold(
          body: Column(
            children: <Widget>[
              for(int i = 0 ; i < areaLists.length; i++)
               // Row(
                 // children: <Widget>[/*chooseAsset(i) != null ? new Image.asset(chooseAsset(i)) : new Image.asset('assets/timer.png'),*/
                Expanded(
                    child: SizedBox( width: double.infinity,
                      child: new FAB(id: i, onPressed: openArea, buttonText: areaLists[i]['description'])))
                ])
      );
    else if (areaOpen > -1)
      return new Scaffold(
         body: Column(
             children: <Widget>[
               Expanded(
                   child: SizedBox( width: double.infinity,
                    child: new Text(areaLists[areaOpen]['activated'] == 1 ? "Area is activated" : "Area is desactivated"))),
               Expanded(
                   child: SizedBox( width: double.infinity,
                       child: new RaisedButton(onPressed: () { deleteArea();}  ,
                           child: new Text("Delete Area")))),
               Expanded(
                   child: SizedBox( width: double.infinity,
                       child: new RaisedButton(onPressed: () { desactivateArea();}  ,
                           child: new Text("Desactivate Area")))),
               Expanded(
                   child: SizedBox( width: double.infinity,
                       child: new RaisedButton(onPressed: () { activateArea();}  ,
                           child: new Text("Activate Area")))),
               ]
         )
      );
  }
}