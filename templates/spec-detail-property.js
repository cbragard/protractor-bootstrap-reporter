module.exports = function(spec, property) {
    let template =
        `<div class="well"><strong>${property}</strong><p>${spec[property]}</p></div> \n`;
    return template;
}
