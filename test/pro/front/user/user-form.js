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
