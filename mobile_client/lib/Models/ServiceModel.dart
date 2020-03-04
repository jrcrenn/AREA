class ServiceModel {
  String name;
  String route;
  String iconRoute;
  String description;
  List<Parameters> parameters;
  List<Actions> actions;
  List<Reaction> reactions;

  ServiceModel(
      {this.name,
        this.route,
        this.iconRoute,
        this.description,
        this.parameters,
        this.actions,
        this.reactions});

  ServiceModel.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    route = json['route'];
    iconRoute = json['iconRoute'];
    description = json['description'];
    if (json['parameters'] != null) {
      parameters = new List<Parameters>();
      json['parameters'].forEach((v) {
        parameters.add(new Parameters.fromJson(v));
      });
    }
    if (json['actions'] != null) {
      actions = new List<Actions>();
      json['actions'].forEach((v) {
        actions.add(new Actions.fromJson(v));
      });
    }
    if (json['reactions'] != null) {
      reactions = new List<Reaction>();
      json['reactions'].forEach((v) {
        reactions.add(new Reaction.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['route'] = this.route;
    data['iconRoute'] = this.iconRoute;
    data['description'] = this.description;
    if (this.parameters != null) {
      data['parameters'] = this.parameters.map((v) => v.toJson()).toList();
    }
    if (this.actions != null) {
      data['actions'] = this.actions.map((v) => v.toJson()).toList();
    }
    if (this.reactions != null) {
      data['reactions'] = this.reactions.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Parameters {
  String name;
  String type;

  Parameters({this.name, this.type});

  Parameters.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    type = json['type'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['type'] = this.type;
    return data;
  }
}

class Actions {
  String name;
  String title;
  String description;
  List<Parameters> parameters;

  Actions({this.name, this.title, this.description, this.parameters});

  Actions.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    title = json['title'];
    description = json['description'];
    if (json['parameters'] != null) {
      parameters = new List<Parameters>();
      json['parameters'].forEach((v) {
        parameters.add(new Parameters.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['title'] = this.title;
    data['description'] = this.description;
    if (this.parameters != null) {
      data['parameters'] = this.parameters.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Reaction {
  String title;
  String name;
  String description;
  List<Parameters> parameters;

  Reaction({this.title, this.name, this.description, this.parameters});

  Reaction.fromJson(Map<String, dynamic> json) {
    title = json['title'];
    name = json['name'];
    description = json['description'];
    if (json['parameters'] != null) {
      parameters = new List<Parameters>();
      json['parameters'].forEach((v) {
        parameters.add(new Parameters.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['title'] = this.title;
    data['name'] = this.name;
    data['description'] = this.description;
    if (this.parameters != null) {
      data['parameters'] = this.parameters.map((v) => v.toJson()).toList();
    }
    return data;
  }
}