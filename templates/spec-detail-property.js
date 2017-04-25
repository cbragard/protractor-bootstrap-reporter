module.exports = function(spec, property) {
    let template =
        `<div class="well"><strong>${property}</strong>${spec[property]}</div> \n`;
    return template;
}
