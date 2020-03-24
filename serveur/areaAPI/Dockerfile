FROM node:13.0.1-alpine

WORKDIR /area_serveur

COPY . .

EXPOSE 8080

RUN npm install

CMD ["npm", "start"]