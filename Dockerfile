###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:22.9.0-alpine3.20 AS development

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:22.9.0-alpine3.20 AS build

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV=production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:22.9.0-alpine3.20 AS production

COPY --chown=node:node --from=build /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
