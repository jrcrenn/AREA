# AREA

Business application that connects services to automate tasks between them.

Developped in Node.js, Vue.js and Kotlin.

## Usage

From the root of the repository:

    docker-compose build && docker-compose up

## Documentation
### server
You can find the documentation for the REST API on http://localhost/8080/api-docs

### client_web
The architecture is documented in **client_web/doc/archi/archi.pdf**.

## Troubleshooting

Our project uses an **ngrok tunnel** to provide for the area2020.ngrok.io domain, which can be prone to bugs.
If such events ever occur, please edit the following values to one new domain name of your choice, in each of the following files:

| file | vars |
|--|--|
| server/.env | SERVER_DOMAIN, SERVER_URL |
| client_web/.env | VUE_APP_PUBLIC_SERVER_URL |
| client_web/vue.config.js | proxy |
| client_mobile -> globalApp | subdomain |
