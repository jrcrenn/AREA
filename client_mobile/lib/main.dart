import 'package:flutter/material.dart';
import 'dart:core';
import 'package:flutter_app_epicture/ImageGal.dart' as global;
import 'package:flutter_app_epicture/Upload.dart';
import 'package:flutter_app_epicture/RandomGallery.dart';
import 'package:flutter_app_epicture/History.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(MyApp());


class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Area',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: LoginView()
    );
  }
}
class LoginView extends StatefulWidget {
  LoginView({Key key}) : super(key: key);

  @override
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {


  @override
  Widget build(BuildContext context) {
    final myLogController = TextEditingController();
    final myPassController = TextEditingController();

    final String phpEndPoint = "http://area.pinteed.com/user/signIn?username=";

    void logIn() async {
      if (myLogController.text == null || myPassController.text == null) return;

          Map data = {
        "username": myLogController.text,
        "password": myPassController.text
      };
      var body = json.encode(data);
      var endpoint = phpEndPoint + myLogController.text + '&password=' +
          myPassController.text;
      print(endpoint);
      var response = await http.get(endpoint);

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      var response_body = response.body.split(":");
      var token = response_body[1].replaceAll('\"', '');
      token = token.replaceAll('}', '');
      print(token);
      if (token != null && response.statusCode == 200) {
        setState(() {
          global.token = token;
          global.isLoggedIn = true;
        });
      }
    }

    @override
    void dispose() {
      // Clean up the controller when the widget is disposed.
      myLogController.dispose();
      myPassController.dispose();
      super.dispose();
    }


    final emailField = TextField(controller: myLogController,
    );
    final passwordField = TextField(controller: myPassController,
    );
    final loginButon = Material(
      elevation: 5.0,
      borderRadius: BorderRadius.circular(30.0),
      color: Color(0xff01A0C7),
      child: MaterialButton(
        minWidth: MediaQuery
            .of(context)
            .size
            .width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: () {
          logIn();
        },
        child: Text("Login",
          textAlign: TextAlign.center,),
      ),
    );

    if (global.isLoggedIn == false) {
      return Scaffold(
        body: Center(
          child: Container(
            color: Colors.white,
            child: Padding(
              padding: const EdgeInsets.all(36.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(height: 45.0),
                  emailField,
                  SizedBox(height: 25.0),
                  passwordField,
                  SizedBox(
                    height: 35.0,
                  ),
                  loginButon,
                  SizedBox(
                    height: 15.0,
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }
    else {
      return NavigationBarWidget();
    }
  }
}
class NavigationBarWidget extends StatefulWidget {
  bool byPassLogin = false;

  NavigationBarWidget({Key key, this.byPassLogin}) : super(key: key);

  @override
  _NavigationBarWidgetState createState() => _NavigationBarWidgetState();
}

class _NavigationBarWidgetState extends State<NavigationBarWidget> {
  int selectedIndex = 0;
  List<String> pageNames = ["Hooks", "Areas", "History"];
  List<Widget> widgetOptions = <Widget>[
    MyHookPage(),
    MyUploadPage(),
    MyHistoryPage(),
  ];
  bool loggedOut = false;

  void _onItemTapped(int index) {
    setState(() {
      selectedIndex = index;
    });
  }

  Widget defaultAppBar(BuildContext context) {
    return PreferredSize(
      preferredSize: Size.fromHeight(40),
      child: AppBar(
        backgroundColor: Colors.lightBlueAccent,
        title: Text(pageNames[selectedIndex]),
      ),
    );
  }

  Widget backAppBar(BuildContext context) {
    return PreferredSize(
      preferredSize: Size.fromHeight(40),
      child: AppBar(
        backgroundColor: Colors.lightBlueAccent,

        title: Text(pageNames[selectedIndex]),
        actions: <Widget>[
          IconButton(
              icon: Icon(Icons.arrow_back, color: Colors.white),
              onPressed: () {
                setState(() {
                  if ((global.actionNb >= 0 && global.reactionNb >= 0)) {
                    global.actionNb = -1;
                    global.reactionNb = -1;
                  }
                  else if (global.actionId >= 0 && global.reactionId >= 0) {
                    global.actionId = -1;
                    global.reactionId = -1;
                  }
                });
              }
          )
        ],

      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (this.loggedOut == true && this.widget.byPassLogin == false) {
      return LoginView();
    }
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      resizeToAvoidBottomInset: false,
      appBar: (global.myActiveAction.length > 0 && global.myActiveReaction.length > 0) || (global.myActiveAction.length > 0 && global.myActiveReaction.length > 0 && global.actionNb >= 0 && global.reactionNb >= 0) ? backAppBar(context) :  defaultAppBar(context),
      body: Center(
        child: widgetOptions.elementAt(selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text('Hooks'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            title: Text('Areas'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.book),
            title: Text('History'),
          )
        ],
        currentIndex: selectedIndex,
        selectedItemColor: Colors.lightBlueAccent,
        unselectedItemColor: Colors.grey.shade700,
        onTap: _onItemTapped,
      ),
    );
  }
}

class MyCustomForm extends StatefulWidget {
  @override
  _MyCustomFormState createState() => _MyCustomFormState();
}

// Define a corresponding State class.
// This class holds the data related to the Form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  final myController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Search'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: TextField(
          controller: myController,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // When the user presses the button, show an alert dialog containing
        // the text that the user has entered into the text field.
        onPressed: () {
          setState(() {
          });
          Navigator.push(context, MaterialPageRoute(builder: (context) => MyHookPage()));
        },
        child: Icon(Icons.search),
      ),
    );
  }
}
