
FROM node:alpine3.18

#build app
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
RUN npm run build

#serve with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
