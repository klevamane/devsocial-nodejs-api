# extends node 10, as the image its going to be based of
# it uses the resided node 10 image else it downloads it
# make the version static as opposed to latest due to potential breaking changes 
FROM node:10

# This is where the application will live in the container
WORKDIR /usr/src/app

# move the package.json and package-lock.json files into the container
# we could have done it in two lines, but the wild card (*) makes it easier
# ./ means the working directory ie WORKDIR
COPY package*.json ./

# Install the dependencies
RUN npm install

# copy everything else in this project to the container
COPY . . 

# expose port 5000 because that is the port our application runs on
# but note our prefered standard port should be 80 when deploying to prod env
EXPOSE 5000

# the npm start script - to run the app as implemented in the application itself
# CMD ["npm", "start"]
