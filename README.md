#For run
`jsdoc example.js  -t .`

#For debug
`path_to_node_modules/jsdoc/jsdoc.js example.js  -t .`

Warning!! Generator will be work only with js files, without global noname functions. Delete at first noname functions and run generator

Using:
 - Build docker image from sdkjs-documentation-parser project
 - Run from sdkjs project
    `docker run -it -v $PWD/word/apiBuilder.js:/sdkjs-documentation-parser/word.js -v $PWD/cell/apiBuilder.js:/sdkjs-documentation-parser/cell.js -v $PWD/slide/apiBuilder.js:/sdkjs-documentation-parser/slide.js -v $PWD/out:/sdkjs-documentation-parser/out flamine/sdkjs-documentation-parser`
 All documentation will be in `out` folder, in sdkjs project.
