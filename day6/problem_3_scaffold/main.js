var body = document.body,
    html = document.documentElement;
var nameCount = 0;

var height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
addMore();
function addMore() {
 var allNewNames = "";
 var nameArr = [];
 for (var i=0; i<50; i++){
   $.ajax('https://randomuser.me/api/', {
     success: function(data) {
       var newName = "";
       newName += data.results[0].name.first+" "+data.results[0].name.last;
       var newNameDiv = $(`<div class="tile">
                       		${newName}
                       	</div>`);
       nameCount++;
       $('body').append(newNameDiv)
       $('.countNumber').text(nameCount);
       if (nameCount%50 === 0) {
         $('.staStop').text("stop");
         setTimeout(function() {
           $('.staStop').text("");
         }, 2000);
       }
     }
   })
 }
}

$(window).scroll(function() {
   if(parseInt($(window).scrollTop() + height) === $(document).height()-1) {
     console.log("got")
     $('.staStop').text("start");
     addMore();
   }
});
