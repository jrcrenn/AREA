FROM node:latest

WORKDIR /web

COPY package*.json /web/

RUN npm install

COPY . /web/

EXPOSE 8080

CMD ["npm", "start"]