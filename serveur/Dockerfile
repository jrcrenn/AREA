FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /web-client
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 8080
CMD ["npm", "start"]