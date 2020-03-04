class ConnectToServiceModel {

  String serviceName;

  ConnectToServiceModel(this.serviceName);

  ConnectToServiceModel.fromJson(Map<String, dynamic> json) {
      this.serviceName = json['name'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();

    data['name'] = this.serviceName;

    return data;
  }

}