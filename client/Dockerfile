FROM node:14

# Working directory be app
RUN mkdir -p /app/client

WORKDIR /app/client

# Copy dependencies
COPY ./client/package.json ./

# Install dependencies
RUN npm install

# Copy files
COPY ./client/ .

# # Run tests
# RUN npm run test

EXPOSE 3000

CMD ["npm", "start"]