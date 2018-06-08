$.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
  method: 'POST',
  success: function(data) {
    // data will be the response data that is
    // returned by the endpoint. use this to
    // access the token for future authorization.

    // data.response.token will give you access
    // to the AUTH_TOKEN
  },
  data: {
    email: String,
    password: String
  }
});
