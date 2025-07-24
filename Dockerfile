FROM node:22-alpine as development

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN VITE_API_BASE_URL=http://api:4000/api/v1 npm run build

EXPOSE 5173

RUN ["npm", "run", "dev", "--", "--host"]

FROM node:22-alpine as production

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 5173

RUN ["npm", "run", "dev", "--", "--host"]
