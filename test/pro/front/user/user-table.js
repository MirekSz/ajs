$(document).ready(function() {


    $("#users tbody").empty();
    $.ajax({
        url: 'http://localhost:3100/users'
    }).done(function(data) {
        loadTemplate('user-rows').then(function(template) {
            $("#users tbody").append(template({
                users: data
            }))

            $("#users tbody tr").click(function(event) {
                var id = $(event.currentTarget).attr('data-id');
                showDetails(id);
            });
        })
    })

});


function showDetails(id) {
    animateHideDetails();
    $.ajax({
        url: 'http://localhost:3100/users/' + id
    }).done(function(user) {
        loadTemplate('user').then(function(template) {
            var html = template(user);
            $("#workspace").html(html);
            animateShowDetails();
        })
    })
}

function animateHideDetails() {
    $("#workspace").animate({
        width: "hide"
    }, 500, function() {});

}


function animateShowDetails() {
    $("#workspace").animate({
        width: "toggle"
    }, 500, function() {});
}





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
