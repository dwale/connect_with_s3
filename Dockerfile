FROM public.ecr.aws/bitnami/node:12-debian-10
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN ls
EXPOSE 8888

RUN chmod +x start.sh

ENTRYPOINT ["./start.sh"]