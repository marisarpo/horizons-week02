"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC4659221125820e2b61049efd2ace4de0";
  this.authToken = "54ba6c2159f9f5956da414acd5d6c24e";
  this.fromNumber = "+16176525883";

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
    this.messageSendButton.on("click", function (e) {
      e.preventDefault();
      this.handleMessageSend();
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function (textStr) {
    // YOUR CODE HERE
    return (textStr.length !== 0 && textStr.trim(' ').length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function (phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.length !== 10 || !(/^\d+$/.test(phoneStr))) {
      return false;
    }
    return true;

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function (event) {
    // YOUR CODE HERE
    var phoneNum = this.phoneInputField.val();
    var messageField = this.messageInputField.val();
    // console.log('PhoneNum', phoneNum, 'messageField', messageField);
    // console.log('phoneNumm return', this.validatePhoneField(phoneNum));
    // console.log('messageField return', this.validateMessageField(messageField));
    if (this.validatePhoneField(phoneNum) &&
      this.validateMessageField(messageField)) {
      this.displayMessage(phoneNum, messageField);

      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function (x) {
          $('h1').text("Congrats! You're set up!");
          console.log('Message sent', x);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phoneNum,
          Body: messageField
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function (err) {
          alert("error bro")
        }
      });
      this.phoneInputField.val(' ');
      this.messageInputField.val(' ');

    }


    //  this.displayMessage('9999999999', 'Testing testing!');
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
