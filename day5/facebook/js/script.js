$(document).ready(function () {

// Initially only display the registration form
$('#login-form').hide();
$('#main-page').hide();

// Shift between the login and registration forms when the respective redirect
// buttons are clicked
$('#login-redirect').on('click', function () {
  $('#register-form').hide();
  $('#login-form').show();
})

$('#registration-redirect').on('click', function () {
  $('#login-form').hide();
  $('#register-form').show();
});

// Registration
function createUser(firstName, lastName, email, password) {
  $.ajax ('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    data: {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password
    },
    success: function() {
      $('#register-form').hide();
      $('#login-form').show();
      return true;
    }
  })
}

$('#register').on('click', function () {
  var form_data = $('#register-form').serializeArray();
  var inputs = [];
  for (var i = 0; i < form_data.length; i++) {
    inputs.push(form_data[i].value);
  }
  var firstName = inputs[0];
  var lastName = inputs[1];
  var email = inputs[2];
  var password = inputs[3];
  createUser(firstName, lastName, email, password);
});

// Authentication
function authenticateUser(email, password) {
  $.ajax ('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('#login-form').hide();
      $('#main-page').show();
      var token = localStorage.getItem('token');
      getPosts(token);
    },
    data: {
      email: email,
      password: password
    }
  })
}

$('#login').on('click', function() {
  var form_data = $('#login-form').serializeArray();
  var email = form_data[0].value;
  var password = form_data[1].value;
  authenticateUser(email, password);
})

// List posts

function getPosts(token) {
  $.ajax ('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
    method: 'GET',
    data: {
      token: token,
    },
    success: function(response) {
      listPosts(response);
    }
  });
}

function listPosts(posts) {
  var posts_array = posts.response;
  console.log(posts_array);
  for (var i = 0; i < posts_array.length; i++) {
    var html_string = `<div class = "post">
     <div class = "poster">
       ${posts_array[i].poster.name}
     </div>
       <div class = "time">
       ${posts_array[i].createdAt}
       </div>
        <div class = "content">
       <h3>${posts_array[i].content}</h3>
     </div>
     <div class = "responses">
       <div class = "replies">
       ${posts_array[i].comments.length} Replies
       </div>
       <div class = "likes">
        ${posts_array[i].likes.length} Likes <button type = "button" class = "btn btn primary" id = "like-button"> Like </button>
       </div>
      </div>

      <form class="well form-horizontal" action=" " method="post"  id="comment-form">
        <fieldset>
          <!-- Form Name -->
          <div class="form-group">
            <label class="col-md-4 control-label"> Comment </label>
            <div class="col-md-4 inputGroupContainer">
              <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
                <input name="user-post" placeholder = "...." class="form-control" type="text">
              </div>
            </div>
          <button type = "button" class = "btn btn primary" id = "comment-button"> Comment </button>
          </div>
        </fieldset>
      </form>
      <div class = "id-holder">${posts_array[i]._id}</div>
    </div>`
    $('#main-page').append(html_string);
    $('.id-holder').hide();
  }
}

$('#post-button').on('click', function () {
  var user_post = $('#post-form').serializeArray();
  var post = user_post[0].value;
  postNewPost(post);
})

function postNewPost(post) {
  $.ajax ('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: post
    },
    success: function() {
      return true;
    }
  });
}

$('#main-page').on('click', '#comment-button',  function () {
  var user_comment = $('#comment-form').serializeArray();
  var comment = user_comment[0].value;
  var id = $(this).closest('.post').find('.id-holder').text();
  postComment(comment, id);
})

function postComment(comment,id) {
  console.log(comment);
  id = $.trim(id);
  console.log(id);
  $.ajax ('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/' + id, {
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: comment
    },
    success: function() {
      console.log('success');
    }
  });
}

}); // End of script
