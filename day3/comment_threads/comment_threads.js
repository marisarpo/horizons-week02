$(".post").click(function() {
  var name=prompt('name');
  var comment=prompt('comment');
$('.comments').append("<div class='comment'><div class='author'>'" +
name +
 "' ' says: ' </div><div class='message'>' "+
 comment +
"  </div><div class='controls'><button class='hide-replies btn btn-default'>'Hide Replies'</button><button class='show-replies btn btn-default'>'Show Replies'</button><button class='reply btn btn-default'>'Reply'</button></div><div class='replies'></div></div>")
});


$(".comments").on('click', '.reply', function() {
  var name = prompt('name');
  var comment = prompt('comment');
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(("<div class='comment'><div class='author'>'" +
  name +
   "' ' says: ' </div><div class='message'>' "+
   comment +
  "  </div><div class='controls'><button class='hide-replies btn btn-default'>'Hide Replies'</button><button class='show-replies btn btn-default'>'Show Replies'</button><button class='reply btn btn-default'>'Reply'</button></div><div class='replies'></div></div>"));
})



$(".comments").on('click', '.hide-replies', function() {

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide(("<div class='comment'><div class='author'>'" +
  name +
   "' ' says: ' </div><div class='message'>' "+
   comment +
  "  </div><div class='controls'><button class='hide-replies btn btn-default'>'Hide Replies'</button><button class='show-replies btn btn-default'>'Show Replies'</button><button class='reply btn btn-default'>'Reply'</button></div><div class='replies'></div></div>"));
})
