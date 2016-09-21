$(document).ready(function() {
    //mires
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
    });

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

            $("table tbody tr td span.glyphicon.glyphicon-search").click(function(event) {
                // event.stopPropagation();
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
    //    prefetch(id)

    animateHideDetails();
    currentRequest = $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users/" + id,
    }).done(function(user) {
        loadTemplate('user').then(function(userTemplate) {
            let html = userTemplate(user);
            $("#workspace").html(html);
            $("#workspace input, #workspace select").attr('readonly', 'true')
            animateShowDetails();

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
        }).done(function(user) {
            loadUsers();
        });
    });
}
var cache = {};

function loadTemplate(name) {
    if (cache[name]) {
        var dfd = $.Deferred();
        dfd.resolve(cache[name]);
        return dfd;
    }
    return $.ajax({
        type: 'GET',
        url: "templates/" + name + ".hbs"
    }).promise().then(function(data) {
        let compiled = Handlebars.compile(data);;
        cache[name] = compiled;
        return compiled
    });
}
