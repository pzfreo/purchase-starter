FROM node:15.12.0-buster-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn global add typescript ts-node tsoa

EXPOSE 8000
CMD ["yarn", "run", "start"]