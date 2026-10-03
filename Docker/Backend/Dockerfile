FROM node:20-alpine

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app
# // image creation time

RUN npm install  

COPY ./server.js . /app


# image run time
CMD ["node","server.js"]