FROM nginx:alpine
ENV APP_HOME /usr/share/nginx/html
COPY ./src/.vuepress/dist ${APP_HOME}/
RUN chmod -R 755 ${APP_HOME}
EXPOSE 80
EXPOSE 443
WORKDIR ${APP_HOME}