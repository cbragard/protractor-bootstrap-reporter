module.exports = function(spec, property) {
    let template =
        `<div class="well"> \n
            \t <strong>${spec[property]}</strong> \n
            \t <a href="../json/${spec.id}.json" target="_blank"> \n
                \t\t <span class="glyphicon glyphicon-wrench"></span> \n
                \t\t JSON \n
            \t </a> \n
        </div> \n`;
    return template;
}
