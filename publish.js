'use strict';
let fs = require('fs');
let data;
exports.publish = function(taffyData) {
    data = taffyData;
    let main_data = {};
    data().each(function(doclet) {
        if (!doclet.undocumented) {
            if (doclet.kind === "class") {
                create_class_if_not_exist(doclet, main_data);
            } else if (doclet.kind === "function") {
                create_class_if_not_exist(doclet, main_data);
                add_method(doclet, main_data);
            } else if (doclet.kind === "typedef") {
                add_typedef(doclet, main_data);
            }
        }
        doclet.attribs = '';
    });
    json_generate(main_data);
};

function create_class_if_not_exist(doclet, main_data) {
    let name = doclet.memberof;
    if (!name) {
        name = doclet.longname;
    }
    if (name.includes("private")) return;

    let type = {
        "methods": {},
        "comment": doclet.comment,
        "description": doclet.description,
        "scope": doclet.scope
    };

    if (doclet.params) {
        type.params = get_params(doclet.params);
    }

    if (!(main_data[name])) {
        main_data[name] = type;
    }
}

function add_method(doclet, main_data) {
    let method = {};
    if (!doclet.memberof || doclet.name.includes("private")) return;

    method.memberof = doclet.memberof;
    method.name = doclet.name;
    method.description = doclet.description;
    method.tags = get_tags(doclet.tags);
    method.returns = get_returns(doclet.returns);
    if (doclet.params) {
        method.params = get_params(doclet.params);
    }
    main_data[doclet.memberof].methods[method.name] = method;
}

function add_typedef(doclet, main_data) {
    if (doclet.name.includes("private")) return;

    if (!main_data.Globals) main_data.Globals = {};

    main_data.Globals[doclet.name] = {
        name: doclet.name,
        description: doclet.description,
        type: doclet.type.names
    };
}

function get_params(data) {
    let params = [];
    var type = '';
    data.forEach(x => {
        if (x.type) { type = x.type.names[0]}
        if (x.type) {
            params.push({
                "type": type,
                "name": x.name,
                "description": x.description,
                "optional": !!x.optional,
                "defaultValue": x.defaultvalue
            });
        }
    });
    return params;
}

function json_generate(data) {
    Object.keys(data).forEach(key => {
        fs.writeFileSync('./out/' + key + '.json', JSON.stringify(data[key]));
    })
}

function get_tags(data) {
    let tags = {};

    if (data) {
        data.forEach(tag => {
            if (!tag.text) return;

            if (tag.text[0] === "[" || tag.text[0] === "{") {
                tags[tag.originalTitle] = JSON.parse(tag.text);
            } else {
                tags[tag.originalTitle] = tag.text;
            }
        });
    }
    return tags;
}

function get_returns(data) {
    let returns = [];
    if (data) {

    data.forEach(return_data => {
        returns.push(return_data.type.names);
    });
    }
    return returns;
}