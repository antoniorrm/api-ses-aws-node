FROM node:alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./
RUN yarn

COPY . ./
# RUN yarn build

EXPOSE 3333

# CMD yarn build