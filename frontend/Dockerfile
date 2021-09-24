FROM node:14.17.6-bullseye-slim as builder

WORKDIR /usr/src

COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY . .

RUN npm run build

# Runner =================
FROM nginx:1.16.0-alpine

# /app/dist/lighthouse comes from angular.json build output path
COPY --from=builder /usr/src/build /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
