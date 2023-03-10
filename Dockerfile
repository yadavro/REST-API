FROM node:19
WORKDIR /user/src/app

COPY package*.json ./

RUN npm install


COPY . .


EXPOSE 3000
CMD [ "node" , "app.js" ]
