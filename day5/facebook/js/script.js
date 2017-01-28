
setTimeout(function(){

  var dataObj = {
    token: localStorage.getItem('token')
  };

  $.ajax({


    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    success:function(data){

      // console.log(data);
      // console.log(data.response[1].poster.name);

      var tableHTML = '';

      for(var i=0; i<data.response.length; i++){


        if(data.response[i].comments.length > 0) tableHTML += '<tr><td>';


        for(var j=0; j<data.response[i].comments.length; j++){
          var comment = data.response[i].comments[j].content;
          tableHTML += comment;
          // console.log(comment);
          tableHTML += '</td><td>' + data.response[i].poster.name;

          var date = new Date(data.response[i].createdAt);

          var dateString = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

          tableHTML += '</td><td>' + dateString + '</td><td><button type="button" name="like">'+
            'Like</button></td><td><button type="button" name="Reply">Reply</button></td></tr>';
        }

        $('#listPosts').append(tableHTML);
      }
      // hides the login form after a successful login


    },
    data: dataObj

  });


}, 30000);



$('button[name=postComment]').click(function(){

  var dataObj = {
    token: localStorage.getItem('token'),
    content: $('input[name=commentField]').val()
  };

  $.ajax({

    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    success:function(data){
      $('input[name=commentField]').val('');
    },
    data: dataObj

  });
});


$('button[name=getPosts]').click(function(){

  var dataObj = {
    token: localStorage.getItem('token')
  };

  $.ajax({

    url:'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'GET',
    success:function(data){

      // console.log(data);
      // console.log(data.response[1].poster.name);

      var tableHTML = '';

      for(var i=0; i<data.response.length; i++){


        if(data.response[i].comments.length > 0) tableHTML += '<tr><td>';


        for(var j=0; j<data.response[i].comments.length; j++){
          var comment = data.response[i].comments[j].content;
          tableHTML += comment;
          // console.log(comment);
          tableHTML += '</td><td>' + data.response[i].poster.name;

          var date = new Date(data.response[i].createdAt);

          var dateString = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

          tableHTML += '</td><td>' + dateString + '</td><td><button type="button" name="like">'+
            'Like</button></td><td><button type="button" name="Reply">Reply</button></td></tr>';
        }

        $('#listPosts').append(tableHTML);
      }
      // hides the login form after a successful login


    },
    data: dataObj

  });
});


$('button[name=login]').click(function(){

  var dataObj = {
    email: $('input[name=email]').val(),
    password: $('input[name=password]').val()
  };

  $.ajax({

    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    success:function(data){

      // hides the login form after a successful login
      $('#login-form').addClass('hide');
      $('button[name=getPosts]').removeClass('hide');
      $('button[name=logout]').removeClass('hide');
      $('button[name=registerButt').addClass('hide');

      $('#listPosts').removeClass('hide');

      localStorage.setItem('token', data.response.token);


    },
    data: dataObj

  });
});

$('button[name=registerButt]').click(function(){

  $('#showRegister').removeClass('hide');

});

$('button[name=createUser]').click(function(){

  var dataUser = {
    fname: $('input[name=fname]').val(),
    lname: $('input[name=lname]').val(),
    email: $('input[name=regEmail]').val(),
    password: $('input[name=regPassword]').val()
  };

  $.ajax({

    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',

    method: 'POST',
    success: function(data){
      console.log('User Successfully Created!', data);
      $('input[name=fname]').val('');
      $('input[name=lname]').val('');
      $('input[name=regEmail]').val('');
      $('input[name=regPassword]').val('');
    },


    data: dataUser

  });
});


$('button[name=logout]').click(function(){

  $.ajax({

    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',

    method: 'GET',
    success: function(data){
      console.log('Logout Successful!', data);
      $('#login-form').removeClass('hide');
      $('button[name=getPosts]').addClass('hide');
      $('button[name=logout]').addClass('hide');
      localStorage.removeItem('token');
    },


    data: {
      token: localStorage.getItem('token')
    }

  });
});


$('button[name=getPosts]').click(function(){

  $.ajax({

    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',

    method: 'GET',
    success: function(data){

    },


    data: {
      token: localStorage.getItem('token')
    }

  });


});
