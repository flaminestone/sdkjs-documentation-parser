FROM node:8.1.4

MAINTAINER Dmitriy.Rotatyy "kvazilife@gmail.com"
COPY . /sdkjs-documentation-parser
WORKDIR /sdkjs-documentation-parser
RUN apt update
RUN apt install -y ruby
RUN npm install -g
CMD  /bin/bash build.sh