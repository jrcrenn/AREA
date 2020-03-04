FROM node:10

EXPOSE 8081

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . .

#RUN cp /var/lib/apk/client.apk ./public/

CMD cp /var/lib/apk/client.apk ./public/ ; npm start