# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn global add serve
COPY . .
RUN yarn build

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]

