FROM node:latest

WORKDIR /api

COPY package*.json /api/

RUN yarn install

COPY . /api/

EXPOSE 3000

CMD ["yarn", "start"]