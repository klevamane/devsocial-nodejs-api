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
# the RUN command enables us to run linux commands
# this is executed on the container
RUN npm install

# copy everything else in this project to the container
# note that the copy command is executed on the host
# note that copy can be executed via linux but this is executed on the host device
# copy files on the host to inside the container image
# note that for instand `RUN cp <source> <destination> will be run instide the docker container`
COPY . . 

# expose port 5000 because that is the port our application runs on
# but note our prefered standard port should be 80 when deploying to prod env
EXPOSE 5000

# the npm start script - to run the app as implemented in the application itself
# this actually executes an entry point linux command
# this is always/usually present in a dockerfile
# CMD is an entry point command, that marks to docker that this is the command to be run for entry
# it is different from `RUN npm start`
# CMD ["npm", "start"]
