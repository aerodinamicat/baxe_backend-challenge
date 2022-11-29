FROM node:18
WORKDIR /usr/challenge/app/
COPY package*.json ./

RUN npm install --global ts-node
RUN npm install

RUN mkdir data
COPY ./mockApi.ts .
COPY ./data/* ./data/

CMD ["ts-node", "mockApi.ts"]

EXPOSE 6789
