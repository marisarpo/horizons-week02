var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
$(window).scroll(function() {
  console.log($(window).scrollTop())
  console.log($(window).height())
   if($(window).scrollTop() + height === $(document).height()-1) {
       addMore();
   }
});

function addMore() {
  for (var i=0; i<50; i++){
    $.ajax('https://randomuser.me/api/', {
      success: function(data) {
        console.log(data)
      }
    })
    var newNameDiv = `<div class="tile">
                    		${newName}
                    	</div>`
  }
}
