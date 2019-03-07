@echo off
REM clear folders
rd out /S /Q
md out
rd tmp /S /Q
md tmp

REM copy files
copy ..\word\apiBuilder.js tmp\word.js
copy ..\cell\apiBuilder.js tmp\cell.js
copy ..\slide\apiBuilder.js tmp\slide.js

REM delete anonymous functions
ruby reformat_script_win.rb

REM generate docs
node node_modules\jsdoc\jsdoc.js tmp\word.js  -t .
move out word
md out
node node_modules\jsdoc\jsdoc.js tmp\cell.js  -t .
move out cell
md out
node node_modules\jsdoc\jsdoc.js tmp\slide.js  -t .
move out slide
md out

REM move to out\
move word out\word
move cell out\cell
move slide out\slide