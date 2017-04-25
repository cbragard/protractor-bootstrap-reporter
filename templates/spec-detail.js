module.exports = function(html, spec) {
    let template =
        `<div class="media"> \n
            \t <div class="media-body"> \n
                ${html}
            \t </div> \n
            \t <div class="media-right"> \n
                <img src="../png/${spec.id}.png" alt="${spec.id}" class=""> \n
            \t </div> \n
        </div> \n`;
    return template;
}
