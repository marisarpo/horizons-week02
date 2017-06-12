$(document).ready(function() {

});
// $.ajaxSetup({
//   data:{
//     key:apiKey,
//     token:apiToken
//   }
// })
var apiUrl = 'https://horizons-facebook.herokuapp.com/api/1.0'
var refreshCount = 0;
var updating = false;
$('.submit').on('click',function(){
  var $inputs = $('#login_form :input');
  var user = $inputs[0].value
  var password = $inputs[1].value
  function clear(){
       $('#input_form input').each(function () {
         $(this).val("");
      });
          $('#input_form input').first().focus();
  };
  $.ajax(apiUrl + '/users/login', {
      method: 'POST',
      success: function(data) {
        // data will be the response data that is
        // returned by the endpoint. use this to
        // access the token for future authorization.
        localStorage.setItem('token', data.response.token)

        clear();
        $('.login-container').hide();
        $('.newsfeed-page-container').show();
        // data.response.token will give you access
        // to the AUTH_TOKEN
      },
      data: {
        email: user,
        password: password
      },
      error: function(err){
        alert('ERROR',err);
      }
    });
})
$('#submit_reg').on('click',function(){
  var $inputs = $('#registration_form :input');
  var fname = $inputs[0].value
  var lname = $inputs[1].value
  var newUser = $inputs[2].value
  var newPass = $inputs[3].value
  function clear(){
       $('#registration_form input').each(function () {
         $(this).val("");
      });
          $('#registration_form input').first().focus();
  };


  $.ajax(apiUrl + '/users/register', {
      method: 'POST',
      data:{
        fname: fname,
        lname: lname,
        email: newUser,
        password: newPass
      },
      success: function(data) {
        // data will be the response data that is
        // returned by the endpoint. use this to
        // access the token for future authorization.
        $('.registration-container').hide();
        clear();
        $('.login-container').show();
        // data.response.token will give you access
        // to the AUTH_TOKEN
      },
      error: function(err){
        alert('ERROR',err);
        console.log(err);
      }
    });

})
$('#register_button').on('click', function(){
  $('.login-container').hide();
  $('.registration-container').show();
})
$('#login_btn').on('click', function(){
  $('.login-container').show();
  $('.registration-container').hide();
})

function updatePosts(){
  var updatedData;
  var tokenize = localStorage.getItem('token');
  $.ajax(apiUrl + '/posts/' + refreshCount,{
    method: 'GET',
    data:{
      token: tokenize
    },
    success:function(data){
      updatedPostData(data.response);
    },
    error: function(err){
      console.log(tokenize);
      console.log(err);
    }
  })
}
function updatedPostData(data){
  console.log(data);
  data.forEach(function(item){
    var postId = item._id;
    var user = item.poster.name;
    var content = item.content;
    var postDate = item.createdAt;
    var comments = item.comments;
    var likes = item.likes;
    var text = `<div class='post' id=${postId}>
                  <div class='post-header'>
                    <h4 style="margin:0; font-weight: 700;">${user}</h4>
                    <h4 style="margin:0; font-style: italic; font-size: 0.7em;">${postDate}</h4>
                  </div>
                  <div class='post-content'>${content}</div>
                  <div class='divider'></div>
                  <div class='post-comments-container'>
                    <div class='likes-container'>
                      <p style='margin:0;'>
                        <span>${comments.length}</span>
                        <span>Replies,</span>
                        <span>${likes.length}</span>
                        <span>Likes</span>
                      </p>
                    </div>
                    <div class='post-comments'>`
      // var commentish = `<div class='comment'>
      //                   <div class='comment-header'>
      //                     <span>COMMENT USERNAME:</span>
      //                     <span style="font-style: italic; font-size: 0.7em;">COMMENT TIMESTAMP</span>
      //                   </div>
      //                   <div class='comment-content'>COMMENT CONTENT</div>
      //                 </div>
      //               </div>`
    var footer = `</div>
                  <div class='post-footer'>
                    <button class='like-button'><span class="glyphicon glyphicon-thumbs-up"></span></button>
                    <button class='reply-button'>Reply</button>
                  </div>
                </div>`
    var comment = addComments(comments);
    var finalText = text+comment+footer;
    if (updating){
      updating = false;
      $('.posts-list-container').find('.post').before(finalText);
    }else{
      $('.posts-list-container').append(finalText);
    }
    console.log(comments);
  })

}

function addComments(comments){
  var newComments = '';
  console.log('in comments');
  if (comments.length === 0){
    return '';
  }else{
    comments.forEach(function(item){
      console.log(item.poster.name);
      var comment = `<div class='post-comments'>
                    <div class='comment'>
                      <div class='comment-header'>
                        <span>${item.poster.name + ': '}</span>
                        <span style="font-style: italic; font-size: 0.7em;">${item.createdAt}</span>
                      </div>
                      <div class='comment-content'>${item.content}</div>
                    </div>
                  </div>`
      newComments = newComments + comment;
    })
    //console.log(comments);
    return newComments;
  }
}

$('.refresh').on('click',function(){
  refreshCount++;
  if (refreshCount >= 4){
    alert("You have loaded all of the posts!")
  }else{
    updatePosts();
  }
})
$('.newsfeed-container').on('click','#post_btn', function(){
  var contents = $(this).prev().val();
  var tokenize = localStorage.getItem('token');
  var poster;
  $.ajax(apiUrl+ '/posts',{
    method: 'POST',
    data:{
      token:tokenize,
      content:contents
    },
    success: function(data){
      poster = data.response.poster.name;
      updating =true;
      updatedPostData([data.response]);
    }
  })

})
$('.newsfeed-container').on('click','.reply-button',function(){
  console.log($(this).closest('.post').attr('id'));
  // $.ajax(apiUrl+'/posts/comments/'+post_id,{
  //
  //
  //
  // })
})
