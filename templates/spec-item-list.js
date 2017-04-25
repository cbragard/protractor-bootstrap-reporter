module.exports = function(spec, clzz) {
    let template =
        `<li class="list-group-item"> \n
            \t <div class="media"> \n
                \t\t <div class="media-left"> \n
                    \t\t\t <a href="${spec.id}.html"> \n
                        \t\t\t\t <img height="135" src="../png/${spec.id}.png"> \n
                    \t\t\t </a> \n
                \t\t </div> \n
                \t\t <div class="media-body"> \n
                    \t\t\t <h2>${spec.id}</h2> \n
                    \t\t\t <p>${spec.fullName}</p> \n
                    \t\t\t <a href="${spec.id}.html" class="btn ${clzz}"> \n
                        \t\t\t\t <span class="glyphicon glyphicon-search"></span> \n
                        \t\t\t\t ${spec.status} \n
                    \t\t\t </a> \n
                \t\t </div> \n
            \t </div> \n
        </li> \n`;
    return template;
}
