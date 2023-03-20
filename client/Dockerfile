# Stage 1, "builder" based on Node.js, to build and compile the frontend.
FROM node:14 as builder
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

# Stage 2, based on Nginx, to take the compiled app and config, ready for production with Nginx.
FROM nginx:stable-alpine
# Copy the nginx.conf
COPY --from=builder /app/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

