"use strict";
/* eslint-env jquery */

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



function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC57789425ebbbc784e54b8e9e4b496d76";
  this.authToken = "f1fc4f8587acf009a7d7d0d6581bf26f";
  this.fromNumber = "+18562427310";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  clearField: function(jqField) {
    jqField.val("");
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    //console.log(textStr);
    return !(textStr.trim() === "");
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if (!this.validateMessageField(phoneStr)) {
      return false;
    }
    //console.log(phoneStr);
    phoneStr = phoneStr.trim();
    //console.log(phoneStr);
    for (var i = 0; i < phoneStr.length; i++) {
      if (Number(phoneStr[i]) + "" === "NaN") {
        return false;
      }
    }
    return true;
  },
	// Exercise 5. `handleMessageSend(evt<Event>)` method
	// Write a method that will check the validity of the phone and message fields, and if they're both valid, calls the Twilio API with our data so that it can send a text to your phone. If not, it should throw an error "Invalid fields";
	//
	// note. here's where `validatePhoneField` and `validateMessageField` come in handy!
	// note. also `clear`
	// note. also `sendMessage`
  handleMessageSend: function(evt) {
		evt.preventDefault();
    //console.log(this);
    // only send if both fields are valid
    var message = $('.message-input-field').val();
    var phone = $('.phone-input-field').val();
    //console.log(messageInputField);
    var self = this;
    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            self.clearField($('.message-input-field'));
            self.displayMessage(phone, message);
          },
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: phone,
            Body: message
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          }
        });
    }
  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
