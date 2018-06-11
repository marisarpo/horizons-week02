// Check login status
if (window.localStorage.getItem('token') != null) window.location.href = 'index.html';

// Helper Functions
function validateFields() {
    var verified = true;
    var info = {};

    var firstName = $('#firstName').val().trim();
    if (firstName.length === 0) {
        verified = false;
        $('.firstname-empty').removeClass('collapse');
    } else {
        $('.firstname-empty').addClass('collapse');
        info.fname = firstName;
    }

    var lastName = $('#lastName').val().trim();
    if (lastName.length === 0) {
        verified = false;
        $('.lastname-empty').removeClass('collapse');
    } else {
        $('.lastname-empty').addClass('collapse');
        info.lname = lastName;
    }

    var email = $('#signup_email').val().trim();
    if (email.length === 0 || email.indexOf('@') < 0 || email.indexOf('.') < 0) {
        verified = false;
        $('.email-invalid').removeClass('collapse');
    } else {
        $('.email-invalid').addClass('collapse');
        info.email = email;
    }

    var password = $('#signup_password').val();
    if (password.length < 6) {
        verified = false;
        $('.password-tooshort').removeClass('collapse');
    } else {
        $('.password-tooshort').addClass('collapse');
        info.password = password;
    }

    if (!verified) return false;
    return info;
}

// Event Listeners
$('#login_button').on('click', function(e) {
    e.preventDefault();
    $('#login_card').removeClass('collapse');
    $('#signup_card').addClass('collapse');
});

$('#signup_button').on('click', function(e) {
    e.preventDefault();
    $('#login_card').addClass('collapse');
    $('#signup_card').removeClass('collapse');
});

$('#signup_submit').on('click', function(e) {
    e.preventDefault();
    var info = validateFields();
    if (!!info === false) return false;

    // Information validated, send ajax request
    $.ajax({
        url: API_URL + USERS_ENDPOINT + 'register',
        method: 'POST',
        data: info,
        success: function(resp) {
            alert('Welcome to Horizon Facebook! Please login with your credentials.');
            $('#login_card').removeClass('collapse');
            $('#signup_card').addClass('collapse');
        },
        error: function(err) {
            alert(err.responseJSON.error + " You may call a TA over for help.");
        }
    })
});

$('#login_submit').on('click', function(e) {
    e.preventDefault();

    // Validate user input
    var email = $('#login_email').val().trim();
    var password = $('#login_password').val();
    if (email.length === 0 || password.length < 6) {
        alert('Invalid email or password');
        return false;
    }

    // Send login request
    $.ajax({
        url: API_URL + USERS_ENDPOINT + 'login',
        method: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function(resp) {
            window.localStorage.setItem('userId', resp.response.id);
            window.localStorage.setItem('token', resp.response.token);
            window.location.href = "index.html";
        },
        error: function(err) {
            alert(err.responseJSON.error + " You may call a TA over for help.");
            $('#login_password').val("");       // Empty the password field
        }
    });
});