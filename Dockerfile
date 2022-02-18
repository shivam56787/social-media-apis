FROM node:16.13.2-alpine
WORKDIR /squareboat-assessment
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]