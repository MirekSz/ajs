$(document).ready(function() {
    $("table tbody").empty();
    $("#workspace").empty();
    $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users"
    }).then(function(users) {
        loadTemplate('user-rows').then(function(template) {
            var rows = template({
                users: users
            });
            $("table tbody").append(rows);
        })
    })
});






function loadTemplate(name) {
    return $.ajax({
        type: 'GET',
        url: "templates/" + name + ".hbs"
    }).promise().then(function(data) {
        return Handlebars.compile(data);
    });
}
Handlebars.registerHelper('isSelected', function(input, color) {
    return input === color ? 'selected' : '';
});

function remove(id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function() {});
}
