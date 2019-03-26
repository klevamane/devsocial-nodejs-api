# extends node 10, make the version static as opposed to latest due to potential breaking changes
FROM node:10

# This is where the application will live in the container
WORKDIR /usr/src/app

# move the package.json and package-lock.json files into the container
# we could have done it in two lines, but the wild card (*) makes it easier
COPY package*.json ./

# Install the dependencies
RUN npm install

# copy everything in this project to the container
COPY . . 

# expose port 3000 because that is the port our application runs on
EXPOSE 5000

# the npm start script - to run the app as implemented in the application itself
# CMD ["npm", "start"]
