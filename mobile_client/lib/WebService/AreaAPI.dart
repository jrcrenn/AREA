import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';
import 'package:http/http.dart';
import 'package:mobile_client/Models/ConnectToServiceModel.dart';
import 'package:mobile_client/Models/ServiceModel.dart';
import 'package:mobile_client/Models/TokenResponse.dart';

class AreaAPI {

  static final AreaAPI _instance = new AreaAPI._internal();

  String token;

  List<ServiceModel> services;

  factory AreaAPI() {
    return _instance;
  }

  AreaAPI._internal();

  final String baseUrl = "http://10.26.112.53:36969";

  Future<TokenResponse> loginUser(String login, String password) async {
    final hash = sha512.convert(utf8.encode(password));

    final response = await http.post('$baseUrl/auth/signin?username=$login&password=$hash');

    if (response.statusCode == 200) {
      final tok = TokenResponse.fromJson(jsonDecode(response.body));
      token = tok.token;
      return tok;
    } else {
      throw Exception('Failed to login user');
    }
  }

  Future<TokenResponse> registerUser(String login, String password) async {
    final hash = sha512.convert(utf8.encode(password));

    final response = await http.post('$baseUrl/auth/signup?username=$login&password=$hash');

    if (response.statusCode == 200) {
      return TokenResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to register user ' + response.body);
    }
  }

  Future<List<ServiceModel>> getServices() async {
    if (services != null)
      return services;
    final response = await http.get('$baseUrl/list');

    if (response.statusCode == 200) {
      services = (jsonDecode(response.body)['services']).map<ServiceModel>((json) => ServiceModel.fromJson(json)).toList();
      return services;
    } else {
      throw Exception('Failed to retrieve services ' + response.body);
    }
  }

  Future<List<ServiceModel>> getMyServices() async {
    final client = HttpClient();
    final request = await client.getUrl(Uri.parse('$baseUrl/service'));
    request.headers.add(HttpHeaders.authorizationHeader, "Bearer $token");
    final response = await request.close();
    response.transform(utf8.decoder).listen((event) {
      print(event);
    });
    throw Exception("bite");

/*    if (response.statusCode == 200) {
      return jsonDecode(await response.stream.bytesToString()).map((json) => ServiceModel.fromJson(json)).toList();
    } else {
      throw Exception('Failed to retrieve services');
    }*/
  }

  Future<Response> connectToService(String serviceName) async {

    final connectModel = new ConnectToServiceModel(serviceName);

    final response = await http.post('$baseUrl/service/connect', body: connectModel.toJson(), headers:
    {
      'authorization': 'Bearer $token'
    });

    return response.statusCode == 200 ? response : throw Exception('Faield to connect to service');
  }

}
