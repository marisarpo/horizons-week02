"use strict";


window.twilio = {};

// Exercise 0. Get Twilio credentials
//
// Please navigate to https://www.twilio.com, and get a free API Key.
//
// You're going to be signing up for the service yourself, and it won't be
// asking you to pay for anything. Enter your name, phone number, and whatever
// else they ask you for (within reason - if they're asking for an ssn, call
// one of us over)
//
// You'll need 3 pieces of information to be able to interact with the Twilio
// API - your `accountId (or SID)`, an `auth token` and your Twilio phone
// number.
//
// Follow the steps listed by Twilio to get familiar with their API console and
// retrieve your first Twilio phone number!
//
// When you have all this information, please replace them in the variables down there.

twilio.accountId = "YOUR ACCOUNT ID HERE";
twilio.authToken = "YOUR AUTH TOKEN HERE";
twilio.fromNumber = "YOUR TWILIO NUMBER HERE";


twilio.TwilioShoutout = function(accountId, authToken, fromNumber) {
  // Assign properties
  this.apiUrl = "https://api.twilio.com/2010-04-01";
  this.accountId = accountId;
  this.authToken = authToken;
  this.fromNumber = fromNumber;

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC4d972e74ac02091c9bcd43120dd6a2f8';
  this.authToken = '5dc8642fce0500d52c24f3908dc78bab';
  this.fromNumber = '+18568884457';


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
    this.messageSendButton.on('click', (function(event) {
      this.handleMessageSend(event);
    }).bind(this))
  },

  // Exercise 3. `validateMessageField(textStr<String>)` method
  // Write a function that validates the message input field. It should return true if the `validateMessageField` passes these conditions:
  // (1) The field should not be a blank string ("")
  // (2) The field should not be an 'empty' string ("           ")
  //
	// hint. $.trim() is useful
  validateMessageField: function(textStr) {
    return (!!(textStr) && !!(textStr.trim()));
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
    var num = parseInt(phoneStr);
    var numstr = (num).toString();
    return (numstr.length === 11);
  },

  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();

    var phone = this.phoneInputField.val();
    var message = this.messageInputField.val();

    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {

      var newThis = this;

      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + newThis.accountId + '/SMS/Messages', {
        success: function(x) {


          newThis.displayMessage(phone, message);
          $('.phone-input-feild').val(null);
        },
        method: 'POST',
        data: {
          From: newThis.fromNumber,
          To: '+' + phone,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(newThis.accountId + ":" + newThis.authToken)
        },
        error: function(err) {
          alert('Message Failed!');
        }
      });
    }

  },

// [Helper] `Message(sender<String>, body<String>)`
// This is a helper class that appends your sent message to the DOM.
var Message = function(sender, body) {
  this.sender = sender; // NOTE: THIS IS JUST THE NUMBER YOU ARE SENDING A TEXT TOO
  this.body = body;
};

// [Helper] `render`
// This part actually does the work.
// It returns a jQuery object that encloses span and p tags that encapsulate the sender and body properties, respectively.
Message.prototype = {
  render: function() {
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
