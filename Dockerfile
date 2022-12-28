FROM node:14

WORKDIR /home/app

EXPOSE 3335

COPY . .

RUN npm install