import 'package:flappy_search_bar/flappy_search_bar.dart';
import 'package:flappy_search_bar/search_bar_style.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile_client/Models/ServiceModel.dart';
import 'package:mobile_client/Views/Customs/CustomCell.dart';
import 'package:mobile_client/Views/ReactionsPage.dart';
import 'package:mobile_client/WebService/AreaAPI.dart';
import 'package:tuple/tuple.dart';

import 'Views/LoginPage.dart';

Map<int, Color> color = {
  50: Color.fromRGBO(136, 14, 79, .1),
  100: Color.fromRGBO(136, 14, 79, .2),
  200: Color.fromRGBO(136, 14, 79, .3),
  300: Color.fromRGBO(136, 14, 79, .4),
  400: Color.fromRGBO(136, 14, 79, .5),
  500: Color.fromRGBO(136, 14, 79, .6),
  600: Color.fromRGBO(136, 14, 79, .7),
  700: Color.fromRGBO(136, 14, 79, .8),
  800: Color.fromRGBO(136, 14, 79, .9),
  900: Color.fromRGBO(136, 14, 79, 1),
};

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: MaterialColor(0xFFFFFFFF, color),
        canvasColor: Colors.white,
        textTheme: GoogleFonts.robotoTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      home: LoginPage(), // MyHomePage(title: 'AREA'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: NestedScrollView(
          headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
            return <Widget>[PageHeader()];
          },
          body: PageView(children: [buildPageContent()]),
        ));
  }

  Widget PageHeader() {
    return SliverAppBar(
      expandedHeight: 160.0,
      flexibleSpace: FlexibleSpaceBar(
        background: Padding(
          padding: EdgeInsets.only(left: 12, right: 12, top: 12),
          child: CustomScrollView(
            slivers: <Widget>[
              SliverToBoxAdapter(
                  child: Container(
                      height: 80,
                      child: SearchBar(
                        hintText: "Service, action, etc.",
                        searchBarStyle: SearchBarStyle(
                        backgroundColor: Colors.white, borderRadius: BorderRadius.all(Radius.circular(8.0))),
                        onSearch: (x) async {
                          performSearch(x);
                          return <String>[];
                        },
                      ))),
              SliverToBoxAdapter(
                child: Container(
                  height: 20,
                  child: FutureBuilder<List<Tuple2<String, bool>>>(
                    future: (() async {
                      final services = await AreaAPI().getServices();
//                      final myServices = await AreaAPI().getMyServices();

//myServices.where((element) => e.name == element.name).length != 0
                      return services.map((e) => Tuple2(e.iconRoute, true)).toList();
                    })().catchError((error) => showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            title: new Text("Erreur"),
                            content: new Text(error.toString()),
                            actions: <Widget>[
                              new FlatButton(
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                  child: new Text("Fermer", style: TextStyle(color: Colors.black),))
                            ],
                          );
                        }
                    )),
                    builder: (BuildContext context, snapshot) {
                      if (snapshot.hasData) {
                        return Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: snapshot.data
                              .map(
                                (e) => Padding(
                                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                                  child: Opacity(
                                    opacity: e.item2 ? 1.0 : 0.2,
                                    child: Image.network(
                                      e.item1,
                                    ),
                                  ),
                                ),
                              )
                              .toList(),
                        );
                      }
                      return Center(child: CircularProgressIndicator());
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<String> results = [];

  Widget buildPageContent() => ListView.separated(
      itemBuilder: (BuildContext context, int index) {
        return CustomCell(Icons.favorite_border, results[index], 3);
      },
      separatorBuilder: (BuildContext context, int index) => Divider(thickness: 1),
      itemCount: results.length);

  void performSearch(String string) {
    /*var te = data.where((element) => element.toLowerCase().contains(string.toLowerCase())).toList();

    setState(() {
      this.results = te;
    }); */
  }
}
