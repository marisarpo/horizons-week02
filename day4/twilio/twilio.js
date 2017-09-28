"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC9678227ea05f0b75e065ec4ffb4d0838';
  this.authToken = 'dbc424b6f86a17153357628c4f28aa4a';
  this.fromNumber = '+19523334063';

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return ($.trim(textStr).length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    return (typeof Number(phoneStr) && phoneStr.length === 11);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    var phoneInput = this.phoneInputField.val();
    var messageInput = this.messageInputField.val();
    if (this.validateMessageField(messageInput) && this.validatePhoneField(phoneInput)) {
      this.sendMessage(phoneInput, messageInput);
      this.displayMessage(phoneInput, messageInput);
      this.messageInputField.val("");
    }
  },

  sendMessage: function(number, message) {
    $.ajax({
      url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
      success: function(event) {
        console.log("success");
      },
      method: 'POST',
      data: {
        'To': number,
        'From': this.fromNumber,
        'Body': message
      },
      headers: {
        'Authorization': 'Basic ' + btoa(this.accountId + ':' + this.authToken)
      },
      error: function(err) {
        console.log('error' + err);
      }
    })
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
