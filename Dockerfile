FROM node:16

WORKDIR /usr/src/node_ocr

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]