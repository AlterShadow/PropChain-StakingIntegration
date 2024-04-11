FROM node:20.2.0-alpine as builder

WORKDIR /app

RUN apk update && apk add --no-cache ca-certificates git

COPY ./package.json ./
COPY ./yarn.lock ./

# RUN npm i --legacy-peer-deps
RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.19.0
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
