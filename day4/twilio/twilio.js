"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC010d91af60cf11c13d530d61f34483ca"
  this.authToken = "76a1bfbb6247ddd71eba58dbd6b048a6";
  this.fromNumber = "16317692029";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return ($.trim(textStr).length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var string = $.trim(string);
    var number = '1234567890';
    for (var i = 0; i <= string.length - 1; i++) {
      if (number.indexOf(string[i]) === -1) return false;
    }
    return (string.length !== 0);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault() //Should I put anything in the brackets?
    var phone1 = this.phoneInputField.val();
    var message1 = this.messageInputField.val();
    // YOUR CODE HERE

    // REMOVE THE NEXT LINE, IT'S FOR TEST
    this.displayMessage('9999999999', 'Testing testing!');
    event.preventDefault(this.displayMessage)
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
