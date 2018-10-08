FROM node:8.1.4



MAINTAINER Dmitriy.Rotatyy "kvazilife@gmail.com"
RUN mkdir /sdkjs-documentation-parser
WORKDIR /sdkjs-documentation-parser
ADD . /sdkjs-documentation-parser

RUN apt update
RUN apt install -y ruby
RUN npm install -g
RUN git clone https://github.com/ONLYOFFICE/sdkjs.git
RUN ruby build/reformat_script.rb
RUN node_modules/jsdoc/jsdoc.js sdkjs/word/apiBuilder.js  -t .
RUN mv out word && mkdir out
RUN node_modules/jsdoc/jsdoc.js sdkjs/cell/apiBuilder.js  -t .
RUN mv out cell && mkdir out
RUN node_modules/jsdoc/jsdoc.js sdkjs/slide/apiBuilder.js  -t .
RUN mv out slide