FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV CI=true

# Run tests and fail if they don't pass
RUN npm run test || exit 1

FROM build-stage as production-stage

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm run build

FROM nginx:1.20-alpine
COPY --from=production-stage /usr/src/app/build /usr/share/nginx/html
