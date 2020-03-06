FROM node
WORKDIR /usr/src/app

USER root

COPY . .

RUN npm install


EXPOSE 9999

CMD ["npm", "run", "start:dev"]