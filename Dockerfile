FROM public.ecr.aws/bitnami/node:14-debian-10
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN ls
EXPOSE 8080
CMD [ "node", "app.js" ]


#RUN chmod +x start.sh

#ENTRYPOINT ["./start.sh"]