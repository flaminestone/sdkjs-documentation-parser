'use strict';
let fs = require('fs');
let data;
exports.publish = function(taffyData) {
    data = taffyData;
    let main_data = {};
    data().each(function(doclet) {
        if (doclet.kind === "class") {
            main_data = create_class_if_not_exist(doclet, main_data);
        }
        if (doclet.kind === "function") {
            main_data = create_class_if_not_exist(doclet, main_data);
            main_data = add_method(doclet, main_data);
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
    if (!name.includes("private")) {
    if (!(main_data[name])) {
        main_data[name] = { "methods": {},
            "comment": doclet.comment,
            "description": doclet.description,
            "scope": doclet.scope };
    }
    }

    return main_data;
}

function add_method(doclet, main_data) {
    let method = {};
    if (doclet.memberof) {
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
    return main_data;
}

function get_params(data) {
    let params = [];
    data.forEach(x => {
        params.push({"type": x.type.names[0], "name": x.name, "description": x.description});
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
        tags[tag.originalTitle] = tag.text;
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