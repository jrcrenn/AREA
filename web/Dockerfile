FROM node:latest

WORKDIR /web

COPY package*.json /web/

RUN yarn install

COPY . /web/

EXPOSE 8080

CMD ["yarn", "start"]
