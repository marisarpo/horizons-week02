"use strict";
/* eslint-env jquery */



function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC8ce335efbf33aed6cf0ab57dd90f3121";
  this.authToken = "fa9655524adeea1c30ab37bddeafa314";
  this.fromNumber = +2342062940;


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
    var self = this;
    $('.message-input-button').on('click', function(){
      self.handleMessageSend(event);
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if(textStr !== '' && textStr !== ' '){
      return true;
    };
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // Write a function that validates the phone input field.
    // It should return true if the given string passes these conditions:
    // The string contains only numbers...Good: 123..Bad: 1-2
    // The string contains exactly 10 digits..Good: 14155005000...Bad: 4155005000
    // YOUR CODE HERE
    if (phoneStr.length === 10 && !isNaN(phoneStr)) {
      return true
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // Get the contents of the messageInputField and phoneInputField
    // Validate the message using this.validateMessageField() and the phone number using this.validatePhoneField().
    // If both fields are valid, make an AJAX request to Twilio to send a message.
    // Use the AJAX request from the previous exercise and update the from/to phone numbers,
    // account id, token, and the message body.
    // If the AJAX request succeeds, use this.displayMessage()
    // display the sent message to the user and clear the contents of messageInputField.
    // If the AJAX request fails, notify the user using the browser built-in alert() function.
    event.preventDefault();
    var mess = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if(this.validateMessageField(mess) && this.validatePhoneField(phone)){
      this.displayMessage(phone,mess);
      mess.val('');
      phone.val('');
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          $('h1').text("Congrats! You're set up!");
          console.log('Message sent', x);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: this.phoneInputField.val(),
          Body: this.messageInputField.val()
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      })
    };
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
