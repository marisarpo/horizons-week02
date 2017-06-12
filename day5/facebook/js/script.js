$('.registration').hide();
$('.comments').hide();
$('.newsfeed').hide();

// login section
$('.login button.login').on('click',function(){
  var USERNAME = $('.login .username').val();
  var PASSWORD = $('.login .password').val();
  // console.log(USERNAME,PASSWORD)
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('.login').hide();
      $('.newsfeed').show();
    },
    data: {
      email: USERNAME,
      password: PASSWORD
    }
  });
})

$('.login button.register').on('click',function(){
    $('.registration').show();
    $('.login').hide();
})

$('.gologin').on('click',function(){
    $('.registration').hide();
    $('.login').show();
})

// register section
$('.register').on('click',function(){
  var FIRSTNAME = $('.registration input.firstname').val();
  var LASTNAME = $('.registration input.lastname').val();
  var USERNAME = $('.registration input.username').val();
  var PASSWORD = $('.registration input.password').val();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    success: function(data) {
      // console.log("registration successful!")
      $('.registration').hide();
      $('.login').show();
    },
    error:function(fail){
      console.log("error occured because", fail)
    },
    data: {
      fname: FIRSTNAME,
      lname: LASTNAME,
      email: USERNAME,
      password: PASSWORD
    }
  });
})


// get posts from others
var update = function() {

$.ajax({
  url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
  method: 'GET',
  data:{
    token: localStorage.getItem('token')
  },

  success: function(data){
      console.log(data.response);
      $('.cards').empty();
    for(var i = 0; i<data.response.length;i++){
      var obj = data.response[i]
      html = `
      <div class="card" id=${obj._id}>
        <div class="card-name">
          <h3>${obj.poster.name}</h3>
        </div>
        <div class="card-time">
          <span>${obj.createdAt}</span>
        </div>
        <div class="card-content">
          <div class="content">
            ${obj.content}
          </div>
        </div>
        <div class="card-interaction">
          <span class="number replies">${obj.comments.length}</span>Replies,
          <span class="number likes">${obj.likes.length}</span>Likes
          <button class = "glyphicon glyphicon-thumbs-up"></button>
          <button class = "replies">Replies</button>
        </div>
        <div class="post-comments">
          <div class="commentbox">
            <textarea placeholder="Type your comments here..."></textarea>
          </div>
          <div class="sendcomment">
            <button class="sendcomment" type="button" name="button">Comment</button>
            <button class="glyphicon glyphicon-remove"></button>
          </div>
        </div>

      </div>

      `
    $('.cards').append(html);
    $('.post-comments').hide();

    var arr = obj.comments;
    console.log(arr);
    for(var j= 0;j<arr.length;j++){
       var time = new Date(arr[j].createdAt);
       var content = arr[j].content;
      //  console.log(arr)
       var addOn =
       `
       <div class = "comments">
       <div>${content}</div>
       <div>by ${arr[j].poster.name} </div>
       <div> ${time} </div>
       </div>
       `
       $('#'+obj._id).children().eq(4).before(addOn);
       $('.comments').hide();
    }
    }
  }
})
}
update();
setInterval(update,30000);
//enable user to post something
$('.sendpost button').on('click',function(){
   $.ajax({
     url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
     method:'POST',
     data: {
       token: localStorage.getItem('token'),
       content: $('.postbox textarea').val()
     },
     success:function(data){
      //  console.log(data.response);
       var obj = data.response;
       html =
       `
       <div class="card" id=${obj._id}>
         <div class="card-name">
           <h3>${obj.poster.name}</h3>
         </div>
         <div class="card-time">
           <span>${obj.createdAt}</span>
         </div>
         <div class="card-content">
           <div class="content">
             ${obj.content}
           </div>
         </div>
         <div class="card-interaction">
           <span class="number replies">${obj.comments.length}</span>Replies,
           <span class="number likes">${obj.likes.length}</span>Likes
           <button class = "glyphicon glyphicon-thumbs-up"></button>
           <button class = "replies">Replies</button>
         </div>
         <div class="post-comments">
           <div class="commentbox">
             <textarea placeholder="Type your comments here..."></textarea>
           </div>
           <div class="sendcomment">
             <button class="sendcomment" type="button" name="button">Comment</button>
             <button class="glyphicon glyphicon-remove"></button>
           </div>
         </div>
       </div>

       `
       $('.cards').children().eq(0).before(html);
       $('.post-comments').hide();
     }
   })
})

//enable likes
$('.cards').on('click','.card-interaction button.glyphicon-thumbs-up',function(){
  var cardId = $(this).parent().parent().attr("id");
  // console.log(cardId);
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/"+cardId,
    method: "GET",
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data){
      var likes = data.response.likes.length;
      $('#'+cardId).children().children('span.likes').text(likes);
    }
  })
})

//enable user comments
$('.cards').on('click','.card-interaction button.replies',function(){
   $(this).parent().siblings('.post-comments').show();
   $('.comments').show();

})

$('.cards').on('click',' button.sendcomment',function(){

  var cardId = $(this).parent().parent().parent().attr("id");
  var content = $('#'+cardId).find('.commentbox textarea').val();
  //content of the comments

  // console.log(content);
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/"+cardId,
    method: "POST",
    data: {
      token: localStorage.getItem('token'),
      content: content
    },
    success: function(data){
      console.log(data.response);
      var arr = data.response.comments;
      var numReplies = data.response.comments.length;

      $('#'+cardId).children().children('span.replies').text(numReplies);
      // for(var i= 0;i<numReplies;i++){
         var time = new Date(arr[numReplies-1].createdAt);
         var html =
         `
         <div class = "comments">
         <div>${content}</div>
         <div>by ${arr[numReplies-1].poster.name} </div>
         <div> ${time} </div>
         </div>
         `
         $('#'+cardId).children().eq(4).before(html);
      // }
    }
  })
})

$('.cards').on('click','.glyphicon-remove',function(){
    $(this).parent().parent().siblings('.comments').hide();
    $(this).parent().parent().hide();
})
