Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
['sdkjs/word/apiBuilder.js', 'sdkjs/cell/apiBuilder.js', 'sdkjs/slide/apiBuilder.js'].each do |script|
    data = File.read(script).match(/function\(window\, builder\)\s{(.*)}/m)[0]
    File.open(script, 'w') do |file|
        file.write data
    end
end
