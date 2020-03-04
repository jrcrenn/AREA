FROM node:12

EXPOSE 8080

WORKDIR /app

COPY src/ src/
COPY jwt_keys/ jwt_keys/
COPY package.json .
COPY package-lock.json .

RUN npm install

CMD npm start