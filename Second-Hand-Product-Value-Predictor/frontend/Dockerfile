FROM node:20-alpine
WORKDIR /app

COPY . .
COPY package*.json ./

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]