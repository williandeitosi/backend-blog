FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npx prisma db push
CMD [ "npm", "run", "start:prod" ]