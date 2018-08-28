FROM node:4.8.7-alpine as builder
WORKDIR /srv/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN cp config.example.js config.js
RUN yarn build

FROM nginx:1.12-alpine
WORKDIR /srv/app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /srv/app/dist /srv/app/html
EXPOSE 80

