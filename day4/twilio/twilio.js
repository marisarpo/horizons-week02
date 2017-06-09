"use strict";
/* eslint-env jquery */


function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC97ff11ee7ce3951e8c889c1276af4526";
  this.authToken = "9d9f6a7b4e1dde90662c5720e3180a76";
  this.fromNumber = "+14156501585";

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
  initialize: function () {
    // YOUR CODE HERE
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
    //   var self = this;
    //   this.messageSendButton.on("click", function(event) {
    //     event.preventDefault();
    //    self.displayMessage('9999999999', 'Testing testing!');
    //   })
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function (textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr) !== "") {
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function (phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.length === 11 && phoneStr.replace(/[0-9]/g, '').length === 0) {
      return true;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function (event) {
    // YOUR CODE HERE
    event.preventDefault();
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    var self = this;
    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function (x) {
         self.displayMessage(phone, message);
         self.messageInputField.val("");
        },
        error: function(y) {
          alert();
        },
        method: 'POST',
        data: {
          From: self.fromNumber,
          To: this.fromNumber,
          Body: 'Congratulations your Twillio account is working!'
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }

  },
  displayMessage: function (sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
