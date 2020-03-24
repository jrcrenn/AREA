FROM node:13.0.1-alpine

WORKDIR /timer

COPY . .

EXPOSE 8080

RUN npm install

CMD ["node", "timer.js"]