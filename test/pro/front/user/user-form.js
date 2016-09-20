$(document).ready(function() {
    $("#addUser").click(function() {
        addUser();
    });
});

function addUser() {
    loadTemplate('user').then(function(userTemplate) {
        $("#myModal .modal-body").html(userTemplate({}));
        $('#myModal').modal({});
    });
}


function show(id) {
    $.ajax({
        url: 'http://localhost:3100/users/' + id
    }).done(function(user) {
        loadTemplate('user').then(function(userTemplate) {
            $("#myModal .modal-body").html(userTemplate(user));
            $('#myModal').modal({});
        })
    })

}
