FROM node:13-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
##COPY yarn.lock /app
COPY . /app

#RUN yarn install
#CMD ["yarn", "start"]

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent
CMD ["npm", "start"]