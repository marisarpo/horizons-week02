"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC3947ec2ef1171ab88c745780b9dc2d8b";
  this.authToken = "9c0d49c2eb7eb1a84b385c54a17522db";
  this.fromNumber = "+15076077870";

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
    // YOUR CODE HERE
    var self = this;
    this.messageSendButton.on('click', function(event) {
      event.preventDefault();     
      self.handleMessageSend();
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return $.trim(textStr).length !== 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    return (phoneStr.length === 11) && ($.isNumeric(phoneStr));
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var message = this.messageInputField.val();
    var number = this.phoneInputField.val();
    console.log('m valid:' , this.validateMessageField(message));
    console.log('num valid: ', this.validatePhoneField(number))
    if (this.validateMessageField(message) && this.validatePhoneField(number)) {
      console.log('passed if');
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + accounId + '/SMS/Messages', {
        success: function(x) {
          this.displayMessage(this.fromNumber, message);
        },
        error: function(x) {
          alert('message failed');
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: number,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(accountId + ":" + authToken)
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
