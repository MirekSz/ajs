$(document).ready(function() {
    let table = $("#users");;
    console.log(table.find("tr"))
        // table.append('<tr><td>ad</td></tr>')

    // table.find("tr")[3].remove();

    let tablefindtrtd2 = table.find("tr").find("td:eq(2)");
    tablefindtrtd2.each(function(index, element) {
        $(element).text('s')
    })

    $("button:eq(0)").click(function() {
        // let table = $("#users");
        // let length = table.find('tr').length;
        // table.append(`<tr><td>${length}</td><td>${length}</td><td>${length}</td></tr>`);
        loadTemplate('user').then(function(userTemplate) {
            $("#myModal .modal-body").html(userTemplate({}));

            $('#myModal').modal({});
        });
    })


    $("table tr").click(function(event) {
        $(event.currentTarget).remove()
    })

    $(".container").animate({
        opacity: 1,
        height: "toggle"
    }, 500, function() {
        // Animation complete.
    });

    Handlebars.registerPartial("field", '<input name="{{name}}" value="{{de name}}" />')
        //{{> field name="fName"}}
    Handlebars.registerPartial("field2", ` <div class="form-group col-xs-6">
    <label for="{{name}}">{{label}}</label>
    <input  class="form-control" name="{{name}}" value="{{de name}}" placeholder="{{label}}">
  </div>`)
        //{{> field2 name="fName" label="Imię"}} {{> field2 name="lName" label="Nazwisko"}}
    Handlebars.registerHelper('de', function(obj, options) {
        return options.data.root[obj];
    })

    $("form").on('submit', function(event) {
        event.preventDefault();
        console.time('jquery');
        let form = $(event.currentTarget).closest('div').siblings('.modal-body').find('form');
        console.timeEnd('jquery');
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
            loadUsers();
        });

        console.log(s)
        $('#myModal').modal('hide');
    });

    loadUsers();
})

function closeTable() {
    $(".container").animate({
        opacity: 1,
        height: "hide"
    }, 500, function() {
        // Animation complete.
    });
}

function loadUsers() {
    $("table tbody").empty();
    $.ajax({
        type: 'GET',
        url: "http://localhost:3100/users"
    }).done(function(data) {

        loadTemplate('user-row').then(function(row) {
            for (i = 0; i < data.length; i++) {
                var user = data[i];

                $("table").append(row(user));
            }
        })
    });
}

function loadTemplate(name, callback) {
    return $.ajax({
        type: 'GET',
        url: "partials/" + name + ".html"
    }).promise().then(function(data) {
        return Handlebars.compile(data);
    });
    // .done(function(data) {
    //     callback(Handlebars.compile(data));
    // })
}

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

    setTimeout(() => {
        req.abort();
    }, 100)
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




// $.ajax({
//   type:'POST',
//   data: JSON.stringify({a:'mirek'}),
//   url: "http://localhost:3100/users"
// }).done(function( data ) {
//   console.log(data)
// });
