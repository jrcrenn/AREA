class TokenResponse {
  final String token;

  TokenResponse(this.token);

  factory TokenResponse.fromJson(Map<String, dynamic> json) {
    return TokenResponse(json['token']);
  }
}
