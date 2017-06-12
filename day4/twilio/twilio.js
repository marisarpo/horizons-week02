"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC02ba3d102e5501cf6df71f136c6ea676";
  this.authToken = "3f38510e02db0a44f82b8f0cccb001f8";
  this.fromNumber = "+14159918361";

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
    var trimmedStr = textStr.trim()
    return (trimmedStr !== "")
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var isnum = /^\d+$/.test(phoneStr);
    return (isnum && phoneStr.length === 11)
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    var self = this;
    var message = this.messageInputField.val()
    var phone = this.phoneInputField.val()
    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      var account = this.accountId; // YOUR CODE HERE
      var token = this.authToken; // YOUR CODE HERE
      var fromNumber = this.fromNumber; // YOUR CODE HERE
      var toNumber = phone; // YOUR CODE HERE

      function send() {
        console.log("hello")
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
          success: function(resp) {
            console.log(resp)
            self.displayMessage(phone,message)
            self.messageInputField.val("")
          },
          error: function(err) {
            alert("Failed to send");
          },
          method: 'POST',
          data: {
            From: fromNumber,
            To: toNumber,
            Body: message
          },
          headers: {
            "Authorization": "Basic " + btoa(account + ":" + token)
          }
        });
      }
      send()
    }

    // REMOVE THE NEXT LINE, IT'S FOR TEST
    //this.displayMessage('9999999999', 'Testing testing!');
    //event.preventDefault();
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
