# context must be root dir of this project
FROM node:13.8

RUN mkdir /code
WORKDIR /code
COPY ./main.js /code/
COPY ./package.json /code/
COPY ./package-lock.json /code/
RUN npm install

CMD ["bash", "-c", "node main.js"]
