module.exports = function(clzz, id, property, count) {
    let template =
        `<button class="btn btn-default ${clzz}" data-toggle="collapse" data-target="#inn${id}"> ${count} ${property}</button> \n`;
    return template;
}
