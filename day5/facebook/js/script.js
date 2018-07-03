//register
$('#register-send').on('click', function(event){
    event.preventDefault();
    var firstname= $('#register-fname').val() ;
    var lastName =  $('#register-lname').val() ;
    var eMail =  $('#register-email').val();
    var pass =  $('#register-pass').val();

    console.log("sd");

    $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
        method: 'POST',
        success: function(response){
            if (response.success){
                console.log(response);
            }
            
        },
        data: 
        {
            fname: firstname,
            lname: lastName ,
            email: eMail ,
            password: pass
        },

        error: function(err){
            alert(err);
        }
        
    })
});


//login
$('#login-send').on('click', function(){
    event.preventDefault();
    var eMail = $('#login-email').val();
    var pass = $('#login-pass').val();

    $.ajax(
        {
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
        method: 'POST',
        success: function(data) {
          // data will be the response data that is
          // returned by the endpoint. use this to
          // access the token for future authorization.
      
          // data.response.token will give you access
          // to the AUTH_TOKEN
          
          if (data.success === true){
            console.log(data.response.token);
            localStorage.setItem('token', data.response.token);
            console.log("Successful login");
          }
        },
        data: {
          email: eMail,
          password: pass
        }
      });
});


//post message
$('#post-message').on('click', function(event){
    event.preventDefault();
    var tok = localStorage.getItem('token');
    var message = $('#post-content').val();
    console.log(message);
    console.log(tok)

    console.log("Post method called");
    $.ajax({
        url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
        method: 'POST',
        data:{
            token: tok, 
            content: message
        },
        success: function(response){
            console.log('Successful post');
        },
        error: function(err){
            console.log(err);
            console.log("Post error");
        }
    })
});