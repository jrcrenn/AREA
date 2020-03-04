import 'package:flutter/material.dart';

class PinnedWidget extends StatelessWidget
{
  final int number;
  final Widget child;
  final Alignment alignment;

  PinnedWidget({this.child, this.number, this.alignment}): assert(child != null);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          child: this.child,
        ),
        Positioned(
          right: this.alignment.x,
          top: this.alignment.y,
          child: buildCountPin(),
        )
      ],
    );
  }

  Widget buildCountPin()
  {
    return Container(
      height: 13,
      width: 13,
      decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.red),
      child: Center(
        child: Text(this.number.toString(), style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
      ),
    );
  }
}