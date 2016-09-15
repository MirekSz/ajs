$(document).ready(function() {
    $("button:eq(0)").click(function() {
        addUser();
    })

    $("form").on('submit', function(event) {
        $('form button').prop('disabled', true)
        event.preventDefault();
        var s = $(event.currentTarget).serializeArray().reduce(function(o, v, i) {
            o[v.name] = v.value;
            return o;
        }, {});

        $.ajax({
            type: 'POST',
            data: JSON.stringify(s),
            contentType: 'application/json',
            url: "http://localhost:3100/users"
        }).done(function(data) {
            $('#myModal').modal('hide');
            $('form button').prop('disabled', false);
            loadUsers();
        });

    });

});

function show(id) {
    var req = $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users/" + id
    }).done(function(user) {
        loadTemplate('user').then(function(userTemplate) {

            $("#myModal .modal-body").html(userTemplate(user));
            $('#myModal').modal({})
        })
    })
}

function addUser() {
    loadTemplate('user').then(function(userTemplate) {
        $("#myModal .modal-body").html(userTemplate({}));
        $('#myModal').modal({});
    });
}
