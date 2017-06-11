$(document).ready(function() {

  var loggedIN = false;  //SHOULD START AS FALSE AND GET SET TO TRUE WHEN YOU
                        //LOG IN SUCCESSFULLY.

  $('#Login-Page').hide();
  $('#NewsFeed-Page').hide();


//REGISTRATION BUTTON
  $('#regist').on('click',function(event){
    event.preventDefault();

    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
      data: {
        fname: $('#first-reg-text').val(),
        lname: $('#last-reg-text').val(),
        email: $('#user-reg-text').val(),
        password: $('#pass-reg-text').val()
      },
      method: 'POST',
      success: function(response) {
        console.log(response);
        $('#Registration-Page').hide();
        $('#Login-Page').show();
      },
      error: function(err){
        console.log(err)
        $('#registerform')[0].reset();
      }
    })
  })

//GO TO LOGIN BUTTON
  $('#goto-log').on('click', function(event){
    event.preventDefault();
    $('#Registration-Page').hide();
    $('#Login-Page').show();
  })


//LOGIN BUTTON AJAX REQUEST
  $('#log').on('click',function(event){
    event.preventDefault();

    $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
      data: {
        email: $('#user-log-text').val(),
        password: $('#pass-log-text').val()
      },
      method: 'POST',
      success: function(data) {
        console.log(data);
        localStorage.setItem('token', data.response.token);
        localStorage.setItem('id', data.response.id);
        // console.log(localStorage.getItem('id'));
        // console.log(localStorage.getItem('token'));

        $('#Login-Page').hide();
        $('#NewsFeed-Page').show();

        //LOAD THE POSTS TO NEWSFEED and stay logged in
        $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
          data:{
            token: localStorage.getItem('token')
          },
          method: 'GET',
          success: function(data){
            console.log(data);

            for(var i = 0; i < 10; i++){
              //ADD ALL THE POSTS TO NEWSFEED
              var post = data.response[i];
              var date = new Date(post.createdAt);
              $('.news-container').append(returnsPostHTML(post.poster.name, date,
                              post.content, post.likes.length, post.comments.length, post._id))

              //FOR EACH POST ADD ITS COMMENTS BY APPENDING TO COMMENTS CONTAINER
              for(var j = 0; j < post.comments.length; j++){
                $(`#${post._id}`).find(`.comments-container`).append(returnsCommentHTML(
                            post.comments[j].content, post.comments[j].poster.name ));
              }
            }
          }

        })

        // refresh ===> WORKS CLEAN IF YOU JUST DONT EMPTY IT ALL. BUT THEN THERE IS ANOTHER BUG
        // NEED TO NOT APPEND OLD COMMENTS A SECOND TIME!!!
        // setInterval(function(){
        //   $('.news-container').empty()
        //
        //   $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
        //     data:{
        //       token: localStorage.getItem('token')
        //     },
        //     method: 'GET',
        //     success: function(data){
        //       console.log(data);
        //
        //       for(var i = 0; i < 10; i++){
        //         //ADD ALL THE POSTS TO NEWSFEED
        //         var post = data.response[i];
        //         var date = new Date(post.createdAt);
        //         $('.news-container').append(returnsPostHTML(post.poster.name, date,
        //                         post.content, post.likes.length, post.comments.length, post._id))
        //
        //         //FOR EACH POST ADD ITS COMMENTS BY APPENDING TO COMMENTS CONTAINER
        //         for(var j = 0; j < post.comments.length; j++){
        //           $(`#${post._id}`).find(`.comments-container`).append(returnsCommentHTML(
        //                       post.comments[j].content, post.comments[j].poster.name ));
        //         }
        //       }
        //     }
        //
        //   })
        //
        // }, 10000);

      },
      error: function(err){
        console.log(err)
        $('#loginform')[0].reset();
      }

    })
  })


function returnsCommentHTML(comment, commenter){
  return (`<div class = "comment-container">
    <div class = "comment">COMMENT: ${comment}</div>
    <div class = "comment-author">AUTHOR: ${commenter}</div>
  </div>`)

}

function returnsPostHTML(name, date, message, likes, comments, id){
  return (`<div class = "post-container" id = "${id}">
    <div class = "post-header">
      <div class = "author">${name}</div>
      <div class = "time-created">${date}</div>
    </div>
    <div class = "post-content">
      <div class = "message">${message}</div>
    </div>
    <div class = "post-footer">
      <div class = "num-likes">${likes} Likes</div>
      <div class = "num-replies">${comments} Replies</div>
      <button class = "btn like" id = "${id}">Like</button>
      <button class = "btn reply" id = "${id}">Reply</button>
      <div class = "comments-container"></div>
    </div>
  </div>`);
}


//POST MESSAGE TO PUBLIC NEWSFEED
$('#Post').on("click",function(event){
  event.preventDefault();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
    data: {
      token: localStorage.getItem('token'),
      content: $('#Post-content').val()
    },
    method: 'POST',
    success: function(data) {
      //console.log(data);
      $('#postform')[0].reset();
    },
    error: function(err){
      console.log(err)
      $('#postform')[0].reset();
    }
  })
})

//LIKE A POST
$('.news-container').on('click','.like',function(event){
  var id = event.target.id;

  event.preventDefault();
  $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${id}`,{
    data: {
      token: localStorage.getItem('token')
    },
    method: 'GET',
    success: function(data){
      console.log(data);
    },
    error: function(err){
      console.log(err);
    }
  })

})

//POST A COMMENT
$('.news-container').on('click','.reply',function(event){
  var id = event.target.id;

  event.preventDefault();
  $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${id}`,{
    data: {
      token: localStorage.getItem('token'),
      content: "PRACTICE COMMENT"
      //USE A MODAL HERE TO GET COMMENT
    },
    method: 'POST',
    success: function(data){
      console.log(data);
    },
    error: function(err){
      console.log(err);
    }
  })

})


//DEAL WITH THE LOGOUT ISSUE.


//NEED TO FIX:
//  - refresh page
//  - logout ISSUE
//  - posting unique comment wiht modal




})
