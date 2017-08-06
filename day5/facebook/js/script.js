$('#loginForm').hide();
$('.newsFeed').hide();

$('#submitButton').on('click', function(){
  event.preventDefault();

  console.log($('#firstName').val(), $('#lastName').val(),$('#email').val());

    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
      method: 'post',
      data:{
        fname: $('#firstName').val(),
        lname: $('#lastName').val(),
        email: $('#email').val(),
        password: $('#password').val()
      },
      success: function(resp){

          $('#registrationForm').hide();
          $('#loginForm').show();

      },
      error: function(error){
      }
    })
})

$('#redirectLogin').on('click', function(){
  $('#registrationForm').hide();
  $('#loginForm').show();
})



$('#loginButton').on('click', function(){
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    data: {
      email: $('#loginUsername').val(),
      password: $('#loginPassword').val()
    },
    success: function(data){
  localStorage.setItem('token', data.response.token);
   $('#loginForm').hide();
   $('.newsFeed').show();

    $.ajax({
      url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/:1',
      data:{
        token: localStorage.getItem('token')
      },
      success: function(data){
        var postArray = data.response;

        $('.newsFeed .posts').empty();

        postArray.forEach(function(elem, index){

          var thisDate = new Date(elem.createdAt);

var newPost = `          <div class = 'post' id ='${elem._id}'>
            <li class = 'author'> ${elem.poster.name} </li>
            <li class = 'time'> ${thisDate} </li>
            <li class = 'message'> ${elem.content} </li>
              <div class = 'panel'>
                <li class = 'details'> ${elem.likes.length} likes, ${elem.comments.length} replies </li>
                <div class = 'replies'>
                </div>
                <div class = 'buttons'>
                  <button type='button' class = "btn likeBtn">Like</button>
                  <button type='button' class = "btn replyBtn">Reply</button>
                </div>
              </div>
            </div>`
            $('.posts').append(newPost);

var postID = elem._id;
            var commentArray = elem.comments;
            commentArray.forEach(function(elem, index){
              var date = new Date(elem.createdAt);
              var newReply = `<div class = 'reply'>
                <li class = 'replyInfo'> ${elem.poster.name} ${date} </li>
                <li class = 'replyText'> ${elem.content} </li>
              </div> `
              $('#' + postID + ' .replies').append(newReply);
            })
        })

      }

    })

  }
})
})

$('#redirectRegistration').on('click', function(){
  $('#registrationForm').show();
  $('#loginForm').hide();

})

$('#newPostBtn').on('click', function(){
    var postText = $('#newPostInput').val();
    if(postText.length > 0){
      console.log('test passed');

      $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
        method: 'POST',
        data:{
          token: localStorage.getItem('token'),
          content: postText
        },
        success: function(){
          console.log('success');

        }
      })
    }
})

$('.newsFeed').on('click', '.replyBtn', function(){
  console.log('hey');
  event.preventDefault();
    var reply = prompt('Enter your comment here');
    var thisPost = $(this).closest('.post');
    var postID = thisPost[0].id;

    if(reply.length > 0){
      $.ajax({
        method: 'POST',
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + postID,
        data: {
          token: localStorage.getItem('token'),
          content: reply
        },
        success: function(data){
           console.log(data);

        }
      })



    }


})
