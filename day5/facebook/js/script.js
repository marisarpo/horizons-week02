//Login button
$('button[name = login-button]').click(function(){
  var dataObj ={
  email: $('input[name=login-email]').val(),
  password: $('input[name=login-password]').val()
  }


  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    success: function(data){
      //window.token = x.response.token;

      //Local storage
      localStorage.setItem('token', data.response.token);

      interval = setInterval(function(){
        console.log('called');
        getPosts();
      }, 50000);

      console.log("login successful", data);
      $('#login-form').addClass('hide');
      $('#main').removeClass('hide');
    },
    data: dataObj
  });
});

//newUser button
$('button[name=newUser-button]').click(function(){
  $('#register-form').removeClass('hide');
  $(this).closest('#login-form').addClass('hide');
  console.log($('#register-form'));
})

//register button
$('button[name=register-button]').click(function(){
  console.log("register-button clicked");
  var dataObj ={
  fname: $('input[name=firstname]').val(),
  lname: $('input[name=lastname]').val(),
  email: $('input[name=username]').val(),
  password: $('input[name=register-password]').val()
  }

  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    success: function(data){
      //window.token = x.response.token;
      console.log("register successful", data);
      $('#register-form').addClass('hide');
      $('#login-form').removeClass('hide');

      //Local storage
      localStorage.setItem('token', data.response.token);

    },
    data: dataObj
  })
})


//logout button
$('button[name = logout]').click(function(){
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    method:'GET',
    success: function(data) {
      console.log('Logout Successful!',data);
      localStorage.removeItem('token');

      $('#login-form').removeClass('hide');
      $('#main').addClass('hide');
      clearInterval(interval);
    },
    data: {
      token: localStorage.getItem('token')
    }
  });
});

function Post(id, title, description, listId) {
  this.id = id;
  this.listId = listId;
  this.title = title;
  this.description = description;
};

var getPosts = function() {
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    success: function(data){
      console.log("getpost",data);
      var arr=[];
      $('div[name=post-list-container]').remove();
      data.response.map(function(obj){
        var posterName = obj.poster.name;
        var postId = obj._id;
        var content = obj.content;
        var date = new Date(obj.createdAt);
        var comments = obj.comments;
        var likes = obj.likes;

        var getReps = function(){
          var replyHTML = ``;
          comments.map(function(obj){
            replyHTML +=
            `<h5> ${obj.poster.name}: ${new Date(obj.createdAt)}</h5>
            <h4> ${obj.content} </h4>`
          })
          return replyHTML;
        }
        var replies = getReps();

        var postHTML = `
        <div class='post-list-container' name='post-list-container' id=${postId}>
          <div class="post">
            <div class = 'comment-div'>
              <h3> ${posterName} </h3>
              <h5> ${date} </h5>
              <h4 class='comment'> ${content} </h4>
            </div>
            <div class='replies'>
            <h4 style='bold'> ${comments.length} Replies, ${likes.length} <span class="glyphicon glyphicon-thumbs-up"></span> </h4>
            ${replies}
            </div>
            <div class='reply-like'>
              <div class='reply-button'>
                <button type='button' name='post-reply'>Reply
                <span class="glyphicon glyphicon-send"></span></button>
              </div>
              <div class='like-button'>
                <button type='button' name='like'>Like
                <span class="glyphicon glyphicon-thumbs-up"></span></button>
              </div>
            </div>
            <div class="collapse add-reply-form-wrapper">
              <div class="well add-reply-form">
                <input type="text" name='reply-post' class="form-control"
                                   placeholder="Card title">
                <button type="button" class="btn btn-default add-card-save" name='add-card-save'">
                  Save
                </button>
                <button type="button"
                        class="btn btn-default add-reply-cancel"><span
                        class="glyphicon glyphicon-remove"></span>
                </button>
              </div>
            </div>
          </div>
        </div>`;
        $('div[name=post-list').append(postHTML);
      })
    },
    data: {
      token: localStorage.getItem('token')
    }
  })
}

//getposts button
$('button[name=getPosts]').click(function (){
  getPosts()
});

//post button
$('button[name=post-button]').click(function(){
  var dataObj = {
    token: localStorage.getItem('token'),
    content: $('input[name=post-box]').val()
  }

  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    success: function(data){
      console.log(data);
      getPosts();
      $('input[name=post-box]').val('')
    },
    data: dataObj

  })
})
$('#main').on('click', 'button[name=post-reply]', function(){
  console.log($(this).closest('.post').find('.add-reply-form-wrapper'));
  $(this).closest('.post').find('.add-reply-form-wrapper').removeClass('collapse');
});

$('#main').on('click', 'button[name=add-card-save]', function(){
  console.log('hi');
  var dataObj = {
    token: localStorage.getItem('token'),
    content: $('input[name=reply-post]').val()

  }
  console.log($(this).closest('.post').closest('.post-list-container').attr('id'))

  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:`+ $(this).closest('.post').closest('.post-list-container').attr('id'),
    method: 'POST',
    success: function(data){
      console.log('hello');
      $(this).closest('.post').find('.add-reply-form-wrapper').addClass('collapse');
    },
    data: dataObj
  })
})
