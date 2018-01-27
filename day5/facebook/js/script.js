$(document).ready(function() {
  var posts = [];
  $('#login').hide();
  $('div#newsfeed').hide();

  // setInterval(fetchPosts, 30000);

  // Remove Search if user Resets Form or hits Escape!
  $('body, .navbar-collapse form[role="search"] button[type="reset"]').on('click keyup', function(event) {
    if (event.which == 27 && $('.navbar-collapse form[role="search"]').hasClass('active') ||
      $(event.currentTarget).attr('type') == 'reset') {
      closeSearch();
    }
  });

  function closeSearch() {
    var $form = $('.navbar-collapse form[role="search"].active')
    $form.find('input').val('');
    $form.removeClass('active');
  }

  $('a#logout').on('click', function(event) {
      event.preventDefault();
      $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/users/logout`, {
        success: function(data) {
         localStorage.setItem('token', '');
         $('#newsfeed').hide();
         $('#login').show();
        },
        error: function(err) {
          console.log(err);
        },
        method: 'GET',
        data: {
          token: localStorage.getItem('token')
        }
      });

  });

  // Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
  $(document).on('click', '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(event) {
    event.preventDefault();
    var $form = $(this).closest('form'),
      $input = $form.find('input');
    $form.addClass('active');
    $input.focus();

  });
  // ONLY FOR DEMO // Please use $('form').submit(function(event)) to track from submission
  // if your form is ajax remember to call `closeSearch()` to close the search container
  $(document).on('click', '.navbar-collapse form[role="search"].active button[type="submit"]', function(event) {
    event.preventDefault();
    var $form = $(this).closest('form'),
      $input = $form.find('input');
    $('#showSearchTerm').text($input.val());
    closeSearch()
  });

  $('#signup').on('click', function(event) {
    event.preventDefault();
    var firstName = $('input.form-control#first_name').val();
    var lastName = $('input.form-control#last_name').val();
    var email = $('input.form-control#email').val();
    var password = $('input.form-control#password').val();
    sendSignUp(firstName, lastName, email, password)
  });

  $('button#login').on('click', function(event) {
    event.preventDefault();
    var email = $('input.form-control#login_email').val();
    var password = $('input.form-control#login_password').val();
    sendLogin(email, password);

  });

  $('#login_button').on('click', function(event) {
    event.preventDefault();
    $('#registration').hide();
    $('#login').show();
  });

  $('ul').on('click', 'button.btn.btn-primary.likeIt', function(event) {
    event.preventDefault();
    var id = $(this).parent().parent().parent()[0].id;
    addALike(id);
  });

  $('ul').on('click', 'button.btn.btn-primary.replyComment', function(event) {
      event.preventDefault();
      var comment = $(this).parent().children().eq(0).val();
      var id = $(this).parent().parent().parent()[0].id;
      addAComment(comment, id);
  });

  $('#makePost').on('click', function(event) {
    event.preventDefault();
    var newPost = $('input#postSomething').val();
    sendAPost(newPost);
  });

  function sendSignUp(first, last, email, pw) {
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/users/register`, {
      success: function(response) {
        $('#registration').hide();
        $('#login').show();
      },
      error: function(err) {
        console.log(err);
      },
      method: 'POST',
      data: {
        fname: first,
        lname: last,
        email: email,
        password: pw
      }
    });
  }

  function addALike(id) {
      $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/` + id, {
        success: function(data) {
        },
        error: function(err) {
          console.log(err);
        },
        method: 'GET',
        data: {
          token: localStorage.getItem('token')
        }
      });
  }

  function addAComment(comment, id) {
      $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/` + id, {
        success: function(response) {
        },
        error: function(err) {
          console.log(err);
        },
        method: 'POST',
        data: {
          token: localStorage.getItem('token'),
          content: comment
        }
      });
  }

  function sendLogin(email, pw) {
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/users/login`, {
      success: function(data) {
        localStorage.setItem('token', data.response.token);
        $('#login').hide();
        fetchPosts();
      },
      error: function(err) {
        console.log(err);
      },
      method: 'POST',
      data: {
        email: email,
        password: pw
      }
    });
  }

  function sendAPost(data) {
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts`, {
      success: function(data) {
        fetchPosts();
      },
      error: function(err) {
        console.log(err);
      },
      method: 'POST',
      data: {
        token: localStorage.getItem('token'),
        content: data
      }
    });
  }

  function fetchPosts() {
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/1`, {
      success: function(data) {
        parsePosts(data.response);
      },
      error: function(err) {
        console.log(err);
      },
      method: 'GET',
      data: {
        token: localStorage.getItem('token')
      }
    });
  }

  function parsePosts(data) {
    var newPost;
    for (var i = 0; i < data.length; i++) {
      posts.push({
        id: data[i]._id,
        poster: {
          id: data[i].poster.id,
          name: data[i].poster.name
        },
        content: data[i].content,
        createdAt: data[i].createdAt,
        comments: data[i].comments,
        likes: data[i].likes
      });
    }
    appendPosts(posts);
  }

  function appendPosts(data) {
    for (var i = 0; i < data.length; i++) {

      var newContent =
        `<li id="` + data[i].id + `">
                        <div class="sidebar-content">
                            <h4><a href="#">` + data[i].poster.name + `</a></h4>
                        </div>
                        <div class="sidebar-thumb">
                            <img class="animated rollIn" src="http://shop.spotlayer.com/demo/soft-mag/demo1/wp-content/uploads/16555399183_33b1b1bc26_o-90x75.jpg" alt="" />
                        </div>
                        <div class="sidebar-content">
                            <h5 class="animated bounceInRight"><a href="#">` + data[i].content + `</a></h5>
                        </div>
                        <div class="sidebar-meta">
                            <span class="time" ><i class="fa fa-clock-o"></i> ` + new Date(data[i].createdAt).toDateString() + `</span>
                            <span class="comment"><i class="fa fa-comment"></i>` + data[i].comments.length + ` comments, ` + data[i].likes.length + ` likes` + `</span>
                        </div>
                        <div class="sidebar-meta col-sm-12">
                            <div id="like">
                                <button class="btn btn-primary likeIt" style="width: auto; float: right;" ><i class="glyphicons glyphicons-thumbs-up"></i>Like</button>
                            </div>
                            <div id="reply">
                                <button class="btn btn-primary replyToIt" style="width: auto; float: right;" data-toggle="collapse" href="#collapseReply"><i class="glyphicons glyphicons-comments"></i>Reply</button>
                            </div>
                        </div>
                        <div id="collapseReply" class="panel-collapse collapse">
                            <div class="panel-body"><input class="form-control replyComment" type="text" placeholder="Write a comment"></input><br/><button class="btn btn-primary replyComment">Reply</button></div>
                        </div>
                    </li>`;
      $('ul#recent_posts').append(newContent);
      appendComments(data[i].comments, data[i].id);
    }
    $('div#newsfeed').show();
  }

  function appendComments(data, id) {
      var comments = [];
      console.log(data);
    for (var i = 0; i < data.length; i++) {

      var newContent =
        `<div class="row">
                  <div class="col-sm-1">
                    <div class="thumbnail">
                      <img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
                    </div>
                    <!-- /thumbnail -->
                  </div>
                  <!-- /col-sm-1 -->
                  <div class="col-sm-11">
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <strong>` + data[i].poster.name + `</strong> <span class="text-muted">` + data[i].createdAt + `</span>
                      </div>
                      <div class="panel-body">
                        ` + data[i].content + `
                      </div>
                      <div class="panel-body col-sm-12">
                          <div id="like">
                              <button class="btn btn-primary" style="width: auto; float: right;"><i class="glyphicons glyphicons-thumbs-up"></i>Like</button>
                          </div>
                          <div id="reply">
                              <button class="btn btn-primary" style="width: auto; float: right;"><i class="glyphicons glyphicons-comments"></i>Reply</button>
                          </div>
                      </div>
                      <!-- /panel-body -->
                    </div>
                    <!-- /panel panel-default -->
                  </div>
                  <!-- /col-sm-5 -->
                </div>`;
                $(`li#` + id).after(newContent);
    }

  }

});
