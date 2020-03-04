import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_auth_buttons/flutter_auth_buttons.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:mobile_client/WebService/AreaAPI.dart';
import 'package:mobile_client/main.dart';

import 'RegisterPage.dart';



class LoginPage extends StatefulWidget
{

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  String username;
  String password;

  GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: [
      'email',
      'https://www.googleapis.com/auth/contacts.readonly',
    ],
  );

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      backgroundColor: Colors.blue,
      body: Container(
        child: Padding(
          padding: EdgeInsets.only( top: 70),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ClipRect(
                child: Container(
                  height: 300,
                  child: Padding(
                    padding: EdgeInsets.all(20),
                    child: Column(
                      children: <Widget>[
                        TextFormField(
                            style: TextStyle(
                              color: Colors.white,
                            ),
                            decoration: InputDecoration(
                              hintText: 'Nom de compte',
                              hintStyle: TextStyle(
                                  color: Colors.white
                              ),

                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Colors.white
                                ),
                                borderRadius: BorderRadius.circular(10),
                              ),

                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Colors.white
                                ),
                                borderRadius: BorderRadius.circular(10),
                              ),

                              fillColor: Colors.transparent,

                              //   filled: true,
                              prefixIcon: Icon(
                                Icons.account_circle,
                                color: Colors.white,
                              ),
                            ),
                          onChanged: (value) => setState(() => this.username = value),
                        ),

                        SizedBox(height: 15),

                        TextFormField(
                            style: TextStyle(
                              color: Colors.white,
                            ),
                            decoration: InputDecoration(
                              hintText: 'Mot de passe',
                              hintStyle: TextStyle(
                                  color: Colors.white
                              ),

                              border: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Colors.white
                                ),
                                borderRadius: BorderRadius.circular(10),
                              ),

                              enabledBorder: OutlineInputBorder(
                                borderSide: BorderSide(
                                    color: Colors.white
                                ),
                                borderRadius: BorderRadius.circular(10),
                              ),

                              fillColor: Colors.transparent,

                              //   filled: true,
                              prefixIcon: Icon(
                                Icons.lock,
                                color: Colors.white,
                              ),
                            ),
                          onChanged: (value) => setState(() => this.password = value),
                        ),

                        SizedBox(height: 10),

                        Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Expanded(
                              child: FlatButton(
                                color: Colors.white,
                                textColor: Colors.black,
                                onPressed: () async {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => RegisterPage()),
                                  );
                                },
                                child: Text(
                                  "CREER UN COMPTE",
                                  style: TextStyle(fontSize: 14.0),
                                ),
                              ),
                            ),

                            SizedBox(width: 10),

                            Expanded(
                              child: FlatButton(
                                color: Colors.redAccent,
                                textColor: Colors.white,
                                onPressed: () async {
                                  await AreaAPI().loginUser(this.username, this.password).then((response)
                                  {
                                    print("token " + response.token);
                                    Navigator.pushReplacement(
                                      context,
                                      MaterialPageRoute(builder: (context) => MyHomePage(title: "AREA")),
                                    );
                                  });
                                },
                                child: Text(
                                  "CONNEXION",
                                  style: TextStyle(fontSize: 14.0),
                                ),
                              ),
                            ),
                          ],
                        ),

                        Expanded(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: <Widget>[
                              GoogleSignInButton(
                                darkMode: true,
                                onPressed: () async {
                                  try {
                                    var answer = await _googleSignIn.signIn();
                                    var auth = await answer.authentication;
                                    print(auth.accessToken);
                                  } catch (error) {
                                    print(error);
                                  }
                                },
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}