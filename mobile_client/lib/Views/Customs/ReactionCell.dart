import 'package:flutter/material.dart';

class ReactionCell extends StatelessWidget
{

  String _title;

  ReactionCell(this._title);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Center(
          child: Row(
            children: <Widget>[
              Expanded(child: Text(this._title)),
              Icon(Icons.chevron_right)
            ],
          ),
        ),
      ),
    );
  }

}