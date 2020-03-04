import 'package:flutter/material.dart';

import 'Customs/ReactionCell.dart';

class ReactionsPage extends StatelessWidget
{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("REACTIONS"),
        ),
      body: this.buildPageContent(),
    );
  }

  Widget buildPageContent() => ListView.separated(
      itemBuilder: (BuildContext context, int index) {
        return ReactionCell("bite");
      },
      separatorBuilder: (BuildContext context, int index) => Divider(thickness: 1),
      itemCount: 100);

}