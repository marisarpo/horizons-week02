"use strict";

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC990fb012f902f1d159288dfdb29d4b75";
  this.authToken = "6967e56b96a88f18e3e29da67b3f6343";
  this.fromNumber = "+16012025248";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  // Notify user
  console.log("TwilioMessenger is ready.");
};

twilio.TwilioShoutout.prototype = {
  // Exercise 1. `initialize()` method
  // Implement the initialize method. The initialize method is called when the TwilioApp class is instantiated.
  // It should set up a click handler for `messageSendButton`, and fire `this.handleMessageSend` .
	//
  // hint. remember about context and maybe .bind()? you should, you'll run into some problems if you don't use the right context.
  initialize: function() {
    // YOUR CODE HERE
    this.messageSendButton.on('click', function(event){
      event.preventDefault();

      this.handleMessageSend();
    }.bind(this));
  },
  // Exercise 2. `clearField(jqField<JQuery Element>)` method
  // Write a function that takes a JQuery input fields and clears the text inside it. It should not return anything.
  //
	// hint. use $.trim(), see https://api.jquery.com/jQuery.trim/
  // hint. what does it mean to `clear` a field? Set it to an empty string.
  // hint. user .val() to get (and set) the value of an input object!
  clearField: function(jqField) {
    // YOUR CODE HERE
  },
  // Exercise 3. `validateMessageField(textStr<String>)` method
  // Write a function that validates the message input field. It should return true if the `validateMessageField` passes these conditions:
  // (1) The field should not be a blank string ("")
  // (2) The field should not be an 'empty' string ("           ")
  //
	// hint. $.trim() is useful
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr) !== ""){
      return true;
    }
    return false;
  },
  // Exercise 4. `validatePhoneField(phoneStr<String>)` method
  // Write a function that validates the message input field. It should return true if the `validatePhoneField` passes these conditions:
  // (1) The field should not have any non-numeric characters ('201-123-4321' is bad)
  // (2) The field should not be a blank string ("")
  // (3) The field should not be an 'empty' string ("           ")
  //
	// hint. use $.trim(), see https://api.jquery.com/jQuery.trim/
	// hint. remember to take care of both upper and lower case letters!
	// hint. .charAt might be useful, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if( (phoneStr.length === 10) && (parseInt(phoneStr) == phoneStr)){
      return true;
    }
    return false;
  },
	// Exercise 5. `handleMessageSend(evt<Event>)` method
	// Write a method that will check the validity of the phone and message fields, and if they're both valid, calls the Twilio API with our data so that it can send a text to your phone. If not, it should throw an error "Invalid fields";
	//
	// note. here's where `validatePhoneField` and `validateMessageField` come in handy!
	// note. also `clear`
	// note. also `sendMessage`
  handleMessageSend: function(evt) {
		evt.preventDefault();

    // only send if both fields are valid
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing');
    if (this.validateMessageField(this.messageInputField.val()) && this.validatePhoneField(this.phoneInputField.val())){
        var self = this;
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            // $('h1').text("Congrats! You're set up!");
            // console.log('Message sent', x);
            self.displayMessage(self.fromNumber, self.messageInputField.val());
          },

          error: function(err){
            alert(err);
          },

          method: 'POST',
          data: {
            From: this.fromNumber,
            To: this.phoneInputField.val(),
            Body: this.messageInputField.val(),
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          }
        });
    }
  },

  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var sender = $('<span></span>').addClass('sender').text(this.sender);
    var body = $('<p></p>').text(this.body);
    listElem.append(sender);
    listElem.append(body);

    return listElem;
  }
};

// Nice, you got to the end. Right now, the test is instantiating the app and allowing you to run it, but if you wanted to use it yourself (removing the tests) you can use it by
// var app = new twilio.TwilioShoutout(twilio.accountId, twilio.authToken, twilio.fromNumber)
// Just instantiating the app will set up the event handlers and make the UI interactive (as you should know, you built it haha)
