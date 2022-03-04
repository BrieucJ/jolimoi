FROM node:14

# Create server directory
RUN mkdir -p /app/server

WORKDIR /app/server

# Copy dependencies
COPY ./server/package.json ./

# Install dependencies
RUN npm install

# Copy files
COPY ./server/ . 

# Run tests
RUN npm run test

# Exports
EXPOSE 5000

CMD ["npm", "start"]