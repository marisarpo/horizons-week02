
$(document).ready(function(){

$('#registrationPage').hide();
$('#postPost').hide();
$('#register').click(function(event){
  event.preventDefault();
  register();
  $('#registrationPage').hide();
  $('#loginPage').show()
});

$('#login').click(function(event){
  event.preventDefault();
  login();
  $('#loginPage').hide()
  $('#postPost').show();
  getPost();
});

$('#goRegistration').click(function(event){
  event.preventDefault();
  $('#loginPage').hide();
  $('#registrationPage').show();
});

$('#postBtn').click(function(event){
  event.preventDefault();
  postPost();
})

$('#feed').on('click','#like',function(event){
  var self=this;
  event.preventDefault();
  like(self);
})

$('#feed').on('click','#comments',function(event){
  var self=this;
  event.preventDefault();
})


function register(){
$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
  method: 'POST',
  success: function(data) {
    console.log(data);
  },
  data: {
    fname:$('#fname').val(),
    lname:$('#lname').val(),
    email: $('#username2').val(),
    password: $('#password2').val()
  }
});
}

function login(){
$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
  method: 'POST',
  success: function(data) {
    // data will be the response data that is
    // returned by the endpoint. use this to
    // access the token for future authorization.
    console.log(data.response.token);
    localStorage.setItem('token', data.response.token)    // data.response.token will give you access
    // to the AUTH_TOKEN
  },
  data: {
    email:$('#username').val(),
    password:$('#password').val()
  }
});
}

function getPost(){

  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/1', {
    method: 'GET',
    success: function(data) {
      // data will be the response data that is
      // returned by the endpoint. use this to
      // access the token for future authorization.
      console.log(data.response);
       for (var i = 0; i < data.response.length; i++) {
         renderPost(data.response[i])
       };
    },
    data: {
      token:localStorage.getItem('token')
    }
  });
}

function renderPost(post){
console.log(post);
  var poster = post.poster.name;
  var content = post.content;
  var time = post.createdAt;
  var id = post._id;
  var node =
  `  <div class="detailBox" id='${id}'>
    <div class="titleBox">
      <label>${poster}</label>
    </div>
    <div class="commentBox">
      <p class="taskDate">${time}</p>
        <p class="taskDescription">${content}</p>
    </div>

    <div class='comments'>
    ${post.comments.map(function(comment){
      var c = `<p>${comment.poster.name +comment.content+Date.parse(comment.createdAt)}</p>`;
      return c;
    })}
    </div>
    <div class="actionBox">
        <form class="form-inline" role="form">
            <!-- <div class="form-group">
                <input class="form-control" type="text" placeholder="Your comments" />
            </div> -->
            <div class="form-group">
              <span id='likes'>${post.likes.length}</span>
              <span>likes, </span>
              <span>${post.comments.length}</span>
              <span>replies</span>
              <button class="btn btn-default" id='like'>Like</button>

                <button class="btn btn-default" id='comments'>Reply</button>
            </div>
        </form>
    </div>
</div>`

$('#feed').append(node);

}

function postPost(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
    method: 'POST',
    success: function(data) {
      // console.log(data);
      $('#feed').empty();
      getPost();
    },
    data: {
      token:localStorage.getItem('token'),
      content:$('#post').val()
    }
  });
}

function like(self){

  var postId=$(self).closest('.detailBox').attr('id');
  // console.log(postId);
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/'+postId, {
    method: 'GET',
    success: function(data) {
      console.log(data);
      getPost();
      // $(self).siblings('#likes').text(data.response.likes.length);
    },
    data: {
      token:localStorage.getItem('token'),
    }
  });
}
})
