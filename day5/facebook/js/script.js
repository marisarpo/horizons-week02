
$(document).ready(function() {


$("#login").on('click', function(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    },
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('.logger').hide();
      console.log('it worked');
      renderFeed();
    }
  });
})


function renderLogin () {
  $('.logger').show();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    },
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      $('.logger').hide();
      console.log('it worked');
      renderFeed();
    }
  });
}


// register
$("#register").on('click', function(){
  $('.logger').hide();
  console.log('hello');
  renderRegister();
});

function renderRegister () {
    var wrapper = `
    <div class='registerer'>
    <div id="signupbox" style=" margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="panel-title">Register</div>
                </div>
                <div class="panel-body" >
                    <form method="post" action=".">
                        <input type='hidden' name='csrfmiddlewaretoken' value='XFe2rTYl9WOpV8U6X5CfbIuOZOELJ97S' />
                        <form  class="form-horizontal" method="post" >
                            <input type='hidden' name='csrfmiddlewaretoken' value='XFe2rTYl9WOpV8U6X5CfbIuOZOELJ97S' />
                            <div id="div_id_email" class="form-group required">
                              <div class="controls col-md-8 ">
                                    <input class="input-md  textinput textInput form-control" id="email" maxlength="30" name="email" placeholder="email" style="margin-bottom: 10px" type="text" />
                                </div>
                            </div>
                            <div id="div_id_password1" class="form-group required">
                                <div class="controls col-md-8 ">
                                    <input class="input-md textinput textInput form-control" id="password" name="password" placeholder="password" style="margin-bottom: 10px" type="password" />
                                </div>
                            </div>
                            <div id="div_id_first" class="form-group required">
                                <div class="controls col-md-8 ">
                                    <input class="input-md emailinput form-control" id="first" name="firstName" placeholder="first name" style="margin-bottom: 10px" type="firstName" />
                                </div>
                            </div>
                            <div id="div_id_last" class="form-group required">
                                 <div class="controls col-md-8 ">
                                    <input class="input-md textinput textInput form-control" id="last" name="lastName" placeholder="last name" style="margin-bottom: 10px" type="lastName" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="controls col-md-offset-4 col-md-8 ">
                                    <div id="div_id_terms" class="checkbox required">
                                        <label for="id_terms" class=" requiredField">
                                             <input class="input-ms checkboxinput" id="id_terms" name="terms" style="margin-bottom: 10px" type="checkbox" />
                                             Agree with the terms and conditions
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="aab controls col-md-4 "></div>
                                <div class="controls col-md-8 ">
                                    <input type="submit" name="Signup" value="Signup" class="btn btn-primary btn btn-info" id="submit" />
                                </div>
                            </div>
                        </form>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
    wrapper = $(wrapper);
    $('.title').append(wrapper);
    $('#submit').on('click', function() {
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
        method: 'POST',
        data: {
          fname: $('#first').val(),
          lname: $('#last').val(),
          email: $('#email').val(),
          password: $('#password').val()
        },
        success: function(data) {
          $('.registerer').hide();
          console.log('it worked');
          renderLogin();
        },
        error: function (data) {
          console.log('you took an L')
        }
    });
  });
}


function renderFeed () {
  var wrapper = `
  the mothafucka feed
  `;
  wrapper = $(wrapper);
  $('.title').append(wrapper);
  $('#newPost').on('click', function() {
    newPost();
  });
  $('#recentPost').on('click', function() {
    recentPost();
  });
  $('#like').on('click', function() {
    like();
  });
  $('#getComments').on('click', function() {
    getComments();
  });
  $('#comment').on('click', function() {
    comment();
  });
  $('#logout').on('click', function() {
    logout();
  });
}

function newPost(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: 'content from the html template'
    },
    success: function(data) {
      //update feed with new content then render feed
    },
    error: function (data) {
      console.log('you took an L')
    }
  });
}

function recentPost(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/:page', {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      //update feed with data
    },
    error: function (data) {
      console.log('you took an L')
    }
  });
}

function like(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/:post_id', {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      //update feed
    },
    error: function (data) {
      console.log('you took an L')
    }
  });
}

function getComments(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id', {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      update board
    },
    error: function (data) {
      console.log('you took an L')
    }
  });
  update feed
}

function comment(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id', {
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: "comment content"
    },
    success: function(data) {
      //update board
    },
    error: function (data) {
      console.log('you took an L')
    }
  });
  update feed
}

function logout(){
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout', {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(data) {
      //clear board
    },
    error: function (data) {
      console.log('you took an L')
    }
  });
  update feed
}


});
