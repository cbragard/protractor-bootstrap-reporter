module.exports = function(data) {
    let template =
        `<html> \n
            \t <head> \n
                \t\t <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" media="all"/> \n
            \t </head> \n
            \t <body> \n
                \t\t <div class="container"> ${data} </div>
                \t\t <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
                \t\t <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script> \n
            \t </body> \n
        </html> \n`;
    return template;
}
