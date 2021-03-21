FROM node:15

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn add typescript ts-node tsoa -g

EXPOSE 8000

CMD ["npm", "run", "start"]