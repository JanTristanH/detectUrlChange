FROM node:14-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

# Bundle app source
COPY . .

RUN npm install

# Run the command on container startup
CMD ["npm start"]
#CMD cron && tail -f /var/log/cron.log
