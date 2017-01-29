$('button[name=login]').click(function(){
  console.log("123");
  var dataObj = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  }


  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    success: function(x){
      $('div[id=login-form]').addClass('.hide')
      localStorage.setItem('token', x.response.token);
      // localStorage.getItem('token')

      console.log('123')
    },
    data: dataObj,
    error: function(xhr, textStatus, error){
      console.log(xhr);
      console.log(xhr.responseText);
    }
  });
});



//Logout
$('button[name=logout]').click(function(){
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout' + localStorage.getItem('token'),
    method: "GET",
    success: function() {
      console.log('Logout Successful!');
    },
    data: {
      token:localStorage.getItem('token')
    }
  });
})





//Getting Posts
$('button[name=getPosts]').click(function(){
  var string= '';
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    success: function(thread){
      console.log(thread);
      // console.log(thread.response[0].poster.name);
      for (var i = 0; i < thread.response.length; i++){
          string = (thread.response[i].poster.name + "<br>" + thread.response[i].content + "<br>" + thread.response[i].createdAt + "<br>" + thread.response[i].comments + "<br>" + thread.response[i].likes);
          $('#posts').append($('<li id =' + i + '>' + string + '<button name = "like" id =' + thread.response[i]._id + '>like</input></button> <button name = "comment">comment</button> </li>'))
      }
      // $('#posts').html(string);
    },
    data: {
      token: localStorage.getItem('token')
    }
  })
})



//registrationPage
$('button[name=register]').click(function(){
  var newUser = {
    fname: $('input[name=firstName]').val(),
    lname: $('input[name=lastName]').val(),
    email: $('input[name=username]').val(),
    password: $('input[name=password]').val()
  }
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: "POST",
    success: function(){
      console.log("We are awesome!")
    },
    data: newUser
  })
})

//Create a new Post
$('button[name=post]').click(function(){
  var newPost = {
    "token": localStorage.getItem('token'), // AUTH_TOKEN
    "content": $('input[name=createPost]').val() // The text content of the new post.
  }
  var string;
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: "POST",
    success: function(thread){
      string = (thread.response.poster.name + "<br>" + thread.response.content + "<br>" + thread.response.createdAt + "<br>" + thread.response.comments + "<br>" + thread.response.likes);
      $('#addedPost').append($('<li id>' + string + '<button name = "like" id =' + thread.response._id+ '>like</button> <button name = "comment">comment</button></li>'));
    },
    data:newPost
  })
})

//like
$('#wall').on('click','button[name=like]',function(){
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/' + this.id,
    method: "GET",
    success: function(thread){
      console.log("i liked something");
      var likingPerson = {
        name: thread.response.poster.name,
        id: thread.response.poster.id
      }
      thread.response.likes.push(likingPerson)
    },
    data: {token: localStorage.getItem('token')}
  })
})
