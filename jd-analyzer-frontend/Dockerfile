FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]