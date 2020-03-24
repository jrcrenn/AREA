FROM node:13.0.1-alpine

COPY . /app
WORKDIR /app

RUN mkdir -p /mobile_app/
RUN ln -s /mobile_app/client.apk public/client.apk

RUN npm install

CMD ["npm", "start"]
