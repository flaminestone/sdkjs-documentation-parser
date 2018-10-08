Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
['/sdkjs-documentation-parser/tmp/word.js', '/sdkjs-documentation-parser/tmp/cell.js', '/sdkjs-documentation-parser/tmp/slide.js'].each do |script|
  data = File.read(script).match(/\(function\s?\(window\,\s?builder\)\s?{(.*)}/m)[1]
    File.open(script, 'w') do |file|
        file.write data
    end
end
