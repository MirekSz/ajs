$(document).ready(function(){
  let table = $("#users");;
  console.log(table.find("tr"))
  table.append('<tr><td>ad</td></tr>')

  table.find("tr")[3].remove();

  let tablefindtrtd2 = table.find("tr").find("td:eq(2)");
  tablefindtrtd2.each(function(index,element){
    $(element).text('s')
  })

  $("button:eq(0)").click(function(){
    let table = $("#users");
    let length = table.find('tr').length;;
    table.append(`<tr><td>${length}</td><td>${length}</td><td>${length}</td></tr>`);
  })


$("table tr").click(function(event){
  $(event.currentTarget).remove()
})

$( ".container" ).animate({
    opacity: 1,
    height: "toggle"
  }, 2000, function() {
    // Animation complete.
  });


})

function closeTable(){
  $( ".container" ).animate({
      opacity: 1,
      height: "hide"
    }, 2000, function() {
      // Animation complete.
    });
}

$.ajax({
  type:'GET',
  url: "http://localhost:3100/users"
}).done(function( data ) {

  loadTemplate(['user','user-row'],function(userTemplate, row){
    for(i=0;i<data.length;i++){
      var user = data[i];

      $("table").append(row(user));
      $("body").append(userTemplate(user));
    }
    $("form button").click(function(event){
      event.preventDefault();
      var s = $(event.currentTarget.parentElement).serializeArray()
      console.log(s)
    })
  })

});


function loadTemplate(array,callback){
  var requests = [];
  for(i=0;i<array.length;i++){
    let request =   $.ajax({
      type:'GET',
      url: "partials/"+array[i]+".html"
    })
    requests.push(request);
  }

  $.when.apply($,requests).then(function(){
      let results = [];

    for(i=0;i<arguments.length;i++){
      results.push(Handlebars.compile(arguments[i][0]));
  }
    callback.apply({},results)
  });

}


// $.ajax({
//   type:'POST',
//   data: JSON.stringify({a:'mirek'}),
//   url: "http://localhost:3100/users"
// }).done(function( data ) {
//   console.log(data)
// });
