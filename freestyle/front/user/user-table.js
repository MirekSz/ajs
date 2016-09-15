$(document).ready(function() {

    Handlebars.registerHelper('isSelected', function(input, color) {
        return input === color ? 'selected' : '';
    });

    loadUsers();
    // $("table thead tr th").each(function(index, element) {
    //     $(element).html("<a href='#'><span class='glyphicon'></span>" + $(element).html() + "</a>");
    // })

    $("table thead tr th").click(function(event) {
        var th = $(event.target);
        var span = th.find('span');
        var clazz = span.attr('class');
        if (clazz.indexOf('glyphicon glyphicon-sort-by-attributes-alt') != -1) {
            span.removeAttr('class');
            span.attr('class', 'glyphicon glyphicon-sort-by-attributes');
        } else {
            span.removeAttr('class');
            span.attr('class', 'glyphicon glyphicon-sort-by-attributes-alt');
        }
    })
});


function loadUsers() {
    $("table tbody").empty();
    $("#workspace").empty();
    $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users"
    }).done(function(users) {
        loadTemplate('user-rows').then(function(rows) {
            $("table tbody").append(rows({
                users: users
            }));
            $("table tbody tr").click(function(event) {
                if (!event.ctrlKey) {
                    $("table tbody tr").removeClass('active-row');
                }
                $(event.currentTarget).addClass('active-row');
                let id = $(event.currentTarget).attr('data-id');
                showDetails(id);

                console.log($("table tbody tr.active-row").map((index, element) => $(element).attr('data-id')).toArray())
            })
        })
    });
}
var currentRequest;
var nextDetails;

function showDetails(id) {
    if (nextDetails) {
        $("#workspace").html(nextDetails);

        animateDetails();
        nextDetails = undefined;
        return;
    }
    if (currentRequest) {
        currentRequest.abort();
    }
    prefetch(id)
    currentRequest = $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users/" + id,
    }).done(function(user) {
        loadTemplate('user').then(function(userTemplate) {
            let html = userTemplate(user);;
            $("#workspace").html(html);

            animateDetails();

        });
    });
}

function prefetch(id) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users/" + (Number.parseInt(id) + 1),
    }).done(function(user) {
        loadTemplate('user').then(function(userTemplate) {
            nextDetails = userTemplate(user);
        });
    });
}

function animateDetails() {
    $("#workspace").animate({
        opacity: 1,
        width: "hide"
    }, 'fast', function() {});

    $("#workspace").animate({
        opacity: 1,
        width: "toggle"
    }, 500, function() {});
}

function remove(id) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function() {
        $.ajax({
            type: 'DELETE',
            url: "http://localhost:3100/users/" + id,
            dataType: 'html'
        }).done(function(user) {
            loadUsers();
        });
    });
}

function loadTemplate(name) {
    return $.ajax({
        type: 'GET',
        url: "templates/" + name + ".hbs"
    }).promise().then(function(data) {
        return Handlebars.compile(data);
    });
}