# STAGE 1: Build Stage (builds + install dependencies)
FROM node:23.11.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . . 
# It means COPY ./ to ./app 
# This command copies everything from your local project directory (on your machine) into the current working directory in the container (/app in this case).


# STAGE 2: Final Light Weight Container

From node:23.11.0-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]



