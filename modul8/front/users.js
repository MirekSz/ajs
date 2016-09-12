$(document).ready(function () {
    let table = $("#users");
    ;
    console.log(table.find("tr"))
    table.append('<tr><td>ad</td></tr>')

    table.find("tr")[3].remove();

    let tablefindtrtd2 = table.find("tr").find("td:eq(2)");
    tablefindtrtd2.each(function (index, element) {
        $(element).text('s')
    })

    $("button:eq(0)").click(function () {
        let table = $("#users");
        let length = table.find('tr').length;
        table.append(`<tr><td>${length}</td><td>${length}</td><td>${length}</td></tr>`);
    })


    $("table tr").click(function (event) {
        $(event.currentTarget).remove()
    })

    $(".container").animate({
        opacity: 1,
        height: "toggle"
    }, 500, function () {
        // Animation complete.
    });

    Handlebars.registerPartial("field",'<input name="{{name}}" value="{{de name}}" />')
    Handlebars.registerPartial("field2",` <div class="form-group col-xs-6">
    <label for="{{name}}">{{label}}</label>
    <input  class="form-control" name="{{name}}" value="{{de name}}" placeholder="{{label}}">
  </div>`)
    Handlebars.registerHelper('de', function(obj, options) {
        return options.data.root[obj];
    })

})

function closeTable() {
    $(".container").animate({
        opacity: 1,
        height: "hide"
    }, 500, function () {
        // Animation complete.
    });
}

$.ajax({
    type: 'GET',
    url: "http://localhost:3100/users"
}).done(function (data) {

    loadTemplate('user-row', function (row) {
        for (i = 0; i < data.length; i++) {
            var user = data[i];

            $("table").append(row(user));
            // $("body").append(userTemplate(user));
        }
        $("form button").click(function (event) {
            event.preventDefault();
            var s = $(event.currentTarget.parentElement).serializeArray()
            console.log(s)
        })
    })

});


function loadTemplate(name, callback) {
    $.ajax({
        type: 'GET',
        url: "partials/" + name + ".html"
    }).done(function (data) {
        callback(Handlebars.compile(data));
    })
}

function show(id) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users/"+id
    }).done(function (user) {
        loadTemplate('user', function (userTemplate) {
            $("#myModal .modal-body").html(userTemplate(user));

            $('#myModal').modal({})
        })
    });
}




// $.ajax({
//   type:'POST',
//   data: JSON.stringify({a:'mirek'}),
//   url: "http://localhost:3100/users"
// }).done(function( data ) {
//   console.log(data)
// });
