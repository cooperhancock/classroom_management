FROM node:14.17.6-bullseye-slim

WORKDIR /usr/src

COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY . .

ENV PORT 3001

RUN npm run build
ENTRYPOINT [ "npm", "run", "start:docker" ]
