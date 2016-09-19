$(document).ready(function () {

});






function loadTemplate(name) {
    return $.ajax({
        type: 'GET',
        url: "templates/" + name + ".hbs"
    }).promise().then(function (data) {
        return Handlebars.compile(data);
    });
}
    Handlebars.registerHelper('isSelected', function (input, color) {
        return input === color ? 'selected' : '';
    });