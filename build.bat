@echo off

REM variables
set sdkjsPath=sdkjs
set outPath=jsdoc
set branch=master
set cloneRepo=Y
set parseDocs=Y

if %cloneRepo% NEQ Y goto skipClone
    REM clear folder
    rd %sdkjsPath% /S /Q
    md %sdkjsPath%

    git clone -b %branch% https://github.com/ONLYOFFICE/sdkjs.git %sdkjsPath%
:skipClone

if %parseDocs% NEQ Y goto skipParse
    REM clear tmp & out folder
    rd tmp /S /Q
    md tmp
    rd out /S /Q
    md out
    rd %outPath% /S /Q
    md %outPath%

    REM copy files
    copy %sdkjsPath%\word\apiBuilder.js tmp\word.js
    copy %sdkjsPath%\cell\apiBuilder.js tmp\cell.js
    copy %sdkjsPath%\slide\apiBuilder.js tmp\slide.js

    REM download dependencies
    call npm install

    echo deleting anonymous functions
    node reformat_script.js

    echo generating docs
    node node_modules\jsdoc\jsdoc.js tmp\word.js  -t .
    move out %outPath%\word
    md out
    node node_modules\jsdoc\jsdoc.js tmp\cell.js  -t .
    move out %outPath%\cell
    md out
    node node_modules\jsdoc\jsdoc.js tmp\slide.js  -t .
    move out %outPath%\slide
    md out
:skipParse