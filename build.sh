#!/usr/bin/env
# clearing folders
rm -rf out/*
rm -rf tmp/*

# copy files. It need because in different way host apiBuilder files will be changes.
cp word.js tmp/word.js
cp cell.js tmp/cell.js
cp slide.js tmp/slide.js

# delete anonymous function. It need because in other way jsdoc will not work correctly
ruby reformat_script.rb

# generating documentations and move it to new directory
node_modules/jsdoc/jsdoc.js tmp/word.js  -t .
mkdir word && mv out/* word/
node_modules/jsdoc/jsdoc.js tmp/cell.js  -t .
mkdir cell && mv out/* cell/
node_modules/jsdoc/jsdoc.js tmp/slide.js  -t .
mkdir slide && mv out/* slide/

# move all documentation for out dir
mv word out/
mv cell out/
mv slide out/

