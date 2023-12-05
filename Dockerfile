FROM node:16.20-slim

ADD ./src /teachhub-backoffice/src/
ADD ./public /teachhub-backoffice/public/
ADD ./package.json /teachhub-backoffice/
ADD ./package-lock.json /teachhub-backoffice/
ADD ./tsconfig.json /teachhub-backoffice/

WORKDIR /teachhub-backoffice/

RUN npm ci && npm run build

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Queremos que el build corra como dev
# (ahi tenemos las dependencias para buildear todo).

RUN echo "Using node_env $NODE_ENV"

# Entrypoint custom

ENTRYPOINT ["/bin/sh", "-c", "npx serve -s build"]

